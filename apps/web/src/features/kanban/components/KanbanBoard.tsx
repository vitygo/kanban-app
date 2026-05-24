import { useState } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { toast } from 'sonner'
import { KanbanColumn } from './KanbanColumn'
import { CardModal } from './CardModal'
import { ColumnModal } from './ColumnModal'
import {
  useBoard,
  useCreateColumn,
  useUpdateColumn,
  useDeleteColumn,
  useCreateCard,
  useUpdateCard,
  useDeleteCard,
  useMoveCard,
} from '../hooks/useBoard'
import { columnsApi } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import type { Card, Column } from '@/api'
import styles from './KanbanBoard.module.css'
import { KanbanBoardSkeleton } from './KanbanBoardSkeleton'

interface KanbanBoardProps {
  boardId: string
}

type CardModalState =
  | { mode: 'create'; columnId: string }
  | { mode: 'edit'; card: Card }
  | null

type ColumnModalState =
  | { mode: 'create' }
  | { mode: 'edit'; column: Column }
  | null

export const KanbanBoard = ({ boardId }: KanbanBoardProps) => {
  const { data: board, isLoading } = useBoard(boardId)
  const queryClient = useQueryClient()
  const [cardModal, setCardModal] = useState<CardModalState>(null)
  const [columnModal, setColumnModal] = useState<ColumnModalState>(null)

  const createColumn = useCreateColumn(boardId)
  const updateColumn = useUpdateColumn(boardId)
  const deleteColumn = useDeleteColumn(boardId)
  const createCard = useCreateCard(boardId)
  const updateCard = useUpdateCard(boardId)
  const deleteCard = useDeleteCard(boardId)
  const moveCard = useMoveCard(boardId)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || !board) return

    const activeId = String(active.id)
    const overId = String(over.id)

    // Column drag
    if (activeId.startsWith('column-') && overId.startsWith('column-')) {
      const fromColumnId = activeId.replace('column-', '')
      const toColumnId = overId.replace('column-', '')

      if (fromColumnId === toColumnId) return

      const oldIndex = board.columns.findIndex((c) => c.id === fromColumnId)
      const newIndex = board.columns.findIndex((c) => c.id === toColumnId)

      if (oldIndex === -1 || newIndex === -1) return

      const newOrder = [...board.columns]
      const [moved] = newOrder.splice(oldIndex, 1)
      newOrder.splice(newIndex, 0, moved)

      const ids = newOrder.map((c) => c.id)

      try {
        await columnsApi.reorder(boardId, ids)
        queryClient.invalidateQueries({ queryKey: ['board', boardId] })
      } catch {
        toast.error('Failed to reorder columns')
      }
      return
    }

    // Card drag
    const activeCard = board.columns
      .flatMap((c) => c.cards)
      .find((c) => c.id === activeId)

    if (!activeCard) return

    const overColumn = board.columns.find(
      (col) => col.id === overId || col.cards.some((c) => c.id === overId)
    )

    if (!overColumn) return

    const overCards = overColumn.cards
    const overIndex = overCards.findIndex((c) => c.id === overId)
    const newOrder = overIndex >= 0 ? overIndex + 1 : overCards.length + 1

    moveCard.mutate({
      id: activeCard.id,
      data: { columnId: overColumn.id, order: newOrder },
    })
  }

  const handleCardSubmit = async (data: {
    title: string
    description?: string
    priority: 'low' | 'medium' | 'high'
  }) => {
    if (!cardModal) return

    if (cardModal.mode === 'create') {
      await createCard.mutateAsync({ columnId: cardModal.columnId, data })
    } else {
      await updateCard.mutateAsync({ id: cardModal.card.id, data })
    }

    setCardModal(null)
  }

  const handleColumnSubmit = async (data: { title: string }) => {
    if (!columnModal) return

    if (columnModal.mode === 'create') {
      await createColumn.mutateAsync(data)
    } else {
      await updateColumn.mutateAsync({ id: columnModal.column.id, data })
    }

    setColumnModal(null)
  }

  if (isLoading) return <KanbanBoardSkeleton />
  if (!board) return <div className={styles.loading}>Board not found</div>

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={board.columns.map((c) => `column-${c.id}`)}
          strategy={horizontalListSortingStrategy}
        >
          <div className={styles.board}>
            {board.columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onAddCard={(columnId) => setCardModal({ mode: 'create', columnId })}
                onEditCard={(card) => setCardModal({ mode: 'edit', card })}
                onDeleteCard={(id) => {
                  toast('Delete this card?', {
                    action: {
                      label: 'Delete',
                      onClick: () => deleteCard.mutate(id),
                    },
                    cancel: {
                      label: 'Cancel',
                      onClick: () => {},
                    },
                  })
                }}
                onEditColumn={(column) => setColumnModal({ mode: 'edit', column })}
                onDeleteColumn={(id) => deleteColumn.mutate(id)}
              />
            ))}

            <button
              className={styles.addColumnBtn}
              onClick={() => setColumnModal({ mode: 'create' })}
            >
              <i className="ti ti-plus" aria-hidden="true" />
              Add column
            </button>
          </div>
        </SortableContext>
      </DndContext>

      {cardModal && (
        <CardModal
          mode={cardModal.mode}
          defaultValues={cardModal.mode === 'edit' ? cardModal.card : undefined}
          onClose={() => setCardModal(null)}
          onSubmit={handleCardSubmit}
          isPending={createCard.isPending || updateCard.isPending}
        />
      )}

      {columnModal && (
        <ColumnModal
          mode={columnModal.mode}
          defaultValues={columnModal.mode === 'edit' ? columnModal.column : undefined}
          onClose={() => setColumnModal(null)}
          onSubmit={handleColumnSubmit}
          isPending={createColumn.isPending || updateColumn.isPending}
        />
      )}
    </>
  )
}