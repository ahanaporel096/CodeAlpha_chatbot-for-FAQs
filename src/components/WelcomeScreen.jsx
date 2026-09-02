const STARTER_CARDS = [
  {
    id: 'ecommerce',
    tag: 'SHOPPING',
    emoji: '🛒',
    title: 'Orders, Track & Returns',
    description: 'Track package live, check return policy, or request a refund.',
    question: 'How can I return my order?',
  },
  {
    id: 'banking',
    tag: 'BANKING',
    emoji: '🏦',
    title: 'Cards & Account Help',
    description: 'Block lost cards, reset ATM PIN, check balance, or transfer money.',
    question: 'How do I block my lost debit card?',
  },
  {
    id: 'healthcare',
    tag: 'HEALTHCARE',
    emoji: '🏥',
    title: 'Doctor & Lab Reports',
    description: 'Book appointments, view test results, or check visiting hours.',
    question: 'How can I book a doctor appointment?',
  },
  {
    id: 'technology',
    tag: 'TECHNOLOGY',
    emoji: '💻',
    title: 'Login & Password Support',
    description: 'Reset forgotten passwords, enable 2FA, or clear app cache.',
    question: 'I forgot my password. How do I reset it?',
  },
  {
    id: 'food',
    tag: 'FOOD DELIVERY',
    emoji: '🍔',
    title: 'Food Orders & Refunds',
    description: 'Track rider live, report late deliveries, or claim meal refunds.',
    question: 'Why is my food order delayed?',
  },
  {
    id: 'education',
    tag: 'EDUCATION',
    emoji: '🎓',
    title: 'Admissions & Exams',
    description: 'Check entry eligibility, download hall tickets, or view fees.',
    question: 'When are semester exams conducted?',
  },
]

export default function WelcomeScreen({ onAsk }) {
  return (
    <div className="flex flex-col w-full h-full min-h-[calc(100vh-10rem)] items-center justify-center px-6 py-8 relative">
      
      {/* Background ambient lighting */}
      <div className="ambient-glow-1 top-10 left-1/4" />
      <div className="ambient-glow-2 bottom-10 right-1/4" />

      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-8 relative z-10">

        {/* AIRA Animated Floating Avatar Icon */}
        <div className="relative group cursor-pointer animate-float">
          <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 group-hover:opacity-85 transition-opacity duration-700 animate-pulse bg-[var(--theme-glow)]" />
          
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl theme-card backdrop-blur-2xl border border-[var(--theme-border)] shadow-2xl flex items-center justify-center overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
            <span
              className="text-[44px] relative z-10 animate-pulse"
              style={{
                filter: 'drop-shadow(0 0 18px var(--theme-glow))',
              }}
            >
              ✨
            </span>

            {/* Glowing online indicator */}
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 bg-[var(--theme-accent)] rounded-full shadow-[0_0_12px_var(--theme-accent)] border-2 border-[var(--theme-surface)]" />
          </div>
        </div>

        {/* Warm & Engaging Welcome Headline */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[12px] font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Always here to help you 24/7</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Hello friend! I'm <span className="theme-text-gradient">AIRA</span> 👋
          </h2>

          <p className="text-[17px] font-semibold text-slate-200">
            Your friendly guide to everyday questions.
          </p>

          <p className="text-[14.5px] text-slate-300 leading-relaxed max-w-xl mx-auto">
            How can I brighten your day or assist you? Pick any popular question below or type your own question in your own words! 💖
          </p>
        </div>

        {/* 6 Interactive Multi-Domain Starter Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STARTER_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => onAsk(card.question)}
              className="theme-card theme-card-hover group p-4.5 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]/50 cursor-pointer border border-[var(--theme-border)] shadow-lg"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--theme-primary)] to-transparent group-hover:via-[var(--theme-accent)] transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[22px] group-hover:scale-110 transition-transform">{card.emoji}</span>
                  <span className="px-2 py-0.5 rounded-md text-[9.5px] font-mono font-bold tracking-wider border border-[var(--theme-border)] bg-black/30 text-[var(--theme-accent)]">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-[14.5px] font-bold text-white mb-1 group-hover:text-[var(--theme-accent)] transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-[12px] text-slate-300 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Action link */}
              <div className="mt-3.5 pt-2.5 border-t border-[var(--theme-border)] flex items-center justify-between text-[var(--theme-accent)] text-[12px] font-bold transition-colors">
                <span>Tap to Ask</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1.5 transition-transform">
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
