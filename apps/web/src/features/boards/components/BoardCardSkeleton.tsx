import { Skeleton } from '@/components/Skeleton/Skeleton'
import styles from './BoardCardSkeleton.module.css'

export const BoardCardSkeleton = () => (
  <div className={styles.card}>
    <Skeleton height={6} borderRadius={3} width="100%" />
    <Skeleton height={18} width="60%" />
    <Skeleton height={14} width="80%" />
    <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
      <Skeleton height={14} width={80} />
      <Skeleton height={14} width={60} />
    </div>
  </div>
)