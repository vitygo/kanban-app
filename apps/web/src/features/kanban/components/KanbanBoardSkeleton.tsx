import { Skeleton } from '@/components/Skeleton/Skeleton'
import styles from './KanbanBoardSkeleton.module.css'

const ColumnSkeleton = ({ cards }: { cards: number }) => (
  <div className={styles.column}>
    <div className={styles.header}>
      <Skeleton height={16} width={80} />
      <Skeleton height={18} width={24} borderRadius={10} />
    </div>
    {Array.from({ length: cards }).map((_, i) => (
      <div key={i} className={styles.card}>
        <Skeleton height={14} width="75%" />
        <Skeleton height={12} width="90%" />
        <div style={{ display: 'flex', gap: 6 }}>
          <Skeleton height={18} width={50} borderRadius={4} />
          <Skeleton height={18} width={60} borderRadius={4} />
        </div>
      </div>
    ))}
  </div>
)

export const KanbanBoardSkeleton = () => (
  <div className={styles.board}>
    <ColumnSkeleton cards={3} />
    <ColumnSkeleton cards={2} />
    <ColumnSkeleton cards={4} />
  </div>
)