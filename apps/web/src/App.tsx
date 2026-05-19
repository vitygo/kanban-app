import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import { useAuthStore } from '@/store/authStore'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { Layout } from '@/components/Layout/Layout'


const BoardsPage = lazy(() =>
  import('@/pages/BoardsPage').then((m) => ({ default: m.BoardsPage }))
)

const BoardPage = lazy(() =>
  import('@/pages/BoardPage').then((m) => ({ default: m.BoardPage }))
)

const SettingsPage = lazy(() =>
  import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
)

export default function App() {
  const initTheme = useThemeStore((s) => s.initTheme)
  const initAuth = useAuthStore((s) => s.initAuth)

  
  useEffect(() => {
    initAuth()
    initTheme()
  }, [])  

  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/boards" element={<BoardsPage />} />
              <Route path="/boards/:id" element={<BoardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/boards" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}