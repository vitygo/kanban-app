import { z } from 'zod'

export const createColumnSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50),
})

export const updateColumnSchema = z.object({
  title: z.string().min(1).max(50).optional(),
  wipLimit: z.number().int().positive().optional(),
})

export const reorderColumnsSchema = z.object({
  ids: z.array(z.string()).min(1),
})

export type CreateColumnInput = z.infer<typeof createColumnSchema>
export type UpdateColumnInput = z.infer<typeof updateColumnSchema>