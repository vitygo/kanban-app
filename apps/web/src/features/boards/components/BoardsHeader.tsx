import { useAuthStore } from '@/store/authStore'
import type { Board } from '@/api'
import styles from './BoardsHeader.module.css'

interface BoardsHeaderProps {
  boards: Board[]
}

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export const BoardsHeader = ({ boards }: BoardsHeaderProps) => {
  const user = useAuthStore((s) => s.user)

  const totalCards = boards.reduce((sum, b) => sum + b.cardCount, 0)
  const totalColumns = boards.reduce((sum, b) => sum + b.columnCount, 0)

  return (
    <div className={styles.header}>
      <div className={styles.welcome}>
        <div className={styles.welcomeTitle}>
          {getGreeting()}, {user?.name?.split(' ')[0] ?? 'there'}
        </div>
        <div className={styles.welcomeSub}>
          You have {boards.length} {boards.length === 1 ? 'board' : 'boards'} with {totalCards} {totalCards === 1 ? 'card' : 'cards'} total
        </div>
      </div>

      <div className={styles.statsStrip}>
        <span className={styles.statValue}>{boards.length}</span> boards
        <span className={styles.statDot}>·</span>
        <span className={styles.statValue}>{totalCards}</span> cards
        <span className={styles.statDot}>·</span>
        <span className={styles.statValue}>{totalColumns}</span> columns
      </div>
    </div>
  )
}