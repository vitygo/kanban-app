import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useChangePassword } from '../hooks/useProfile'
import styles from './ProfileForm.module.css'

const schema = z.object({
  currentPassword: z.string().min(1, 'Required'),
  newPassword: z.string().min(8, 'Minimum 8 characters'),
  confirmPassword: z.string().min(1, 'Required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export const PasswordForm = () => {
  const changePassword = useChangePassword()

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await changePassword.mutateAsync({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
    reset()
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Change password</h2>
      <p className={styles.cardDesc}>Update your password to keep your account secure</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label className={styles.label}>Current password</label>
          <input
            {...register('currentPassword')}
            type="password"
            className={`${styles.input} ${errors.currentPassword ? styles.inputError : ''}`}
            placeholder="••••••••"
          />
          {errors.currentPassword && (
            <span className={styles.fieldError}>{errors.currentPassword.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>New password</label>
          <input
            {...register('newPassword')}
            type="password"
            className={`${styles.input} ${errors.newPassword ? styles.inputError : ''}`}
            placeholder="Minimum 8 characters"
          />
          {errors.newPassword && (
            <span className={styles.fieldError}>{errors.newPassword.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Confirm new password</label>
          <input
            {...register('confirmPassword')}
            type="password"
            className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <span className={styles.fieldError}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={!isDirty || changePassword.isPending}
          >
            {changePassword.isPending ? 'Changing...' : 'Change password'}
          </button>
        </div>
      </form>
    </div>
  )
}