import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'

export const LandingPage = () => (
  <div className={styles.page}>
    <nav className={styles.nav}>
      <span className={styles.navLogo}>
        Kanbloom
      </span>
      <div className={styles.navLinks}>
        <a
          href="https://github.com/vitygo/kanban-app"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          GitHub
        </a>
        <Link to="/login" className={styles.navBtn}>
          Sign in
        </Link>
      </div>
    </nav>

    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <span className={styles.badge}>Open source project manager</span>
        <h1 className={styles.heroTitle}>Organize your work with drag and drop</h1>
        <p className={styles.heroSub}>
          A simple kanban board to manage tasks, track progress and stay productive.
          Built with React and TypeScript.
        </p>

        <div className={styles.features}>
          <div className={styles.feat}>
            <i className={`ti ti-check ${styles.featIcon}`} aria-hidden="true" />
            Drag and drop cards and columns
          </div>
          <div className={styles.feat}>
            <i className={`ti ti-check ${styles.featIcon}`} aria-hidden="true" />
            Dark and light theme
          </div>
          <div className={styles.feat}>
            <i className={`ti ti-check ${styles.featIcon}`} aria-hidden="true" />
            Fully responsive design
          </div>
          <div className={styles.feat}>
            <i className={`ti ti-check ${styles.featIcon}`} aria-hidden="true" />
            Real-time CRUD operations
          </div>
        </div>

        <div className={styles.cta}>
          <Link to="/register" className={styles.ctaPrimary}>
            Get started free
          </Link>
          <a
            href="https://github.com/vitygo/kanban-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaOutline}
          >
            <i className="ti ti-brand-github" aria-hidden="true" />
            View source
          </a>
        </div>
      </div>

      <div className={styles.heroRight}>
        <div className={styles.preview}>
          <div className={styles.previewTopbar}>
            <span className={`${styles.dot} ${styles.dotR}`} />
            <span className={`${styles.dot} ${styles.dotY}`} />
            <span className={`${styles.dot} ${styles.dotG}`} />
          </div>
          <div className={styles.previewBody}>
            <div className={styles.miniCol}>
              <div className={styles.miniColTitle}>To do</div>
              <div className={styles.miniCard}>
                Design homepage
                <br />
                <span className={`${styles.miniBadge} ${styles.badgeHigh}`}>high</span>
              </div>
              <div className={styles.miniCard}>
                Write API docs
                <br />
                <span className={`${styles.miniBadge} ${styles.badgeMedium}`}>medium</span>
              </div>
              <div className={styles.miniCard}>
                Setup CI/CD
                <br />
                <span className={`${styles.miniBadge} ${styles.badgeLow}`}>low</span>
              </div>
            </div>
            <div className={styles.miniCol}>
              <div className={styles.miniColTitle}>In progress</div>
              <div className={styles.miniCard}>
                Auth flow
                <br />
                <span className={`${styles.miniBadge} ${styles.badgeHigh}`}>high</span>
              </div>
              <div className={styles.miniCard}>
                User testing
                <br />
                <span className={`${styles.miniBadge} ${styles.badgeMedium}`}>medium</span>
              </div>
            </div>
            <div className={styles.miniCol}>
              <div className={styles.miniColTitle}>Done</div>
              <div className={styles.miniCard}>
                Database schema
                <br />
                <span className={`${styles.miniBadge} ${styles.badgeLow}`}>low</span>
              </div>
              <div className={styles.miniCard}>
                Project setup
                <br />
                <span className={`${styles.miniBadge} ${styles.badgeLow}`}>low</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer className={styles.footer}>
      <span>Built with React, TypeScript, Express, PostgreSQL</span>
      <span>Made for portfolio</span>
    </footer>
  </div>
)