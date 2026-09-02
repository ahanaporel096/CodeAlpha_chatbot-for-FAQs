import { createContext, useContext, useState, useEffect } from 'react'

export const THEMES = [
  { id: 'emerald', name: 'Emerald Luxe', icon: '🌿', color: '#10b981', label: 'Forest Tech' },
  { id: 'crimson', name: 'Crimson Velvet', icon: '🪸', color: '#f43f5e', label: 'Sunset Coral' },
  { id: 'glacier', name: 'Glacier Aqua', icon: '❄️', color: '#06b6d4', label: 'Nordic Cyan' },
  { id: 'amethyst', name: 'Amethyst Glow', icon: '🔮', color: '#a855f7', label: 'Royal Violet' },
  { id: 'amber', name: 'Warm Amber', icon: '☀️', color: '#f59e0b', label: 'Espresso Gold' },
]

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('smart_faq_theme') || 'emerald'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
    localStorage.setItem('smart_faq_theme', currentTheme)
  }, [currentTheme])

  const setTheme = (themeId) => {
    setCurrentTheme(themeId)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
