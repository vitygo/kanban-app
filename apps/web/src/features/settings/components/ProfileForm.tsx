import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useProfile, useUpdateProfile } from '../hooks/useProfile'
import styles from './ProfileForm.module.css'
import { format } from 'date-fns'

const schema = z.object({
  name: z.string().min(2, 'Minimum 2 characters').max(50),
  email: z.string().email('Invalid email'),
})

type FormData = z.infer<typeof schema>

export const ProfileForm = () => {
  const { data: profile, isLoading } = useProfile()
  const updateProfile = useUpdateProfile()

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (profile) {
      reset({ name: profile.name, email: profile.email })
    }
  }, [profile, reset])

  const onSubmit = async (data: FormData) => {
    await updateProfile.mutateAsync(data)
    reset(data)
  }

  if (isLoading) return <div className={styles.card}>Loading...</div>

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Profile</h2>
      <p className={styles.cardDesc}>Update your name and email</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            {...register('name')}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Your name"
          />
          {errors.name && (
            <span className={styles.fieldError}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            {...register('email')}
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <span className={styles.fieldError}>{errors.email.message}</span>
          )}
        </div>

        {profile?.createdAt && (
          <p className={styles.info}>
            <i className="ti ti-calendar" aria-hidden="true" />
            Member since {format(new Date(profile.createdAt), 'MMMM d, yyyy')}
          </p>
        )}

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={!isDirty || updateProfile.isPending}
          >
            {updateProfile.isPending ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  )
}