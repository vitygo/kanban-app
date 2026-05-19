import { Link } from 'react-router-dom'
import styles from './AuthTopbar.module.css'

export const AuthTopbar = () => (
  <div className={styles.topbar}>
    <Link to="/" className={styles.logo}>
      Kanbloom
    </Link>
  </div>
)