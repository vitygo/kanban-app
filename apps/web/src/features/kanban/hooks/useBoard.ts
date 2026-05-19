import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
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
      toast.success('Column created')
    },
    onError: () => {
      toast.error('Failed to create column')
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
      toast.success('Column updated')
    },
    onError: () => {
      toast.error('Failed to update column')
    },
  })
}

export const useDeleteColumn = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: columnsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
      toast.success('Column deleted')
    },
    onError: () => {
      toast.error('Failed to delete column')
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
      toast.success('Card created')
    },
    onError: () => {
      toast.error('Failed to create card')
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
      toast.success('Card updated')
    },
    onError: () => {
      toast.error('Failed to update card')
    },
  })
}

export const useDeleteCard = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cardsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
      toast.success('Card deleted')
    },
    onError: () => {
      toast.error('Failed to delete card')
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
    onError: () => {
      toast.error('Failed to move card')
    },
  })
}