import { apiClient } from './client'

export interface BoardColumn {
  id: string
  title: string
  cardCount: number
}

export interface Board {
  id: string
  title: string
  description?: string
  createdAt: string
  columnCount: number
  cardCount: number
  columns: BoardColumn[]
}

export const boardsApi = {
  getAll: async (): Promise<Board[]> => {
    const res = await apiClient.get('/boards')
    return res.data
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/boards/${id}`)
    return res.data
  },

  create: async (data: { title: string; description?: string }): Promise<Board> => {
    const res = await apiClient.post('/boards', data)
    return res.data
  },

  update: async (id: string, data: { title?: string; description?: string }): Promise<Board> => {
    const res = await apiClient.patch(`/boards/${id}`, data)
    return res.data
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/boards/${id}`)
  },
}