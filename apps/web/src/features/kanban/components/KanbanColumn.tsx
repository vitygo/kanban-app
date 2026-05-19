import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDroppable } from '@dnd-kit/core'
import { toast } from 'sonner'
import { KanbanCard } from './KanbanCard'
import type { Column, Card } from '@/api'
import styles from './KanbanColumn.module.css'

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
  const { setNodeRef: setDroppableRef } = useDroppable({ id: column.id })

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `column-${column.id}`,
    data: { type: 'column', column },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.column}
    >
      <div className={styles.header} {...attributes} {...listeners}>
        <div className={styles.titleRow}>
          <i className={`ti ti-grip-vertical ${styles.dragHandle}`} aria-hidden="true" />
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

      <div ref={setDroppableRef} className={styles.cards}>
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