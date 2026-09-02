import { useCallback, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useChatContext } from '../context/ChatContext'
import { findBestMatch, LOCAL_FAQS } from '../utils/faqMatcher'
import { generateAIResponse, getAIConfig, PROVIDERS } from '../lib/aiService'

export function useChat() {
  const {
    sessionId,
    messages,
    addMessage,
    setTyping,
    setSession,
  } = useChatContext()

  // ─── Create or restore session ─────────────────────────────────────────────
  useEffect(() => {
    const initSession = async () => {
      if (sessionId) return

      if (!isSupabaseConfigured) {
        setSession(crypto.randomUUID())
        return
      }

      try {
        const { data, error } = await supabase
          .from('chat_sessions')
          .insert({ user_agent: navigator.userAgent })
          .select('id')
          .single()

        if (error) throw error
        setSession(data.id)
      } catch (err) {
        console.warn('[useChat] Could not create Supabase session, using local id.', err)
        setSession(crypto.randomUUID())
      }
    }

    initSession()
  }, [sessionId, setSession])

  // ─── Persist message to Supabase (if connected) ────────────────────────────
  const persistMessage = useCallback(
    async ({ role, content, matchedFaqId = null, confidence = 0 }) => {
      if (!isSupabaseConfigured || !sessionId) return

      try {
        await supabase.from('chat_messages').insert({
          session_id: sessionId,
          role,
          content,
          matched_faq_id: matchedFaqId,
          confidence,
        })
      } catch (err) {
        console.warn('[useChat] Could not persist message.', err)
      }
    },
    [sessionId]
  )

  // ─── Query Python Flask NLP (TF-IDF + Cosine Similarity) Backend ───────────
  const queryPythonBackend = useCallback(async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (err) {
      console.warn('[useChat] Python Flask backend not reachable or error:', err.message)
      return null
    }
  }, [])

  // ─── Main send handler ─────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text) => {
      if (!text || !text.trim()) return

      const userText = text.trim()
      const aiConfig = getAIConfig()

      // Add user message to UI
      addMessage({ role: 'user', content: userText })

      // Persist user message
      persistMessage({ role: 'user', content: userText })

      // Show typing indicator
      setTyping(true)

      let result = null
      const forceAI = aiConfig.enabled && aiConfig.apiKey && !aiConfig.useAsFallbackOnly

      // 1. Try Python Flask REST API (NLP + TF-IDF + Cosine Similarity)
      if (!forceAI) {
        const backendData = await queryPythonBackend(userText)
        if (backendData && backendData.answer) {
          result = {
            answer: backendData.answer,
            confidence: Math.round((backendData.confidence || 0) * 100),
            matchedQuestion: backendData.matched_question,
            category: backendData.category,
            isMatched: backendData.is_matched,
            source: 'Python NLP (TF-IDF & Cosine Similarity)',
          }
        }
      }

      // 2. Fallback to client-side NLP / local FAQ matcher if Python backend is offline
      if (!result && !forceAI) {
        const localMatch = findBestMatch(userText, LOCAL_FAQS)
        if (localMatch) {
          result = {
            answer: localMatch.faq.answer,
            confidence: localMatch.confidence,
            matchedQuestion: localMatch.faq.question,
            category: localMatch.faq.category,
            isMatched: true,
            source: 'Local Client Matcher',
          }
        }
      }

      // 3. Determine if we should invoke Google Gemini or Groq AI fallback
      const shouldUseAI =
        aiConfig.enabled &&
        aiConfig.apiKey &&
        (forceAI || !result || !result.isMatched || result.confidence < 30)

      if (shouldUseAI) {
        try {
          const aiResult = await generateAIResponse({
            query: userText,
            conversationHistory: messages,
            faqContext: LOCAL_FAQS,
          })

          if (aiResult?.text) {
            setTyping(false)
            const providerLabel =
              aiResult.provider === PROVIDERS.GROQ ? 'Groq' : 'Google Gemini'

            addMessage({
              role: 'bot',
              content: aiResult.text,
              confidence: 95,
              isAI: true,
              aiProvider: providerLabel,
              aiModel: aiResult.model,
            })

            persistMessage({
              role: 'bot',
              content: aiResult.text,
              confidence: 0.95,
            })
            return
          }
        } catch (aiErr) {
          console.warn('[useChat] AI fallback failed, using FAQ/fallback.', aiErr)
        }
      }

      // Smooth artificial delay
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 300))
      setTyping(false)

      if (result && result.isMatched) {
        // High-confidence NLP FAQ match
        addMessage({
          role: 'bot',
          content: result.answer,
          confidence: result.confidence,
          category: result.category,
          matchedQuestion: result.matchedQuestion,
        })

        persistMessage({
          role: 'bot',
          content: result.answer,
          confidence: result.confidence / 100,
        })
      } else {
        // Unmatched / Out-of-scope query
        addMessage({
          role: 'bot',
          content:
            result?.answer ||
            "I'm sorry, I couldn't find a relevant answer to your question in our FAQ knowledge base. Try asking about admissions, fees, scholarships, hostel facilities, timings, or placements.",
          confidence: result?.confidence || 0,
          isFallback: true,
        })

        persistMessage({
          role: 'bot',
          content: result?.answer || "I couldn't find a relevant answer.",
          confidence: 0,
        })
      }
    },
    [addMessage, setTyping, persistMessage, queryPythonBackend, messages]
  )

  return { sendMessage }
}
