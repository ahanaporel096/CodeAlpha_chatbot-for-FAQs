import { useRef, useEffect } from 'react'
import { useChatContext } from '../context/ChatContext'
import MessageBubble from '../components/MessageBubble'
import TypingIndicator from '../components/TypingIndicator'
import { getAIConfig } from '../lib/aiService'

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1V4G-SKCdxLEiN8c9gZAacT0D29TPF9Ep0_KLPG-YvrWVD9Vo5csnLlftoQtp6zX9Dj2nwC6B2szEctBJGUqNgeHIemCLufPE6KIHXUrsAHHaBCEpPjgEg5REnjAGNpCb5V-nD_CtaMtowsMIHavDZuzqhq6GcuewO4LepnZ7LD9DH7Ch-BxRVf5AxhzQbU5CogDVT5gkvDV53CzWmJouaUNA_RofwSyFccxVvLhNrrZyjbzaW7GWRgjg'

export default function MobileChatPage({ onSendMessage, onOpenSettings }) {
  const { messages, isTyping, inputValue, setInput } = useChatContext()
  const bottomRef = useRef(null)
  const aiConfig = getAIConfig()
  const isAIActive = aiConfig.enabled && Boolean(aiConfig.apiKey)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = () => {
    const text = inputValue.trim()
    if (!text) return
    onSendMessage(text)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Mobile Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
        <div className="h-16 px-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="Logo" className="h-8 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-headline-md font-semibold text-primary">Chat Assistant</span>
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isAIActive ? 'bg-tertiary-fixed-dim' : 'bg-primary-fixed-dim'
                  } status-pulse`}
                />
                <span className="text-label-sm text-on-surface-variant">
                  {isAIActive ? 'AI Active' : 'FAQ Mode'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSettings}
              className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant relative"
              aria-label="Settings"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              {isAIActive && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary-fixed-dim shadow-[0_0_4px_#4ae176]" />
              )}
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat scroll area */}
      <main className="flex-1 pt-16 pb-36">
        <div className="flex flex-col px-4 py-6 gap-4">
          {/* Time separator */}
          <div className="flex justify-center">
            <span className="text-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full shadow-sm">
              {new Date().toLocaleDateString([], { weekday: 'long' })},{' '}
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Welcome greeting */}
          {messages.length === 0 && (
            <div className="flex items-end gap-3 max-w-[90%]">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-on-secondary-container text-[18px]">school</span>
              </div>
              <div className="bg-surface-container-lowest text-primary p-4 rounded-2xl rounded-bl-sm shadow-sm ring-1 ring-outline-variant/20">
                <p className="text-[15px] leading-[22px]">
                  👋 Welcome! I'm your FAQ Assistant. Ask me anything about admissions, hostel, fees, or placements!
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Admission Documents', 'Hostel Availability', 'Tuition Fees'].map((q) => (
                    <button
                      key={q}
                      onClick={() => onSendMessage(q)}
                      className="bg-surface-container-lowest text-primary px-4 py-2 rounded-full ring-1 ring-primary/30 text-label-md font-semibold transition-colors hover:bg-primary-fixed hover:ring-primary shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onChipClick={onSendMessage}
            />
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </main>

      {/* Mobile Input — docked above bottom nav */}
      <div className="fixed bottom-16 inset-x-0 px-4 py-3 bg-surface/90 backdrop-blur-xl shadow-[0_-4px_16px_rgba(0,0,0,0.02)] z-40">
        <div className="relative flex items-center w-full bg-surface-container-lowest rounded-full shadow-sm ring-1 ring-outline-variant/40 focus-within:ring-2 focus-within:ring-primary transition-all">
          <button className="pl-4 pr-2 text-outline hover:text-primary transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <input
            value={inputValue}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-body-md text-on-surface placeholder:text-outline-variant py-3 min-w-0"
            placeholder="Type a message…"
            type="text"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            aria-label="Send message"
            className="pr-4 pl-2 flex items-center justify-center disabled:opacity-40"
          >
            <div className="bg-primary-fixed w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[18px] text-on-primary-fixed">send</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
