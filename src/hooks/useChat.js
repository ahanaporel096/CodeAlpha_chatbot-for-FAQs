import { useCallback, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useChatContext } from '../context/ChatContext'
import { findBestMatch, LOCAL_FAQS } from '../utils/faqMatcher'
import { matchSuggestionIntent } from '../utils/domainKnowledge'
import { generateAIResponse, getAIConfig, PROVIDERS } from '../lib/aiService'

export function useChat() {
  const {
    sessionId,
    messages,
    addMessage,
    setTyping,
    setSession,
    activeCategory,
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

  // ─── Query Python Flask REST API (if running locally) ──────────────────────
  const queryPythonBackend = useCallback(async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) throw new Error('Backend status ' + response.status)
      const data = await response.json()
      return data
    } catch {
      return null
    }
  }, [])

  // ─── Main send handler ─────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text) => {
      if (!text || !text.trim()) return

      const userText = text.trim()
      const aiConfig = getAIConfig()

      // Find the last answered category from chat history
      const lastBotMessage = [...messages].reverse().find((m) => m.role === 'bot' && m.category)
      const currentContextCategory = lastBotMessage?.category || activeCategory || 'Education'

      // 1. Add user message to UI
      addMessage({ role: 'user', content: userText })
      persistMessage({ role: 'user', content: userText })

      // Show typing indicator
      setTyping(true)

      let result = null

      // 2. Check for Contextual Suggestions & Advice intent ("anything to suggest on this topic?", "tips on this", etc.)
      const suggestionMatch = matchSuggestionIntent(userText, currentContextCategory)
      if (suggestionMatch) {
        result = suggestionMatch
      }

      // 3. Client-side Multi-Domain NLP Matcher
      if (!result) {
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

      // 4. Try Python backend if available
      if (!result) {
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

      // 5. Intelligent AI Engine: Generates real answers for ANY custom, open-ended, or follow-up question
      if (!result || !result.isMatched || result.confidence < 40) {
        try {
          const aiResult = await generateAIResponse({
            query: userText,
            conversationHistory: messages,
            faqContext: LOCAL_FAQS,
          })

          if (aiResult?.text) {
            setTyping(false)
            const providerLabel =
              aiResult.provider === PROVIDERS.GROQ
                ? 'Groq AI'
                : aiResult.provider === PROVIDERS.GEMINI
                ? 'Google Gemini'
                : 'AIRA Smart AI'

            addMessage({
              role: 'bot',
              content: aiResult.text,
              confidence: 96,
              isAI: true,
              aiProvider: providerLabel,
              aiModel: aiResult.model,
              category: currentContextCategory || 'General Support',
              matchedQuestion: userText,
            })

            persistMessage({
              role: 'bot',
              content: aiResult.text,
              confidence: 0.96,
            })
            return
          }
        } catch (aiErr) {
          console.warn('[useChat] AI generation failed:', aiErr)
        }
      }

      // Natural response delay
      await new Promise((r) => setTimeout(r, 350 + Math.random() * 200))
      setTyping(false)

      if (result && result.isMatched) {
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
        // Fallback response with structured help
        addMessage({
          role: 'bot',
          content:
            "I'm here to assist! I can provide guidance across Shopping & Orders 🛒, Banking & Cards 🏦, Doctor Appointments 🏥, Password & Tech Support 💻, Food Delivery 🍔, Flight Bookings ✈️, Admissions 🎓, and Career Advice 💼. Feel free to ask your question or pick any topic!",
          confidence: 0,
          isFallback: true,
          category: currentContextCategory || 'General Support',
        })

        persistMessage({
          role: 'bot',
          content: "I'm here to assist.",
          confidence: 0,
        })
      }
    },
    [addMessage, setTyping, persistMessage, queryPythonBackend, messages, activeCategory]
  )

  return { sendMessage }
}
