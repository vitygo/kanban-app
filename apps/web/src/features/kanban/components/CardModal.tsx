import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select } from '@/components/Select/Select'
import type { Card } from '@/api'
import styles from './CardModal.module.css'

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  priority: z.enum(['low', 'medium', 'high']),
})

type FormData = z.infer<typeof schema>

interface CardModalProps {
  onClose: () => void
  onSubmit: (data: FormData) => Promise<void>
  isPending: boolean
  defaultValues?: Partial<Card>
  mode: 'create' | 'edit'
}

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export const CardModal = ({
  onClose,
  onSubmit,
  isPending,
  defaultValues,
  mode,
}: CardModalProps) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      priority: defaultValues?.priority ?? 'medium',
    },
  })

  const priority = watch('priority')

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {mode === 'create' ? 'New card' : 'Edit card'}
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
              placeholder="e.g. Fix login bug"
              autoFocus
            />
            {errors.title && (
              <span className={styles.fieldError}>{errors.title.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description (optional)</label>
            <textarea
              {...register('description')}
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Add more details..."
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Priority</label>
            <Select
              options={PRIORITY_OPTIONS}
              value={priority}
              onChange={(val) => setValue('priority', val as 'low' | 'medium' | 'high')}
            />
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
                : mode === 'create' ? 'Create card' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}