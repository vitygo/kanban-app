import { Link } from 'react-router-dom'
import { LoginForm } from '@/features/auth'
import styles from './LoginPage.module.css'

export const LoginPage = () => (
  <div className={styles.page}>
    <div className={styles.card}>
      <h1 className={styles.title}>Sign in</h1>
      <LoginForm />
      <p className={styles.link}>
        Dont have an accaunt? <Link to="/register">Sign up</Link>
      </p>
    </div>
  </div>
)
