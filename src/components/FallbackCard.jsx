const MULTI_DOMAIN_SUGGESTIONS = [
  { id: '1', label: 'How can I return my order?', icon: 'shopping_bag', domain: 'E-commerce' },
  { id: '2', label: 'How do I reset my password?', icon: 'lock_reset', domain: 'Technology' },
  { id: '3', label: 'How do I block my debit card?', icon: 'credit_card_off', domain: 'Banking' },
  { id: '4', label: 'How can I book an appointment?', icon: 'calendar_month', domain: 'Healthcare' },
  { id: '5', label: 'When are semester exams?', icon: 'school', domain: 'Education' },
]

export default function FallbackCard({ onChipClick }) {
  return (
    <div className="w-full max-w-2xl mt-1.5 p-4 rounded-2xl bg-white/[0.03] border border-[var(--theme-border)] shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined text-[var(--theme-accent)] text-[18px]">
          lightbulb
        </span>
        <span className="text-[12px] font-bold text-slate-200 uppercase tracking-wider">
          Suggested Questions
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {MULTI_DOMAIN_SUGGESTIONS.map((item) => (
          <button
            key={item.id}
            onClick={() => onChipClick?.(item.label)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] text-slate-300 hover:text-white text-[12px] font-medium transition-all group cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px] text-[var(--theme-accent)] group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
