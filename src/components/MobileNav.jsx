const NAV_ITEMS = [
  { path: 'chat', icon: 'chat_bubble', label: 'Chat' },
  { path: 'topics', icon: 'library_books', label: 'Topics' },
  { path: 'saved', icon: 'bookmark', label: 'Saved' },
]

export default function MobileNav({ activeTab = 'chat', onTabChange }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.06)]">
      <div className="flex justify-around items-center h-16 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.path
          return (
            <button
              key={item.path}
              onClick={() => onTabChange?.(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors
                ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className="material-symbols-outlined transition-transform"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-label-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
