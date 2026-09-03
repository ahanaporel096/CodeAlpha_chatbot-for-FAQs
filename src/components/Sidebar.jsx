import { useState } from 'react'
import { useChatContext } from '../context/ChatContext'

const MULTI_DOMAINS = [
  { id: 'Education', icon: 'school', label: 'Education & Admissions', emoji: '🎓', question: 'How can I apply for admission?' },
  { id: 'E-commerce', icon: 'shopping_bag', label: 'Shopping & Orders', emoji: '🛒', question: 'How can I return my order?' },
  { id: 'Banking', icon: 'account_balance', label: 'Banking & Cards', emoji: '🏦', question: 'How do I block my lost debit card?' },
  { id: 'Healthcare', icon: 'local_hospital', label: 'Healthcare & Doctor', emoji: '🏥', question: 'How can I book a doctor appointment?' },
  { id: 'Food Delivery', icon: 'fastfood', label: 'Food Delivery', emoji: '🍔', question: 'Why is my food order delayed?' },
  { id: 'Software / Technology', icon: 'computer', label: 'Tech & Account Support', emoji: '💻', question: 'I forgot my password. How do I reset it?' },
  { id: 'Travel', icon: 'flight_takeoff', label: 'Travel & Flights', emoji: '✈️', question: 'What are the baggage allowance rules?' },
  { id: 'Public Services', icon: 'account_balance_wallet', label: 'Public Services', emoji: '🏛️', question: 'How can I apply for official government certificates?' },
  { id: 'Career', icon: 'work', label: 'Career & Interviews', emoji: '💼', question: 'How can I create an impressive resume?' },
  { id: 'General Support', icon: 'support_agent', label: 'General Helpdesk', emoji: '💬', question: 'How can I contact customer support?' },
]

export default function Sidebar({ isOpen, onClose, onQuickQuestion, onOpenSettings, onSecretDevTrigger, isDevMode }) {
  const { activeCategory } = useChatContext()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = MULTI_DOMAINS.filter(c => 
    c.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.question.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCategoryClick = (question, id) => {
    onQuickQuestion(question, id)
    if (onClose) onClose()
  }

  return (
    <>
      {/* Backdrop Overlay (Works on Desktop & Mobile when drawer is opened) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sliding Navigation Drawer */}
      <aside
        className={`fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-[var(--theme-surface)]/98 backdrop-blur-3xl z-50 flex flex-col border-r border-[var(--theme-border)] justify-between transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">

          {/* AIRA Hero Branding & Close Button */}
          <div className="relative p-4 rounded-2xl theme-card border border-[var(--theme-border)] shadow-xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--theme-glow)] rounded-full blur-2xl pointer-events-none transition-all duration-700" />
            
            <div className="flex items-center justify-between relative z-10">
              <div 
                onClick={onSecretDevTrigger}
                className="flex items-center gap-3.5 cursor-pointer select-none"
                title="AIRA Assistant (Click 3x for Dev Settings)"
              >
                <div className="relative">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl theme-button p-[2px] shadow-lg flex items-center justify-center text-white font-black text-[18px] sm:text-[20px] transition-transform group-hover:scale-105">
                    A
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--theme-accent)] border-2 border-[var(--theme-surface)] shadow-[0_0_8px_var(--theme-accent)] animate-pulse" />
                </div>

                <div>
                  <h3 className="font-extrabold text-[16px] text-white tracking-tight">AIRA</h3>
                  <p className="text-[11.5px] text-slate-400 font-medium">10 Knowledge Domains</p>
                </div>
              </div>

              {/* Close Drawer Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-[var(--theme-border)] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
                title="Close Drawer"
              >
                <span className="material-symbols-outlined text-[19px]">close</span>
              </button>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search domains or questions..."
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-black/30 border border-[var(--theme-border)] focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)] outline-none text-[13px] text-slate-200 placeholder:text-slate-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>

          {/* Multi-Domain Categories List (Clean with zero FAQ numbers) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Explore Domains ({filteredCategories.length})
              </span>
            </div>

            <nav className="space-y-1">
              {filteredCategories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.question, cat.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left group cursor-pointer ${
                      isActive
                        ? 'theme-button text-white shadow-lg font-bold'
                        : 'text-slate-300 hover:bg-white/[0.06] hover:text-white border border-transparent hover:border-white/[0.05]'
                    }`}
                    title={`Ask: "${cat.question}"`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[17px] flex-shrink-0">{cat.emoji}</span>
                      <span className="text-[13px] font-semibold tracking-tight truncate">{cat.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-80 transition-opacity text-slate-400">
                      chevron_right
                    </span>
                  </button>
                )
              })}

              {filteredCategories.length === 0 && (
                <div className="p-4 text-center text-[12px] text-slate-400 bg-white/[0.02] rounded-xl border border-[var(--theme-border)]">
                  <p className="font-semibold text-slate-300 mb-1">No matching topics found</p>
                  <p className="text-[11px] text-slate-500">Try searching: <em>order, card, doctor, password,</em> or <em>flight</em></p>
                </div>
              )}
            </nav>
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-3.5 border-t border-[var(--theme-border)] bg-black/20">
          {isDevMode ? (
            <button
              onClick={() => {
                if (onOpenSettings) onOpenSettings()
                if (onClose) onClose()
              }}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-white text-[13px] font-mono font-semibold transition-all cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px] text-[var(--theme-accent)]">code</span>
              <span>Developer AI Settings</span>
            </button>
          ) : (
            <div className="flex items-center justify-between px-2 py-1 text-[11px] text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                <span>AIRA Assistant Active</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">24/7</span>
            </div>
          )}
        </div>

      </aside>
    </>
  )
}
