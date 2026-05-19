import styles from './Topbar.module.css'

interface TopbarProps {
  title: string
  actions?: React.ReactNode
  onMenuClick: () => void
}

export const Topbar = ({ title, actions, onMenuClick }: TopbarProps) => (
  <header className={styles.topbar}>
    <div className={styles.left}>
      <button
        className={styles.menuBtn}
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <i className="ti ti-menu-2" aria-hidden="true" />
      </button>
      <span className={styles.title}>{title}</span>
    </div>
    {actions && <div className={styles.right}>{actions}</div>}
  </header>
)