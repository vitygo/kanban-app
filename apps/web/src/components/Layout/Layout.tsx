import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar'
import styles from './Layout.module.css'

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={styles.layout}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className={styles.content}>
        <Outlet context={{ onMenuClick: () => setSidebarOpen((p) => !p) }} />
      </div>
    </div>
  )
}