import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  initTheme: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',

  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    set({ theme: next })
  },

  initTheme: () => {
    const saved = localStorage.getItem('theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const theme = saved ?? preferred
    document.documentElement.setAttribute('data-theme', theme)
    set({ theme })
  },
}))