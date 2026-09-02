import { useState } from 'react'
import { useChatContext } from '../context/ChatContext'

const MULTI_DOMAINS = [
  { id: 'Education', icon: 'school', label: 'Education', emoji: '🎓', question: 'How can I apply for admission?' },
  { id: 'E-commerce', icon: 'shopping_bag', label: 'Shopping', emoji: '🛒', question: 'How can I return my order?' },
  { id: 'Banking', icon: 'account_balance', label: 'Banking', emoji: '🏦', question: 'How do I block my lost debit card?' },
  { id: 'Healthcare', icon: 'local_hospital', label: 'Healthcare', emoji: '🏥', question: 'How can I book a doctor appointment?' },
  { id: 'Food Delivery', icon: 'fastfood', label: 'Food Delivery', emoji: '🍔', question: 'Why is my food order delayed?' },
  { id: 'Software / Technology', icon: 'computer', label: 'Technology', emoji: '💻', question: 'I forgot my password. How do I reset it?' },
  { id: 'Travel', icon: 'flight_takeoff', label: 'Travel', emoji: '✈️', question: 'How can I book a flight ticket?' },
  { id: 'Public Services', icon: 'account_balance_wallet', label: 'Public Services', emoji: '🏛️', question: 'How can I apply for official government certificates?' },
  { id: 'Career', icon: 'work', label: 'Career', emoji: '💼', question: 'How can I create an impressive resume?' },
  { id: 'General Support', icon: 'support_agent', label: 'General Support', emoji: '💬', question: 'How can I contact customer support?' },
]

export default function Sidebar({ onQuickQuestion }) {
  const { activeCategory } = useChatContext()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = MULTI_DOMAINS.filter(c => 
    c.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.question.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <aside className="fixed left-0 top-0 h-full w-80 bg-[var(--theme-surface)]/95 backdrop-blur-3xl z-50 flex flex-col border-r border-[var(--theme-border)] justify-between transition-colors duration-400">
      
      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {/* AIRA Hero Branding */}
        <div className="relative p-4 rounded-2xl theme-card border border-[var(--theme-border)] shadow-xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--theme-glow)] rounded-full blur-2xl pointer-events-none transition-all duration-700" />
          
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl theme-button p-[2px] shadow-lg flex items-center justify-center text-white font-black text-[20px]">
                A
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--theme-accent)] border-2 border-[var(--theme-surface)] shadow-[0_0_8px_var(--theme-accent)] animate-pulse" />
            </div>

            <div>
              <h3 className="font-extrabold text-[16px] text-white tracking-tight">AIRA</h3>
              <p className="text-[11.5px] text-slate-400 font-medium">AI Responsive Assistant</p>
            </div>
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
            placeholder="Search questions or domains..."
            className="w-full pl-10 pr-3 py-2 rounded-xl bg-black/30 border border-[var(--theme-border)] focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)] outline-none text-[13px] text-slate-200 placeholder:text-slate-500 transition-all"
          />
        </div>

        {/* Multi-Domain Categories */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Ask About (10 Domains)
            </span>
          </div>

          <nav className="space-y-1">
            {filteredCategories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => onQuickQuestion(cat.question, cat.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left group cursor-pointer ${
                    isActive
                      ? 'theme-button text-white shadow-lg font-bold'
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white border border-transparent hover:border-white/[0.05]'
                  }`}
                  title={`Ask: "${cat.question}"`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[17px] flex-shrink-0">{cat.emoji}</span>
                    <span className="text-[13.5px] font-semibold tracking-tight truncate">{cat.label}</span>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

      </div>

    </aside>
  )
}
