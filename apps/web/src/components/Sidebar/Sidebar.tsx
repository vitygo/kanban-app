import { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { useBoards } from '@/features/boards/hooks/useBoards'
import { useBoard } from '@/features/kanban'
import { useThemeStore } from '@/store/themeStore'
import styles from './Sidebar.module.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const ACCENT_COLORS = [
  '#6366f1', '#0f6e56', '#993c1d', '#0c447c',
  '#633806', '#72243e', '#3b6d11', '#a32d2d',
]

const getAccentColor = (id: string) => {
  const index = id.charCodeAt(0) % ACCENT_COLORS.length
  return ACCENT_COLORS[index]
}

const BoardItem = ({ board, onClose }: { board: { id: string; title: string }; onClose: () => void }) => {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = location.pathname === `/boards/${board.id}`
  const { data: boardData } = useBoard(board.id)

  const handleClick = () => {
    navigate(`/boards/${board.id}`)
    onClose()
  }

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded((p) => !p)
  }

  return (
    <div className={styles.boardItem}>
      <button
        className={`${styles.boardLink} ${isActive ? styles.active : ''}`}
        onClick={handleClick}
      >
        <span
          className={styles.boardDot}
          style={{ background: getAccentColor(board.id) }}
        />
        <span className={styles.boardName}>{board.title}</span>
        <i
          className={`ti ti-chevron-right ${styles.expandIcon} ${expanded ? styles.open : ''}`}
          aria-hidden="true"
          onClick={handleExpand}
        />
      </button>

      {expanded && boardData?.columns && (
        <div className={styles.columnsList}>
          {boardData.columns.map((col) => (
            <button
              key={col.id}
              className={styles.columnLink}
              onClick={() => {
                navigate(`/boards/${board.id}`)
                onClose()
              }}
            >
              {col.title}
              <span className={styles.columnCount}>{col.cards.length}</span>
            </button>
          ))}
          {boardData.columns.length === 0 && (
            <span className={styles.columnLink} style={{ cursor: 'default' }}>
              No columns yet
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { logout, user } = useAuth()
  const { data: boards } = useBoards()
  const { theme, toggleTheme } = useThemeStore()

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logoRow}>
          <NavLink to="/boards" className={styles.logo}>
            <i className="ti ti-layout-kanban" aria-hidden="true" />
            <span>Kanban</span>
          </NavLink>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        <nav className={styles.nav}>
          <span className={styles.navLabel}>Menu</span>

          <NavLink
            to="/boards"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <i className={`ti ti-layout-board ${styles.navIcon}`} aria-hidden="true" />
            <span className={styles.navText}>Boards</span>
          </NavLink>

          <button className={styles.navItem} onClick={toggleTheme}>
            <i
              className={`ti ${theme === 'light' ? 'ti-moon' : 'ti-sun'} ${styles.navIcon}`}
              aria-hidden="true"
            />
            <span className={styles.navText}>
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </span>
          </button>
          
        </nav>
        {boards && boards.length > 0 && (
          <div className={styles.boardsSection}>
            <span className={styles.navLabel}>Boards</span>
            {boards.map((board) => (
              <BoardItem key={board.id} board={board} onClose={onClose} />
            ))}
          </div>
        )}

     

        <div className={styles.footer}>
          <div className={styles.userRow}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user?.name}</div>
              <div className={styles.userMeta}>
                {boards?.length ?? 0} {boards?.length === 1 ? 'board' : 'boards'}
              </div>
            </div>
            <button
              className={styles.logoutBtn}
              onClick={logout}
              aria-label="Sign out"
            >
              <i className="ti ti-logout" aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}