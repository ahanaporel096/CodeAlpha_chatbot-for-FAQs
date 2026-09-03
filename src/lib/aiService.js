/**
 * AI Service supporting Google Gemini, Groq, and a Built-in Public AI fallback.
 * Allows AIRA to answer ANY question (custom, open-ended, follow-up, or multi-domain).
 */

export const PROVIDERS = {
  GEMINI: 'gemini',
  GROQ: 'groq',
  FREE_AUTO: 'auto',
}

export const DEFAULT_MODELS = {
  [PROVIDERS.GEMINI]: 'gemini-1.5-flash',
  [PROVIDERS.GROQ]: 'llama-3.3-70b-versatile',
  [PROVIDERS.FREE_AUTO]: 'openai-fast',
}

export const AVAILABLE_MODELS = {
  [PROVIDERS.GEMINI]: [
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash (Fastest & Latest)' },
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Recommended)' },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Advanced Reasoning)' },
  ],
  [PROVIDERS.GROQ]: [
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile (Recommended)' },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant (Ultra Fast)' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B (32k Context)' },
    { id: 'gemma2-9b-it', name: 'Gemma 2 9B IT' },
  ],
}

const STORAGE_KEY = 'smart_faq_ai_config'

export function getAIConfig() {
  const envGeminiKey = import.meta.env?.VITE_GEMINI_API_KEY || ''
  const envGroqKey = import.meta.env?.VITE_GROQ_API_KEY || ''
  const defaultApiKey = envGeminiKey || envGroqKey || ''
  const defaultProvider = envGroqKey && !envGeminiKey ? PROVIDERS.GROQ : PROVIDERS.GEMINI

  const defaultSystemPrompt =
    'You are AIRA (AI Responsive Assistant), a friendly, helpful, polite, and highly accurate multi-domain AI assistant. You provide clear, concise, and structured answers across all domains including: E-commerce & Shopping 🛒, Banking & Finance 🏦, Healthcare & Medicine 🏥, Software & Technology Support 💻, Food Delivery 🍔, Travel & Flights ✈️, Public Services 🏛️, Career & Job Guidance 💼, Education & Admissions 🎓, and general day-to-day assistance. Always address the user\'s specific question directly with accurate, step-by-step guidance and relevant tips.'

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        provider: defaultProvider,
        apiKey: defaultApiKey,
        model: DEFAULT_MODELS[defaultProvider],
        enabled: true, // Always enabled with automatic intelligent fallback
        useAsFallbackOnly: true,
        systemPrompt: defaultSystemPrompt,
      }
    }
    const parsed = JSON.parse(raw)
    return {
      provider: parsed.provider || defaultProvider,
      apiKey: parsed.apiKey || defaultApiKey,
      model: parsed.model || DEFAULT_MODELS[parsed.provider || defaultProvider],
      enabled: parsed.enabled ?? true,
      useAsFallbackOnly: parsed.useAsFallbackOnly ?? true,
      systemPrompt: parsed.systemPrompt || defaultSystemPrompt,
    }
  } catch (err) {
    console.error('Failed to parse AI config from localStorage', err)
    return {
      provider: defaultProvider,
      apiKey: defaultApiKey,
      model: DEFAULT_MODELS[defaultProvider],
      enabled: true,
      useAsFallbackOnly: true,
      systemPrompt: defaultSystemPrompt,
    }
  }
}

export function saveAIConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch (err) {
    console.error('Failed to save AI config to localStorage', err)
  }
}

/**
 * Built-in Public AI fallback for zero-config instant AI answers on Vercel
 */
async function callPublicAI({ messages, systemPrompt }) {
  const url = 'https://text.pollinations.ai/'
  const lastMsg = messages[messages.length - 1]?.content || ''

  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.slice(-4).map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    })),
  ]

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 9000)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: formattedMessages,
        model: 'openai',
        seed: 42,
      }),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!res.ok) {
      throw new Error(`Public AI returned ${res.status}`)
    }

    const text = await res.text()
    if (!text || !text.trim()) {
      throw new Error('Empty response from Public AI')
    }
    return text.trim()
  } catch (err) {
    clearTimeout(timeoutId)
    // Fallback via GET if POST blocked
    const fallbackUrl = `https://text.pollinations.ai/${encodeURIComponent(
      `${systemPrompt}\n\nUser Question: ${lastMsg}`
    )}`
    const getRes = await fetch(fallbackUrl)
    if (getRes.ok) {
      const getText = await getRes.text()
      if (getText?.trim()) return getText.trim()
    }
    throw err
  }
}

