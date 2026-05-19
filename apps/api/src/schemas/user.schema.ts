import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Minimum 2 characters').max(50).optional(),
  email: z.string().email().optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'Minimum 8 characters'),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>