import { apiClient } from './client'

export interface Column {
  id: string
  title: string
  order: number
  wipLimit?: number
  boardId: string
  cards: Card[]
}

export interface Card {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  order: number
  columnId: string
  createdAt: string
}

export const columnsApi = {
  create: async (boardId: string, data: { title: string }): Promise<Column> => {
    const res = await apiClient.post(`/boards/${boardId}/columns`, data)
    return res.data
  },

  update: async (id: string, data: { title?: string; wipLimit?: number }): Promise<Column> => {
    const res = await apiClient.patch(`/columns/${id}`, data)
    return res.data
  },

  reorder: async (boardId: string, ids: string[]): Promise<void> => {
    await apiClient.patch(`/boards/${boardId}/columns/reorder`, { ids })
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/columns/${id}`)
  },
}

export const cardsApi = {
  create: async (
    columnId: string,
    data: { title: string; description?: string; priority?: string }
  ): Promise<Card> => {
    const res = await apiClient.post(`/columns/${columnId}/cards`, data)
    return res.data
  },

  update: async (
    id: string,
    data: { title?: string; description?: string; priority?: string; dueDate?: string }
  ): Promise<Card> => {
    const res = await apiClient.patch(`/cards/${id}`, data)
    return res.data
  },

  move: async (id: string, data: { columnId: string; order: number }): Promise<Card> => {
    const res = await apiClient.patch(`/cards/${id}/move`, data)
    return res.data
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/cards/${id}`)
  },
}