import { useRef, useState } from 'react'
import { useChatContext } from '../context/ChatContext'

export default function InputBar({ onSend }) {
  const { inputValue, setInput, isTyping } = useChatContext()
  const inputRef = useRef(null)
  const [isListening, setIsListening] = useState(false)

  // Web Speech API Voice Recognition
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome or Edge.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setIsListening(false)
      inputRef.current?.focus()
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const handleSend = () => {
    const text = inputValue.trim()
    if (!text || isTyping) return
    onSend(text)
    setInput('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 p-2.5 sm:p-4 md:p-6 bg-gradient-to-t from-[var(--theme-bg)] via-[var(--theme-bg)]/95 to-transparent z-30 pointer-events-none transition-colors duration-400">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        
        {/* Glow Input Container */}
        <div className="relative group">
          {/* Focus glow border */}
          <div className="absolute -inset-0.5 rounded-2xl opacity-25 group-focus-within:opacity-80 blur-sm transition-all duration-500 bg-[var(--theme-glow)]" />

          <div className="relative flex items-center gap-2 sm:gap-2.5 theme-panel pl-4 pr-2.5 py-2 sm:py-2.5 rounded-2xl border border-[var(--theme-border)] shadow-2xl">
            
            {/* Text Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              placeholder={isListening ? 'Listening... speak now...' : 'Ask AIRA anything...'}
              className="flex-1 bg-transparent border-none focus:ring-0 text-[14px] sm:text-[15px] text-white placeholder:text-slate-400 outline-none disabled:opacity-50 min-w-0"
              aria-label="Chat input"
              id="chat-input"
            />

            {/* Clear Input Text Button */}
            {inputValue && (
              <button
                type="button"
                onClick={() => setInput('')}
                className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                title="Clear input text"
              >
                <span className="material-symbols-outlined text-[17px]">close</span>
              </button>
            )}

            {/* Voice Input Button (Right beside Send Button) */}
            <button
              type="button"
              onClick={handleVoiceInput}
              disabled={isTyping}
              className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
                isListening
                  ? 'bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] border border-[var(--theme-border)] text-slate-300 hover:text-white hover:border-[var(--theme-accent)]'
              }`}
              title={isListening ? 'Listening... Speak now' : 'Voice Input (Speech-to-Text)'}
              aria-label="Voice input"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isListening ? 'mic_active' : 'mic'}
              </span>
            </button>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-xl theme-button text-white shadow-lg active:scale-95 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 group/btn cursor-pointer"
              aria-label="Send message"
              id="send-button"
            >
              <span className="material-symbols-outlined text-[19px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">
                send
              </span>
            </button>

          </div>
        </div>

        {/* Pro Tip Footer */}
        <div className="hidden sm:flex items-center justify-center px-3 mt-1.5 text-[11px] text-slate-400 font-medium">
          <span>💡 Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-[var(--theme-border)] text-slate-300">Enter ↵</kbd> to ask AIRA anytime</span>
        </div>

      </div>
    </footer>
  )
}
