import { Link } from 'react-router-dom'
import { RegisterForm } from '@/features/auth'
import styles from './LoginPage.module.css'

export const RegisterPage = () => (
  <div className={styles.page}>
    <div className={styles.card}>
      <h1 className={styles.title}>Sign up</h1>
      <RegisterForm />
      <p className={styles.link}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  </div>
)