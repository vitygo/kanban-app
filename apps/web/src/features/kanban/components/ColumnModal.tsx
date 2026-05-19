import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Column } from '@/api'
import styles from './CardModal.module.css'

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(50),
})

type FormData = z.infer<typeof schema>

interface ColumnModalProps {
  onClose: () => void
  onSubmit: (data: FormData) => Promise<void>
  isPending: boolean
  defaultValues?: Partial<Column>
  mode: 'create' | 'edit'
}

export const ColumnModal = ({
  onClose,
  onSubmit,
  isPending,
  defaultValues,
  mode,
}: ColumnModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title ?? '',
    },
  })

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {mode === 'create' ? 'New column' : 'Edit column'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label className={styles.label}>Title</label>
            <input
              {...register('title')}
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
              placeholder="e.g. In Progress"
              autoFocus
            />
            {errors.title && (
              <span className={styles.fieldError}>{errors.title.message}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isPending}
            >
              {isPending
                ? mode === 'create' ? 'Creating...' : 'Saving...'
                : mode === 'create' ? 'Create column' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}