import { create } from 'zustand'
import { tokenStorage } from '@/api'
import type { User } from '@/api'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setAuth: (user: User, accessToken: string, refreshToken: string) => void
  setUser: (user: User) => void
  logout: () => void
  initAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!tokenStorage.getAccess(),

  setAuth: (user, accessToken, refreshToken) => {
    tokenStorage.setTokens(accessToken, refreshToken)
    set({ user, isAuthenticated: true })
  },

  setUser: (user) => {
    set({ user })
  },

  logout: () => {
    tokenStorage.clear()
    set({ user: null, isAuthenticated: false })
  },

  initAuth: async () => {
    const token = tokenStorage.getAccess()
    if (!token) {
      set({ isAuthenticated: false })
      return
    }

    try {
        const baseUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api'
        const res = await fetch(`${baseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        const user = await res.json()
        set({ user, isAuthenticated: true })
      } else {
        tokenStorage.clear()
        set({ user: null, isAuthenticated: false })
      }
    } catch {
      set({ isAuthenticated: true })
    }
  },
}))