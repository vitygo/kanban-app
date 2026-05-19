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
          <button className={styles.backBtn} onClick={() => navigate('/boards')}>
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