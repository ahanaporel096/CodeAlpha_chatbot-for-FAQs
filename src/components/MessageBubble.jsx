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
  'Education': [
    'What documents are required for admission?',
    'What is the fee structure and how can I pay?',
    'When are semester exams conducted?',
    'Is hostel accommodation available and how to apply?',
    'What is the placement record?'
  ],
  'E-commerce': [
    'How can I track my order and where is my package?',
    'How long does delivery take and is express shipping available?',
    'How long does a refund take to credit to my account?',
    'What payment methods are accepted and is Cash on Delivery available?',
    'Money was deducted but my order failed'
  ],
  'Banking': [
    'How do I block my lost debit card?',
    'How can I change or reset my ATM PIN?',
    'How can I check my account balance and download bank statement?',
    'How can I transfer money using UPI, NEFT, RTGS, or IMPS?',
    'How can I report an unauthorized or fraudulent transaction?'
  ],
  'Healthcare': [
    'What documents should I bring to my appointment?',
    'How can I get my lab test reports?',
    'What are the hospital OPD and patient visiting hours?',
    'Is ambulance and emergency service available?'
  ],
  'Food Delivery': [
    'Why is my food order delayed?',
    'My food arrived cold and damaged',
    'How can I contact customer support?'
  ],
  'Software / Technology': [
    'I forgot my password. How do I reset it?',
    'How do I enable two-factor authentication (2FA)?',
    'How do I clear browser cache and cookies?'
  ],
  'Travel': [
    'How can I book a flight ticket?',
    'How can I cancel my ticket and get a refund?',
    'What are the baggage allowance rules?'
  ],
  'Public Services': [
    'How can I apply for official government certificates?',
    'How can I file a public grievance or complaint?'
  ],
  'Career': [
    'How can I create an impressive resume?',
    'How can I prepare for job interviews?',
    'How can I find internships?'
  ],
  'General Support': [
    'How can I contact customer support?',
    'What are your customer support operating hours?'
  ],
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
function BotBubble({ message, onChipClick, isLatest = false, allMessages = [] }) {
  const [copied, setCopied] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [isDismissed, setIsDismissed] = useState(false)

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

  // Build a normalized history of all user queries and questions already in conversation
  const askedQuestionsSet = new Set(
    allMessages.map((m) => (m.content || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
  )
  if (message.matchedQuestion) {
    askedQuestionsSet.add(message.matchedQuestion.toLowerCase().replace(/[^a-z0-9]/g, ''))
  }

  // Get category follow-ups and filter out ANY question that has already been asked in the chat
  const rawFollowups = SMART_FOLLOWUPS[categoryName] || [
    'How can I contact customer support?',
    'How do I reset my password?'
  ]

  const filteredFollowups = rawFollowups
    .filter((q) => {
      const qNorm = q.toLowerCase().replace(/[^a-z0-9]/g, '')
      // Check if this question was already asked anywhere in the chat
      for (const asked of askedQuestionsSet) {
        if (asked.includes(qNorm) || qNorm.includes(asked)) {
          return false
        }
      }
      return true
    })
    .slice(0, 2) // Max 2 clean, fresh suggestions

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

        {/* ONLY Render Suggested Next on the LATEST Bot Message, with zero duplicate questions */}
        {isLatest && !isDismissed && !message.isFallback && !message.isConversational && filteredFollowups.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-1.5 ml-1 animate-fadeIn">
            <span className="text-[11px] font-semibold text-[var(--theme-accent)] flex items-center gap-1 mr-0.5">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>Suggested next:</span>
            </span>
            {filteredFollowups.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onChipClick?.(q)}
                className="group inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-[var(--theme-primary)]/20 border border-[var(--theme-border)] hover:border-[var(--theme-accent)] text-slate-300 hover:text-white text-[11.5px] font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_12px_var(--theme-glow)] active:scale-95"
              >
                <span>{q}</span>
                <span className="material-symbols-outlined text-[13px] text-[var(--theme-accent)] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            ))}

            {/* Subtle Dismiss Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded-full text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              title="Hide suggestions"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        )}

        {/* Fallback Smart Suggestions */}
        {message.isFallback && (
          <FallbackCard onChipClick={onChipClick} />
        )}

      </div>
    </div>
  )
}

export default function MessageBubble({ message, onChipClick, isLatest, allMessages }) {
  if (message.role === 'user') {
    return <UserBubble message={message} />
  }
  return (
    <BotBubble
      message={message}
      onChipClick={onChipClick}
      isLatest={isLatest}
      allMessages={allMessages}
    />
  )
}
