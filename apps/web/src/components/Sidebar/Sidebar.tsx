import { NavLink } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { useBoards } from '@/features/boards/hooks/useBoards'
import styles from './Sidebar.module.css'
import { useThemeStore } from '@/store/themeStore'
interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { theme, toggleTheme } = useThemeStore()
  const { logout, user } = useAuth()
  const { data: boards } = useBoards()

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logoRow}>
          <NavLink to="/boards" className={styles.logo}>
            <span>Kanbloom</span>
            
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
            onClick={onClose}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <i className={`ti ti-layout-board ${styles.navIcon}`} aria-hidden="true" />
            <span className={styles.navText}>Boards</span>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <i className={`ti ti-settings ${styles.navIcon}`} aria-hidden="true" />
            <span className={styles.navText}>Settings</span>
          </NavLink>
          <button
  className={styles.navItem}
  onClick={toggleTheme}
>
  <i
    className={`ti ${theme === 'light' ? 'ti-moon' : 'ti-sun'} ${styles.navIcon}`}
    aria-hidden="true"
  />
  <span className={styles.navText}>
    {theme === 'light' ? 'Dark mode' : 'Light mode'}
  </span>
</button>
        </nav>

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