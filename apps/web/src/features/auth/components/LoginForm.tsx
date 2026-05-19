import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../hooks/useAuth'
import styles from './LoginForm.module.css'

const schema = z.object({
  email: z.string().email('invalid email'),
  password: z.string().min(1, 'Enter Password'),
})

type FormData = z.infer<typeof schema>

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(login)}  
    >
      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          {...register('email')}
          type="email"
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <span className={styles.fieldError}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Пароль</label>
        <input
          {... register('password')}
          type="password"
          className={`${styles.input} ${errors.password ? styles.error : ''}`}
          placeholder="••••••••"
        />
        {errors.password && (
          <span className={styles.fieldError}>{errors.password.message}</span>
        )}
      </div>

      {error && <div className={styles.submitError}>{error}</div>}

      <button
        type="submit"
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'loading...' : 'Enter'}
      </button>
    </form>
  )
}