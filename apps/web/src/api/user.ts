import { apiClient } from './client'
import type { User } from './auth'

export interface UserProfile extends User {
  createdAt: string
}

export const userApi = {
  getMe: async (): Promise<UserProfile> => {
    const res = await apiClient.get('/me')
    return res.data
  },

  updateMe: async (data: { name?: string; email?: string }): Promise<UserProfile> => {
    const res = await apiClient.patch('/me', data)
    return res.data
  },
}