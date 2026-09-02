import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => {
      onClose?.()
    }, 3000)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <div className="fixed bottom-24 right-8 z-50 animate-[fadeInUp_0.2s_ease-out] pointer-events-auto">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl theme-panel border border-[var(--theme-border)] shadow-2xl text-white text-[13px] font-semibold">
        <span className="material-symbols-outlined text-[18px] text-[var(--theme-accent)]">
          {type === 'success' ? 'check_circle' : 'info'}
        </span>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white p-0.5"
        >
          <span className="material-symbols-outlined text-[14px]">close</span>
        </button>
      </div>
    </div>
  )
}
