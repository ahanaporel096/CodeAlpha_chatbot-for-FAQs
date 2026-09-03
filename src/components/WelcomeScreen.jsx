import { useState } from 'react'

const ALL_STARTER_CARDS = [
  {
    id: 'ecommerce',
    tag: 'SHOPPING',
    category: 'E-commerce',
    emoji: '🛒',
    title: 'Orders, Track & Returns',
    description: 'Track package live, check return policy, or request a refund.',
    question: 'How can I return my order?',
  },
  {
    id: 'banking',
    tag: 'BANKING',
    category: 'Banking',
    emoji: '🏦',
    title: 'Cards & Account Help',
    description: 'Block lost cards, reset ATM PIN, check balance, or transfer money.',
    question: 'How do I block my lost debit card?',
  },
  {
    id: 'healthcare',
    tag: 'HEALTHCARE',
    category: 'Healthcare',
    emoji: '🏥',
    title: 'Doctor & Lab Reports',
    description: 'Book appointments, view test results, or check visiting hours.',
    question: 'How can I book a doctor appointment?',
  },
  {
    id: 'technology',
    tag: 'TECHNOLOGY',
    category: 'Software / Technology',
    emoji: '💻',
    title: 'Login & Password Support',
    description: 'Reset forgotten passwords, enable 2FA, or clear app cache.',
    question: 'I forgot my password. How do I reset it?',
  },
  {
    id: 'food',
    tag: 'FOOD DELIVERY',
    category: 'Food Delivery',
    emoji: '🍔',
    title: 'Food Orders & Refunds',
    description: 'Track rider live, report late deliveries, or claim meal refunds.',
    question: 'Why is my food order delayed?',
  },
  {
    id: 'education',
    tag: 'EDUCATION',
    category: 'Education',
    emoji: '🎓',
    title: 'Admissions & Placements',
    description: 'Check eligibility, campus placements, or view fee structures.',
    question: 'What is the placement record?',
  },
  {
    id: 'travel',
    tag: 'TRAVEL',
    category: 'Travel',
    emoji: '✈️',
    title: 'Flight Tickets & Baggage',
    description: 'Book flights, check baggage allowance, or cancel tickets.',
    question: 'What are the baggage allowance rules?',
  },
  {
    id: 'career',
    tag: 'CAREER',
    category: 'Career',
    emoji: '💼',
    title: 'Resume & Interview Prep',
    description: 'Create impressive resumes, crack interviews, or find internships.',
    question: 'How can I create an impressive resume?',
  },
]

const DOMAIN_TABS = [
  { id: 'all', label: '🔥 All Topics' },
  { id: 'E-commerce', label: '🛒 Shopping' },
  { id: 'Banking', label: '🏦 Banking' },
  { id: 'Healthcare', label: '🏥 Health' },
  { id: 'Software / Technology', label: '💻 Tech' },
  { id: 'Education', label: '🎓 Education' },
]

export default function WelcomeScreen({ onAsk }) {
  const [selectedTab, setSelectedTab] = useState('all')

  const displayedCards = selectedTab === 'all'
    ? ALL_STARTER_CARDS
    : ALL_STARTER_CARDS.filter(c => c.category === selectedTab)

  return (
    <div className="flex flex-col w-full h-full min-h-[calc(100vh-10rem)] items-center justify-center px-4 sm:px-6 py-6 sm:py-8 relative">
      
      {/* Background ambient lighting */}
      <div className="ambient-glow-1 top-10 left-1/4" />
      <div className="ambient-glow-2 bottom-10 right-1/4" />

      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-6 sm:space-y-8 relative z-10">

        {/* AIRA Animated Floating Avatar Icon */}
        <div className="relative group cursor-pointer animate-float">
          <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 group-hover:opacity-85 transition-opacity duration-700 animate-pulse bg-[var(--theme-glow)]" />
          
          <div className="relative w-20 h-20 sm:w-26 sm:h-26 rounded-3xl theme-card backdrop-blur-2xl border border-[var(--theme-border)] shadow-2xl flex items-center justify-center overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
            <span
              className="text-[38px] sm:text-[44px] relative z-10 animate-pulse"
              style={{
                filter: 'drop-shadow(0 0 18px var(--theme-glow))',
              }}
            >
              ✨
            </span>

            {/* Glowing online indicator */}
            <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[var(--theme-accent)] rounded-full shadow-[0_0_12px_var(--theme-accent)] border-2 border-[var(--theme-surface)]" />
          </div>
        </div>

        {/* Warm & Engaging Welcome Headline */}
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11.5px] sm:text-[12px] font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>10 Knowledge Domains • Online 24/7</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Hello friend! I'm <span className="theme-text-gradient">AIRA</span> 👋
          </h2>

          <p className="text-[15px] sm:text-[16.5px] font-semibold text-slate-200">
            Your smart, friendly assistant for everyday questions.
          </p>

          <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed max-w-xl mx-auto">
            Choose any topic card below to ask instantly, or type your question in your own words using text or voice! 💖
          </p>
        </div>

        {/* Quick Filter Category Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl">
          {DOMAIN_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                selectedTab === tab.id
                  ? 'bg-[var(--theme-primary)] text-white shadow-[0_0_12px_var(--theme-glow)] font-semibold'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-[var(--theme-border)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Multi-Domain Starter Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {displayedCards.map((card) => (
            <button
              key={card.id}
              onClick={() => onAsk(card.question)}
              className="theme-card theme-card-hover group p-4 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]/50 cursor-pointer border border-[var(--theme-border)] shadow-lg"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--theme-primary)] to-transparent group-hover:via-[var(--theme-accent)] transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[20px] group-hover:scale-110 transition-transform">{card.emoji}</span>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-wider border border-[var(--theme-border)] bg-black/30 text-[var(--theme-accent)]">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-[13.5px] font-bold text-white mb-1 group-hover:text-[var(--theme-accent)] transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-[11.5px] text-slate-300 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Action link */}
              <div className="mt-3 pt-2 border-t border-[var(--theme-border)] flex items-center justify-between text-[var(--theme-accent)] text-[11.5px] font-bold transition-colors">
                <span>Ask Question</span>
                <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1.5 transition-transform">
                  arrow_forward
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
