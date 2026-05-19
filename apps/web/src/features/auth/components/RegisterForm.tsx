import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../hooks/useAuth'
import styles from './LoginForm.module.css'

const schema = z.object({
  name: z.string().min(2, 'Minimum 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
})

type FormData = z.infer<typeof schema>

export const RegisterForm = () => {
  const { register: registerUser, isLoading, error } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <form className={styles.form} onSubmit={handleSubmit(registerUser)}>
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input
          {...register('name')}
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder="Your name"
        />
        {errors.name && <span className={styles.fieldError}>{errors.name.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          {...register('email')}
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder="you@example.com"
        />
        {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Password</label>
        <input
          {...register('password')}
          type="password"
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
          placeholder="Minimum 8 characters"
        />
        {errors.password && <span className={styles.fieldError}>{errors.password.message}</span>}
      </div>

      {error && <div className={styles.submitError}>{error}</div>}

      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign up'}
      </button>
    </form>
  )
}