import { useChatContext } from '../context/ChatContext'

export default function Header({ onClearChat, onExportChat, onOpenSettings, onToggleSidebar, onSecretDevTrigger, isDevMode }) {
  const { messages } = useChatContext()

  return (
    <header className="fixed top-0 left-0 lg:left-80 right-0 h-16 bg-[var(--theme-bg)]/90 backdrop-blur-2xl z-40 border-b border-[var(--theme-border)] flex items-center justify-between px-3 sm:px-6 transition-colors duration-400">
      
      {/* Left: Hamburger (mobile/tablet) + AIRA Branding */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Mobile/Tablet Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-[var(--theme-border)] text-slate-200 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
          aria-label="Open topics menu"
          title="Browse 10 Topics & Domains"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        {/* AIRA Avatar Badge (Secret Dev Trigger: Triple Click/Tap) */}
        <div 
          onClick={onSecretDevTrigger}
          className="relative flex-shrink-0 cursor-pointer select-none group"
          title="AIRA Assistant (Click 3x for Dev Settings)"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl theme-button flex items-center justify-center shadow-lg text-white font-black text-[16px] sm:text-[18px] tracking-wider transition-transform group-hover:scale-105 active:scale-95">
            A
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[var(--theme-accent)] border-2 border-[var(--theme-bg)] shadow-[0_0_8px_var(--theme-accent)] animate-pulse" />
        </div>

        {/* Title & Online Status */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-[15px] sm:text-[17px] font-extrabold text-white tracking-tight truncate">
              AIRA
            </h1>
            <span className="hidden md:inline text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-slate-300 border border-[var(--theme-border)]">
              AI Responsive Assistant
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-slate-400">
            <span className="hidden sm:inline">Your friendly guide to everyday questions</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-600" />
            <span className="text-[var(--theme-accent)] flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
              Online 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Developer-Only Settings Button (Hidden from regular users) */}
        {isDevMode && onOpenSettings && (
          <button
            onClick={onOpenSettings}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-white text-[12px] font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            title="Developer AI Settings"
            aria-label="Developer Settings"
          >
            <span className="material-symbols-outlined text-[17px] text-[var(--theme-accent)]">code</span>
            <span className="hidden sm:inline">Dev Config</span>
          </button>
        )}

        {/* Export / Download Transcript Button */}
        {messages.length > 0 && onExportChat && (
          <button
            onClick={onExportChat}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-[var(--theme-border)] text-slate-300 hover:text-white text-[12px] sm:text-[13px] font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
            title="Download Chat Transcript (.txt)"
            aria-label="Download Transcript"
          >
            <span className="material-symbols-outlined text-[17px] text-[var(--theme-accent)]">download</span>
            <span className="hidden md:inline">Save Chat</span>
          </button>
        )}

        {/* Clear chat button */}
        {messages.length > 0 && (
          <button
            onClick={onClearChat}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-[12px] sm:text-[13px] font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
            title="Clear Chat History"
          >
            <span className="material-symbols-outlined text-[17px]">delete_sweep</span>
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>
    </header>
  )
}
