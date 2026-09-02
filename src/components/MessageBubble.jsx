import { useState } from 'react'
import FallbackCard from './FallbackCard'

const CATEGORY_EMOJIS = {
  'Education': '🎓',
  'E-commerce': '🛒',
  'Banking': '🏦',
  'Healthcare': '🏥',
  'Food Delivery': '🍔',
  'Software / Technology': '💻',
  'Travel': '✈️',
  'Public Services': '🏛️',
  'Career': '💼',
  'General Support': '💬',
}

const SMART_FOLLOWUPS = {
  'Education': ['What documents are required for admission?', 'When are semester exams conducted?'],
  'E-commerce': ['How can I return my order?', 'What payment methods are accepted?'],
  'Banking': ['How do I block my lost debit card?', 'How can I download my bank statement?'],
  'Healthcare': ['How can I book a doctor appointment?', 'How can I get my lab test reports?'],
  'Food Delivery': ['Why is my food order delayed?', 'My food arrived cold and damaged'],
  'Software / Technology': ['I forgot my password. How do I reset it?', 'How do I clear browser cache and cookies?'],
  'Travel': ['How can I cancel my ticket and get a refund?', 'What are the baggage allowance rules?'],
  'Public Services': ['How can I apply for official government certificates?', 'How can I file a public grievance?'],
  'Career': ['How can I create an impressive resume?', 'How can I prepare for job interviews?'],
  'General Support': ['How can I contact customer support?', 'What are your support operating hours?'],
}

// ─── User Bubble ──────────────────────────────────────────────────────────────
function UserBubble({ message }) {
  return (
    <div className="w-full max-w-4xl flex items-end justify-end gap-3 chat-bubble-enter">
      <div className="flex flex-col gap-1 items-end max-w-[80%]">
        <div className="theme-user-bubble shadow-lg rounded-2xl rounded-tr-sm px-4 py-3 text-white text-[14px] leading-relaxed font-medium">
          {message.content}
        </div>
        <span className="text-[10px] text-slate-400 mr-1 font-mono">
          {message.timestamp}
        </span>
      </div>
      
      {/* User avatar */}
      <div className="w-8.5 h-8.5 rounded-xl bg-white/10 border border-white/10 flex-shrink-0 flex items-center justify-center shadow-md">
        <span className="material-symbols-outlined text-slate-200 text-[18px]">person</span>
      </div>
    </div>
  )
}

// ─── AIRA Bot Bubble ──────────────────────────────────────────────────────────
function BotBubble({ message, onChipClick }) {
  const [copied, setCopied] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(message.content)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  const categoryName = message.category || 'General Support'
  const categoryEmoji = CATEGORY_EMOJIS[categoryName] || '💬'
  const followups = SMART_FOLLOWUPS[categoryName] || []

  return (
    <div className="w-full max-w-4xl flex items-start gap-3.5 chat-bubble-enter">
      {/* AIRA Avatar */}
      <div className="w-9 h-9 rounded-xl theme-button flex-shrink-0 flex items-center justify-center shadow-lg text-white font-black text-[15px]">
        A
      </div>

      <div className="flex flex-col gap-2 max-w-[85%]">
        
        {/* Category Pill */}
        {!message.isFallback && !message.isConversational && message.category && (
          <div className="flex items-center gap-2 ml-1">
            <span className="px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-[var(--theme-border)] text-slate-300 text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
              <span>{categoryEmoji}</span>
              <span>{categoryName}</span>
            </span>
          </div>
        )}

        {/* Message Container Card */}
        <div className="relative theme-card rounded-2xl rounded-tl-sm p-4.5 text-slate-100 text-[14.5px] leading-relaxed border border-[var(--theme-border)] shadow-xl overflow-hidden group">
          
          {/* Left Accent Line */}
          <div className="absolute top-0 left-0 w-1 h-full theme-button" />

          {/* Text Content */}
          <div className="whitespace-pre-wrap text-slate-100 font-normal">{message.content}</div>

          {/* Action Tools (Copy, Audio Reader 🔊, Feedback 👍/❤️) */}
          <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11.5px] text-slate-400">
            <div className="flex items-center gap-2">
              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
                title="Copy response"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? 'done' : 'content_copy'}
                </span>
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {/* Text to Speech Button */}
              <button
                onClick={handleSpeak}
                className={`flex items-center gap-1 hover:text-white px-2 py-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer ${
                  speaking ? 'text-[var(--theme-accent)] font-semibold animate-pulse' : ''
                }`}
                title="Read aloud"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {speaking ? 'volume_off' : 'volume_up'}
                </span>
                <span>{speaking ? 'Stop' : 'Listen'}</span>
              </button>

              {/* Helpful Feedback Buttons */}
              <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/10">
                <button
                  onClick={() => setFeedback(feedback === 'love' ? null : 'love')}
                  className={`p-1 rounded hover:bg-white/5 transition-all cursor-pointer ${
                    feedback === 'love' ? 'text-rose-400 scale-110' : 'hover:text-rose-300'
                  }`}
                  title="Love this response"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {feedback === 'love' ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
                <button
                  onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                  className={`p-1 rounded hover:bg-white/5 transition-all cursor-pointer ${
                    feedback === 'up' ? 'text-emerald-400 scale-110' : 'hover:text-emerald-300'
                  }`}
                  title="Helpful"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {feedback === 'up' ? 'thumb_up' : 'thumb_up_off_alt'}
                  </span>
                </button>
              </div>
            </div>

            <span className="text-slate-400 font-mono text-[10px]">
              {message.timestamp}
            </span>
          </div>
        </div>

        {/* Smart Warm Follow-up Chips */}
        {!message.isFallback && !message.isConversational && followups.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-1 ml-1">
            <span className="text-[11px] text-slate-400 font-medium">Related:</span>
            {followups.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onChipClick?.(q)}
                className="px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-[var(--theme-border)] text-slate-300 hover:text-white text-[11.5px] transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Fallback suggestion chips when unmatched */}
        {message.isFallback && <FallbackCard onChipClick={onChipClick} />}

      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function MessageBubble({ message, onChipClick }) {
  if (message.role === 'user') {
    return <UserBubble message={message} />
  }
  return <BotBubble message={message} onChipClick={onChipClick} />
}
