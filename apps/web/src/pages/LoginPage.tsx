import { Link } from 'react-router-dom'
import { LoginForm } from '@/features/auth'
import { AuthTopbar } from '@/components/AuthTopbar/AuthTopbar'
import styles from './LoginPage.module.css'

export const LoginPage = () => (
  <div className={styles.page}>
    <AuthTopbar />
    <div className={styles.card}>
      <h1 className={styles.title}>Sign in</h1>
      <LoginForm />
      <p className={styles.link}>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  </div>
)