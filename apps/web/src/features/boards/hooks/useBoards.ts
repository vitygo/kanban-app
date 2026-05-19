import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { boardsApi } from '@/api'

export const useBoards = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: boardsApi.getAll,
  })
}

export const useCreateBoard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: boardsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}

export const useUpdateBoard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title?: string; description?: string } }) =>
      boardsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: boardsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}