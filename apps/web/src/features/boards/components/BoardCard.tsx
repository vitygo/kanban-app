import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'
import { useDeleteBoard } from '../hooks/useBoards'
import { EditBoardModal } from './EditBoardModal'
import type { Board } from '@/api'
import styles from './BoardCard.module.css'

const ACCENT_COLORS = [
    '#6366f1', '#0f6e56', '#993c1d', '#0c447c',
    '#633806', '#72243e', '#3b6d11', '#a32d2d',
  ]
  
  const getAccentColor = (id: string) => {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash)
    }
    return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length]
  }

interface BoardCardProps {
  board: Board
}

export const BoardCard = ({ board }: BoardCardProps) => {
  const navigate = useNavigate()
  const deleteBoard = useDeleteBoard()
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    toast('Delete this board?', {
      action: {
        label: 'Delete',
        onClick: () => deleteBoard.mutate(board.id),
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    })
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditOpen(true)
  }

  return (
    <>
      <div className={styles.card} onClick={() => navigate(`/boards/${board.id}`)}>
        <div
          className={styles.accent}
          style={{ background: getAccentColor(board.id) }}
        />
        <div className={styles.title}>{board.title}</div>
        {board.description && (
          <div className={styles.description}>{board.description}</div>
        )}
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <i className="ti ti-layout-columns" aria-hidden="true" />
            {board.columnCount} {board.columnCount === 1 ? 'col' : 'cols'}
          </span>
          <span className={styles.metaDot}>·</span>
          <span className={styles.metaItem}>
          <i className="ti ti-layout-columns" aria-hidden="true" />
            {board.cardCount} {board.cardCount === 1 ? 'card' : 'cards'}
          </span>
        </div>
        <div className={styles.footer}>
          <span className={styles.date}>
            {formatDistanceToNow(new Date(board.createdAt), { addSuffix: true })}
          </span>
          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              onClick={handleEdit}
              aria-label="Edit board"
            >
              <i className="ti ti-edit" aria-hidden="true" />
            </button>
            <button
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              onClick={handleDelete}
              aria-label="Delete board"
            >
              <i className="ti ti-trash" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <EditBoardModal
          board={board}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  )
}