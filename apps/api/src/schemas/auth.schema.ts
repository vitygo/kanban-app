import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, 'Мінімум 2 символи'),
  email: z.string().email('Невалідний email'),
  password: z.string().min(8, 'Мінімум 8 символів'),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
})

// Типи з схем — не пишемо інтерфейси вручну
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>