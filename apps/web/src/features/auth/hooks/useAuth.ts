import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/api'
import { useAuthStore } from '@/store/authStore'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setAuth, logout: storeLogout, user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const login = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await authApi.login(data)
      setAuth(res.user, res.accessToken, res.refreshToken)
      navigate('/boards')
    } catch (err: any) {
      setError(err.response?.data?.error ?? 'something wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: { name: string; email: string; password: string }) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await authApi.register(data)
      setAuth(res.user, res.accessToken, res.refreshToken)
      navigate('/boards')
    } catch (err: any) {
      setError(err.response?.data?.error ?? 'something wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await authApi.logout()
    storeLogout()
    navigate('/login')
}

return { login, register, logout, isLoading, error, user, isAuthenticated }
}