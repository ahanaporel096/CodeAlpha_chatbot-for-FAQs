export default function TypingIndicator() {
  return (
    <div className="w-full max-w-4xl flex items-start gap-3.5 chat-bubble-enter">
      {/* AIRA avatar */}
      <div className="w-9 h-9 rounded-xl theme-button flex-shrink-0 flex items-center justify-center shadow-lg text-white font-black text-[15px]">
        A
      </div>

      {/* Dots + Label */}
      <div className="flex flex-col gap-1">
        <div className="theme-card shadow-xl rounded-2xl rounded-tl-sm px-4 py-3 border border-[var(--theme-border)] flex items-center h-[44px] min-w-[80px] justify-center">
          <div className="flex space-x-1.5 items-center">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </div>
        <p className="ml-1 text-[11px] text-slate-400 font-medium animate-pulse">
          AIRA is thinking...
        </p>
      </div>
    </div>
  )
}
