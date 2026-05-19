import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import styles from './Navbar.module.css'

export const Navbar = () => {
  const { logout, user } = useAuth()

  return (
    <nav className={styles.navbar}>
      <Link to="/boards" className={styles.logo}>
        Kanban
      </Link>

      <div className={styles.right}>
        {user && <span className={styles.userName}>{user.name}</span>}
        <button className={styles.logoutBtn} onClick={logout}>
          Sign out
        </button>
      </div>
    </nav>
  )
}