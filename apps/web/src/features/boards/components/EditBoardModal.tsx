import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUpdateBoard } from '../hooks/useBoards'
import type { Board } from '@/api'
import styles from './CreateBoardModal.module.css'

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Max 50 characters'),
  description: z.string().max(200, 'Max 200 characters').optional(),
})

type FormData = z.infer<typeof schema>

interface EditBoardModalProps {
  board: Board
  onClose: () => void
}

export const EditBoardModal = ({ board, onClose }: EditBoardModalProps) => {
  const updateBoard = useUpdateBoard()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: board.title,
      description: board.description ?? '',
    },
  })

  const onSubmit = async (data: FormData) => {
    await updateBoard.mutateAsync({ id: board.id, data })
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit board</h2>
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
              placeholder="e.g. My project"
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
              className={`${styles.input} ${styles.textarea} ${errors.description ? styles.inputError : ''}`}
              placeholder="What is this board for?"
            />
            {errors.description && (
              <span className={styles.fieldError}>{errors.description.message}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={updateBoard.isPending}
            >
              {updateBoard.isPending ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}