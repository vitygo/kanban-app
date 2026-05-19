import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar'
import { Topbar } from '../Topbar/Topbar'
import styles from './Layout.module.css'

const pageTitles: Record<string, string> = {
  '/boards': 'Boards',
  '/settings': 'Settings',
}

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const title = pageTitles[location.pathname] ?? 'Kanban'

  return (
    <div className={styles.layout}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className={styles.content}>
        <Topbar
          title={title}
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}