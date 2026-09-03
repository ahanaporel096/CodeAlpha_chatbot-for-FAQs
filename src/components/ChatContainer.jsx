import { useEffect, useRef } from 'react'
import { useChatContext } from '../context/ChatContext'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import WelcomeScreen from './WelcomeScreen'

export default function ChatContainer({ onSendMessage, onOpenDocsModal }) {
  const { messages, isTyping } = useChatContext()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const hasMessages = messages.length > 0

  return (
    <main className="flex-1 pt-18 sm:pt-20 pb-28 sm:pb-36 w-full bg-[var(--theme-bg)] relative min-h-screen transition-colors duration-400">
      
      {/* Ambient background mesh patterns */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="theme-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--theme-primary)" strokeWidth="0.6" strokeDasharray="2 4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#theme-grid)" />
        </svg>
      </div>

      {/* Floating light circles */}
      <div className="ambient-glow-1 top-20 left-10" />
      <div className="ambient-glow-2 bottom-40 right-20" />

      {/* Content Area */}
      <div className="relative z-10 h-full max-w-5xl mx-auto">
        {!hasMessages ? (
          <WelcomeScreen onAsk={onSendMessage} />
        ) : (
          <div className="flex flex-col items-center px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-5">
            {messages.map((msg, idx) => {
              const isLatest = idx === messages.length - 1 && !isTyping
              return (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isLatest={isLatest}
                  allMessages={messages}
                  onChipClick={onSendMessage}
                  onOpenDocsModal={onOpenDocsModal}
                />
              )
            })}

            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </main>
  )
}
