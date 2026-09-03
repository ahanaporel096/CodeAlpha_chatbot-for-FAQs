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

  // ─── Query Python Flask REST API (if available) ────────────────────────────
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
    } catch {
      // Python backend is optional / client-first
      return null
    }
  }, [])

  // ─── Main send handler ─────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text) => {
      if (!text || !text.trim()) return

      const userText = text.trim()
      const aiConfig = getAIConfig()

      // 1. Add user message to UI
      addMessage({ role: 'user', content: userText })

      // Persist user message
      persistMessage({ role: 'user', content: userText })

      // Show typing indicator
      setTyping(true)

      let result = null
      const forceAI = aiConfig.enabled && Boolean(aiConfig.apiKey) && !aiConfig.useAsFallbackOnly

      // 2. Client-side Multi-Domain NLP Matcher (High accuracy on all 10 domains)
      if (!forceAI) {
        const localMatch = findBestMatch(userText, LOCAL_FAQS)
        if (localMatch && localMatch.faq) {
          result = {
            answer: localMatch.faq.answer,
            confidence: localMatch.confidence,
            matchedQuestion: localMatch.faq.question,
            category: localMatch.faq.category,
            isMatched: true,
            source: 'AIRA Multi-Domain NLP Matcher',
          }
        }
      }

      // 3. If local match had low confidence, try Python Flask Backend if running
      if (!result && !forceAI) {
        const backendData = await queryPythonBackend(userText)
        if (backendData && backendData.answer && backendData.is_matched) {
          result = {
            answer: backendData.answer,
            confidence: Math.round((backendData.confidence || 0) * 100),
            matchedQuestion: backendData.matched_question,
            category: backendData.category,
            isMatched: true,
            source: 'Python NLP Backend',
          }
        }
      }

      // 4. If AI API is configured (Google Gemini / Groq) and query needs intelligent answer
      const shouldUseAI =
        aiConfig.enabled &&
        Boolean(aiConfig.apiKey) &&
        (forceAI || !result || !result.isMatched || result.confidence < 45)

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
              aiResult.provider === PROVIDERS.GROQ ? 'Groq AI' : 'Google Gemini'

            addMessage({
              role: 'bot',
              content: aiResult.text,
              confidence: 98,
              isAI: true,
              aiProvider: providerLabel,
              aiModel: aiResult.model,
              category: 'AIRA Multi-Domain AI',
            })

            persistMessage({
              role: 'bot',
              content: aiResult.text,
              confidence: 0.98,
            })
            return
          }
        } catch (aiErr) {
          console.warn('[useChat] AI response generation failed, falling back to local result.', aiErr)
        }
      }

      // Small realistic response delay
      await new Promise((r) => setTimeout(r, 350 + Math.random() * 250))
      setTyping(false)

      if (result && result.isMatched) {
        // High-confidence exact multi-domain FAQ match
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
        // Safe out-of-scope fallback (Never return a false wrong answer!)
        addMessage({
          role: 'bot',
          content:
            "I'm here to help! I couldn't find an exact answer for that in our instant FAQ library. You can ask me about Shopping & Orders 🛒, Banking & Cards 🏦, Doctor Appointments 🏥, Password & Tech Support 💻, Food Delivery 🍔, Flight Bookings ✈️, Admissions 🎓, or configure a free AI API key in Settings (⚙️) for answering any custom question!",
          confidence: 0,
          isFallback: true,
          category: 'General Support',
        })

        persistMessage({
          role: 'bot',
          content: "I couldn't find an exact answer for that.",
          confidence: 0,
        })
      }
    },
    [addMessage, setTyping, persistMessage, queryPythonBackend, messages]
  )

  return { sendMessage }
}
