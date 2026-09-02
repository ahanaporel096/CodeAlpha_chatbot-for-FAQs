import { useChatContext } from '../context/ChatContext'

export default function Header({ onClearChat }) {
  const { messages } = useChatContext()

  return (
    <header className="fixed top-0 left-80 right-0 h-18 bg-[var(--theme-bg)]/90 backdrop-blur-2xl z-40 border-b border-[var(--theme-border)] flex items-center justify-between px-8 transition-colors duration-400">
      
      {/* Left: AIRA Branding */}
      <div className="flex items-center gap-3.5">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl theme-button flex items-center justify-center shadow-lg text-white font-black text-[18px] tracking-wider">
            A
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--theme-accent)] border-2 border-[var(--theme-bg)] shadow-[0_0_8px_var(--theme-accent)] animate-pulse" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[17px] font-extrabold text-white tracking-tight">
              AIRA
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-slate-300 border border-[var(--theme-border)]">
              AI Responsive Assistant
            </span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-slate-400">
            <span>Your friendly guide to everyday questions</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="text-[var(--theme-accent)] flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Clear chat button */}
        {messages.length > 0 && (
          <button
            onClick={onClearChat}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-[13px] font-semibold transition-all duration-200 cursor-pointer"
            title="Clear Chat History"
          >
            <span className="material-symbols-outlined text-[17px]">delete_sweep</span>
            <span>Clear Chat</span>
          </button>
        )}
      </div>
    </header>
  )
}