/**
 * Call Google Gemini API
 */
async function callGemini({ apiKey, model, messages, systemPrompt, faqContext }) {
  const modelName = model || 'gemini-1.5-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(
    apiKey
  )}`

  let enrichedSystemPrompt = systemPrompt || 'You are AIRA, a multi-domain AI assistant.'
  if (faqContext && faqContext.length > 0) {
    enrichedSystemPrompt += `\n\nReference Multi-Domain FAQs for context:\n${faqContext
      .slice(0, 30)
      .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
      .join('\n\n')}`
  }

  const contents = []
  const recentMessages = messages.slice(-6)
  for (const msg of recentMessages) {
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })
  }

  const payload = {
    systemInstruction: {
      parts: [{ text: enrichedSystemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 800,
    },
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(
      errorData.error?.message || `Gemini API error (${res.status}: ${res.statusText})`
    )
  }

  const data = await res.json()
  const candidate = data.candidates?.[0]
  if (!candidate?.content?.parts?.[0]?.text) {
    throw new Error('No text generated by Gemini API.')
  }

  return candidate.content.parts[0].text
}

/**
 * Call Groq API
 */
async function callGroq({ apiKey, model, messages, systemPrompt, faqContext }) {
  const modelName = model || 'llama-3.3-70b-versatile'
  const url = 'https://api.groq.com/openai/v1/chat/completions'

  let enrichedSystemPrompt = systemPrompt || 'You are AIRA, a multi-domain AI assistant.'
  if (faqContext && faqContext.length > 0) {
    enrichedSystemPrompt += `\n\nReference Multi-Domain FAQs for context:\n${faqContext
      .slice(0, 30)
      .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
      .join('\n\n')}`
  }

  const formattedMessages = [
    { role: 'system', content: enrichedSystemPrompt },
    ...messages.slice(-6).map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    })),
  ]

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey.trim()}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages: formattedMessages,
      temperature: 0.4,
      max_tokens: 800,
    }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(
      errorData.error?.message || `Groq API error (${res.status}: ${res.statusText})`
    )
  }

  const data = await res.json()
  const answer = data.choices?.[0]?.message?.content
  if (!answer) {
    throw new Error('No response received from Groq API.')
  }

  return answer
}

/**
 * Unified AI dispatch function:
 * 1. Uses Gemini/Groq if API key is provided
 * 2. Uses Public AI fallback if no API key is set
 */
export async function generateAIResponse({ query, conversationHistory = [], faqContext = [] }) {
  const config = getAIConfig()
  const messages = [...conversationHistory, { role: 'user', content: query }]

  // 1. If Developer provided API key for Gemini / Groq
  if (config.apiKey && config.apiKey.trim()) {
    try {
      let responseText = ''
      if (config.provider === PROVIDERS.GROQ) {
        responseText = await callGroq({
          apiKey: config.apiKey,
          model: config.model,
          messages,
          systemPrompt: config.systemPrompt,
          faqContext,
        })
      } else {
        responseText = await callGemini({
          apiKey: config.apiKey,
          model: config.model,
          messages,
          systemPrompt: config.systemPrompt,
          faqContext,
        })
      }

      return {
        text: responseText,
        provider: config.provider,
        model: config.model,
      }
    } catch (apiErr) {
      console.warn(`[aiService] Dedicated API failed (${apiErr.message}), trying Public AI fallback...`)
    }
  }

  // 2. Built-in Automatic Public AI Fallback
  try {
    const publicResponse = await callPublicAI({
      messages,
      systemPrompt: config.systemPrompt,
    })

    return {
      text: publicResponse,
      provider: 'AIRA Smart AI',
      model: 'openai-cloud',
    }
  } catch (publicErr) {
    console.error('[aiService] All AI endpoints failed:', publicErr)
    return null
  }
}

export async function testConnection(config) {
  const testMessages = [{ role: 'user', content: 'Hello! Respond with "OK" if you can hear me.' }]

  if (config.provider === PROVIDERS.GROQ && config.apiKey) {
    return await callGroq({
      apiKey: config.apiKey,
      model: config.model,
      messages: testMessages,
      systemPrompt: 'Respond in 1-5 words confirming connection.',
    })
  } else if (config.apiKey) {
    return await callGemini({
      apiKey: config.apiKey,
      model: config.model,
      messages: testMessages,
      systemPrompt: 'Respond in 1-5 words confirming connection.',
    })
  } else {
    return await callPublicAI({
      messages: testMessages,
      systemPrompt: 'Respond in 1-5 words confirming connection.',
    })
  }
}
