import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useBoards} from '@/features/boards/hooks/useBoards'
import { BoardCard } from '@/features/boards/components/BoardCard'
 import {  CreateBoardModal } from '@/features/boards/components/CreateBoardModal'
import {   BoardsHeader } from '@/features/boards/components/BoardsHeader'
import { Topbar } from '@/components/Topbar/Topbar'
import styles from './BoardsPage.module.css'



interface OutletContext {
  onMenuClick: () => void
}

export const BoardsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { onMenuClick } = useOutletContext<OutletContext>()
  const { data: boards, isLoading, isError } = useBoards()

  const filtered = boards?.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Topbar
        title="Boards"
        onMenuClick={onMenuClick}
        actions={
          <div className={styles.topbarActions}>
            <div className={styles.searchRow}>
              <i className={`ti ti-search ${styles.searchIcon}`} aria-hidden="true" />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className={styles.clearBtn}
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  <i className="ti ti-x" aria-hidden="true" />
                </button>
              )}
            </div>
            <button className={styles.newBtn} onClick={() => setIsModalOpen(true)}>
              <i className="ti ti-plus" aria-hidden="true" />
              <span className={styles.newBtnText}>New board</span>
            </button>
          </div>
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
          <>
            <BoardsHeader boards={boards} />

            {filtered && filtered.length === 0 && (
              <div className={styles.state}>No boards match "{search}"</div>
            )}

            {filtered && filtered.length > 0 && (
              <>
                <div className={styles.sectionTitle}>Your boards</div>
                <div className={styles.grid}>
                  {filtered.map((board) => (
                    <BoardCard key={board.id} board={board} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <CreateBoardModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}