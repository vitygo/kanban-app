import { apiClient } from './client'
import { tokenStorage } from './tokenStorage'

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export const authApi = {
  register: async (data: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/register', data)
    return res.data
  },

  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/login', data)
    return res.data
  },

  logout: async () => {
    await apiClient.post('/auth/logout')
    tokenStorage.clear()
  },
}