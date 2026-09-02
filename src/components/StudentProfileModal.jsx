export default function StudentProfileModal({ isOpen, onClose, onExportChat, onClearChat, messageCount }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-[fadeInUp_0.2s_ease-out]">
      <div className="theme-panel text-slate-100 w-full max-w-md rounded-3xl shadow-2xl border border-[var(--theme-border)] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[var(--theme-border)] flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl theme-button flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-white">Student Portal</h3>
              <p className="text-[12px] text-slate-400">Campus Information & Helpdesk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-black/20 border border-[var(--theme-border)]">
              <span className="text-[11px] text-slate-400 block font-mono">Academic Session</span>
              <span className="text-[14px] font-bold text-white">2026 – 2027</span>
            </div>
            <div className="p-3 rounded-xl bg-black/20 border border-[var(--theme-border)]">
              <span className="text-[11px] text-slate-400 block font-mono">Messages in Session</span>
              <span className="text-[14px] font-bold text-[var(--theme-accent)]">{messageCount} msgs</span>
            </div>
          </div>

          {/* Key Campus Helplines */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Important Campus Contacts
            </span>
            <div className="space-y-1.5 text-[12.5px]">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">call</span>
                  Admission Office
                </span>
                <span className="font-mono text-slate-400">+1-800-555-0199</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-cyan-400">mail</span>
                  Administration Email
                </span>
                <span className="font-mono text-slate-400">admin@college.edu</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-rose-400">emergency</span>
                  24/7 Anti-Ragging Helpline
                </span>
                <span className="font-mono text-rose-300 font-bold">1800-180-5522</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onExportChat?.()
                onClose()
              }}
              disabled={messageCount === 0}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-[var(--theme-border)] text-white text-[13px] font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">download</span>
              <span>Export Conversation Transcript (.txt)</span>
            </button>

            {messageCount > 0 && (
              <button
                onClick={() => {
                  onClearChat?.()
                  onClose()
                }}
                className="w-full py-2 px-4 rounded-xl text-rose-400 hover:bg-rose-500/10 text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                <span>Reset / Clear Chat History</span>
              </button>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--theme-border)] bg-black/20 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Campus FAQ Assistant</span>
          <span>Version 2.4.0</span>
        </div>

      </div>
    </div>
  )
}
