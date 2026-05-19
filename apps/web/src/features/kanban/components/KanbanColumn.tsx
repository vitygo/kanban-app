import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { KanbanCard } from './KanbanCard'
import type { Column, Card } from '@/api'
import styles from './KanbanColumn.module.css'
import { toast } from 'sonner'

interface KanbanColumnProps {
  column: Column
  onAddCard: (columnId: string) => void
  onEditCard: (card: Card) => void
  onDeleteCard: (id: string) => void
  onDeleteColumn: (id: string) => void
  onEditColumn: (column: Column) => void
}

export const KanbanColumn = ({
  column,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onDeleteColumn,
  onEditColumn,
}: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id: column.id })

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{column.title}</span>
          <span className={styles.count}>{column.cards.length}</span>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.actionBtn}
            onClick={() => onEditColumn(column)}
            aria-label="Edit column"
          >
            <i className="ti ti-edit" aria-hidden="true" />
          </button>
          <button
  className={`${styles.actionBtn} ${styles.deleteBtn}`}
  onClick={() => {
    toast('Delete this column and all its cards?', {
      action: {
        label: 'Delete',
        onClick: () => onDeleteColumn(column.id),
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    })
  }}
  aria-label="Delete column"
>
  <i className="ti ti-trash" aria-hidden="true" />
</button>
        </div>
      </div>

      <div ref={setNodeRef} className={styles.cards}>
        <SortableContext
          items={column.cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onEdit={onEditCard}
              onDelete={onDeleteCard}
            />
          ))}
        </SortableContext>
      </div>

      <button
        className={styles.addBtn}
        onClick={() => onAddCard(column.id)}
      >
        <i className="ti ti-plus" aria-hidden="true" />
        Add card
      </button>
    </div>
  )
}