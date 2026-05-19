import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { useBoard } from '@/features/kanban'
import { KanbanBoard } from '@/features/kanban'
import { Topbar } from '@/components/Topbar/Topbar'
import styles from './BoardPage.module.css'

interface OutletContext {
  onMenuClick: () => void
}

export const BoardPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { onMenuClick } = useOutletContext<OutletContext>()
  const { data: board } = useBoard(id!)

  return (
    <div className={styles.page}>
      <Topbar
        title={board?.title ?? 'Board'}
        onMenuClick={onMenuClick}
        actions={
          <button
            onClick={() => navigate('/boards')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              background: 'none',
              fontSize: 14,
              color: '#6b7280',
              cursor: 'pointer',
            }}
          >
            <i className="ti ti-arrow-left" aria-hidden="true" />
            Boards
          </button>
        }
      />
      <div className={styles.content}>
        <KanbanBoard boardId={id!} />
      </div>
    </div>
  )
}