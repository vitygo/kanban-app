import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { boardsApi, columnsApi, cardsApi } from '@/api'

export const useBoard = (boardId: string) => {
  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardsApi.getById(boardId),
  })
}

export const useCreateColumn = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { title: string }) => columnsApi.create(boardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    },
  })
}

export const useUpdateColumn = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title?: string; wipLimit?: number } }) =>
      columnsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    },
  })
}

export const useDeleteColumn = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: columnsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    },
  })
}

export const useCreateCard = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      columnId,
      data,
    }: {
      columnId: string
      data: { title: string; description?: string; priority?: string }
    }) => cardsApi.create(columnId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    },
  })
}

export const useUpdateCard = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: { title?: string; description?: string; priority?: string }
    }) => cardsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    },
  })
}

export const useDeleteCard = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cardsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    },
  })
}

export const useMoveCard = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { columnId: string; order: number } }) =>
      cardsApi.move(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    },
  })
}
