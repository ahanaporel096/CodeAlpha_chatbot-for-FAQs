import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeSelector() {
  const { currentTheme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const activeThemeObj = themes.find((t) => t.id === currentTheme) || themes[0]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 text-[12.5px] font-semibold transition-all duration-200"
        title="Change Color Theme"
      >
        <span>{activeThemeObj.icon}</span>
        <span className="hidden md:inline">{activeThemeObj.name}</span>
        <div
          className="w-2.5 h-2.5 rounded-full shadow-sm"
          style={{ backgroundColor: activeThemeObj.color }}
        />
        <span className="material-symbols-outlined text-[16px] text-slate-400">
          arrow_drop_down
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0f172a]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-2 z-50 animate-[fadeInUp_0.15s_ease-out] space-y-1">
          <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Color Palette Theme
          </div>

          {themes.map((t) => {
            const isSelected = t.id === currentTheme
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-[13px] font-semibold transition-all ${
                  isSelected
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[16px]">{t.icon}</span>
                  <div>
                    <span className="block leading-tight">{t.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{t.label}</span>
                  </div>
                </div>

                <div
                  className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: t.color }}
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
