import { create } from 'zustand'
import { tokenStorage } from '@/api'
import type { User } from '@/api'

interface AuthState {
  user: User | null
  isAuthenticated: boolean

  setAuth: (user: User, accessToken: string, refreshToken: string) => void
  logout: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!tokenStorage.getAccess(),
  isInitialized: false,


  setAuth: (user, accessToken, refreshToken) => {
    tokenStorage.setTokens(accessToken, refreshToken)
    set({ user, isAuthenticated: true })
  },

  logout: () => {
    tokenStorage.clear()
    set({ user: null, isAuthenticated: false })
  },


  initAuth: () => {
    const token = tokenStorage.getAccess()
    if (token) {
      set({ isAuthenticated: true })
    }
  },
}))