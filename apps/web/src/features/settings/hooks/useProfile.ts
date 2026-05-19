import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userApi } from '@/api'
import { useAuthStore } from '@/store/authStore'

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getMe,
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.updateMe,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      useAuthStore.setState({ user: { id: user.id, name: user.name, email: user.email } })
      toast.success('Profile updated')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error ?? 'Failed to update profile')
    },
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: userApi.changePassword,
    onSuccess: () => {
      toast.success('Password changed')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error ?? 'Failed to change password')
    },
  })
}