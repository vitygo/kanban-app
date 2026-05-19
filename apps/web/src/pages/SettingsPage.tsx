import { useOutletContext } from 'react-router-dom'
import { ProfileForm, PasswordForm } from '@/features/settings'
import { Topbar } from '@/components/Topbar/Topbar'
import styles from './SettingsPage.module.css'

interface OutletContext {
  onMenuClick: () => void
}

export const SettingsPage = () => {
  const { onMenuClick } = useOutletContext<OutletContext>()

  return (
    <>
      <Topbar title="Settings" onMenuClick={onMenuClick} />
      <div className={styles.page}>
        <ProfileForm />
        <PasswordForm />
      </div>
    </>
  )
}