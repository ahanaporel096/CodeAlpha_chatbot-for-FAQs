import { createContext, useContext, useReducer, useCallback } from 'react'

// ─── State shape ──────────────────────────────────────────────────────────────
const initialState = {
  messages: [],          // { id, role, content, confidence, faqId, timestamp }
  sessionId: null,
  isTyping: false,
  inputValue: '',
  activeCategory: null,
}

// ─── Action types ─────────────────────────────────────────────────────────────
export const ACTIONS = {
  SET_SESSION: 'SET_SESSION',
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_TYPING: 'SET_TYPING',
  SET_INPUT: 'SET_INPUT',
  CLEAR_CHAT: 'CLEAR_CHAT',
  SET_ACTIVE_CATEGORY: 'SET_ACTIVE_CATEGORY',
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function chatReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SESSION:
      return { ...state, sessionId: action.payload }

    case ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }

    case ACTIONS.SET_TYPING:
      return { ...state, isTyping: action.payload }

    case ACTIONS.SET_INPUT:
      return { ...state, inputValue: action.payload }

    case ACTIONS.CLEAR_CHAT:
      return { ...initialState }

    case ACTIONS.SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload }

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ChatContext = createContext(null)

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const addMessage = useCallback((msg) => {
    dispatch({
      type: ACTIONS.ADD_MESSAGE,
      payload: {
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...msg,
      },
    })
  }, [])

  const setTyping = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_TYPING, payload: value })
  }, [])

  const setInput = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_INPUT, payload: value })
  }, [])

  const clearChat = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_CHAT })
  }, [])

  const setSession = useCallback((id) => {
    dispatch({ type: ACTIONS.SET_SESSION, payload: id })
  }, [])

  const setActiveCategory = useCallback((category) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_CATEGORY, payload: category })
  }, [])

  return (
    <ChatContext.Provider
      value={{
        ...state,
        addMessage,
        setTyping,
        setInput,
        clearChat,
        setSession,
        setActiveCategory,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used inside ChatProvider')
  return ctx
}
