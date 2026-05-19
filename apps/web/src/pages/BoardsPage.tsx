import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { BoardCard } from '@/features/boards/components/BoardCard'
import { CreateBoardModal } from '@/features/boards/components/CreateBoardModal'
import { useBoards} from '@/features/boards/hooks/useBoards'
import { Topbar } from '@/components/Topbar/Topbar'
import styles from './BoardsPage.module.css'

interface OutletContext {
  onMenuClick: () => void
}

export const BoardsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { onMenuClick } = useOutletContext<OutletContext>()
  const { data: boards, isLoading, isError } = useBoards()

  return (
    <>
      <Topbar
        title="Boards"
        onMenuClick={onMenuClick}
        actions={
          <button className={styles.newBtn} onClick={() => setIsModalOpen(true)}>
            <i className="ti ti-plus" aria-hidden="true" />
            New board
          </button>
        }
      />

      <div className={styles.page}>
        {isLoading && <div className={styles.state}>Loading...</div>}

        {isError && (
          <div className={styles.state}>Something went wrong. Try again.</div>
        )}

        {!isLoading && boards?.length === 0 && (
          <div className={styles.empty}>
            <i className="ti ti-layout-board" aria-hidden="true" />
            <p>No boards yet</p>
            <button className={styles.newBtn} onClick={() => setIsModalOpen(true)}>
              Create your first board
            </button>
          </div>
        )}

        {boards && boards.length > 0 && (
          <div className={styles.grid}>
            {boards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <CreateBoardModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}