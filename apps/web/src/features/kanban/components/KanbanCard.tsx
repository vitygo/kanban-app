import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { format } from 'date-fns'
import type { Card } from '@/api'
import styles from './KanbanCard.module.css'

interface KanbanCardProps {
  card: Card
  onEdit: (card: Card) => void
  onDelete: (id: string) => void
}

const priorityClass = {
  low: styles.priorityLow,
  medium: styles.priorityMedium,
  high: styles.priorityHigh,
}

export const KanbanCard = ({ card, onEdit, onDelete }: KanbanCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
    >
      <div className={styles.header}>
        <span className={styles.title}>{card.title}</span>
        <div className={styles.actions}>
          <button
            className={styles.actionBtn}
            onClick={(e) => { e.stopPropagation(); onEdit(card) }}
            aria-label="Edit card"
          >
            <i className="ti ti-edit" aria-hidden="true" />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={(e) => { e.stopPropagation(); onDelete(card.id) }}
            aria-label="Delete card"
          >
            <i className="ti ti-trash" aria-hidden="true" />
          </button>
        </div>
      </div>

      {card.description && (
        <p className={styles.description}>{card.description}</p>
      )}

      <div className={styles.footer}>
        <span className={`${styles.priority} ${priorityClass[card.priority]}`}>
          {card.priority}
        </span>
        {card.dueDate && (
          <span className={styles.dueDate}>
            <i className="ti ti-calendar" aria-hidden="true" />
            {format(new Date(card.dueDate), 'MMM d')}
          </span>
        )}
      </div>
    </div>
  )
}