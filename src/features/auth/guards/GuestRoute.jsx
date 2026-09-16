import { Navigate, Outlet } from 'react-router-dom'
import { PageLoader } from '@/components/ui'
import { useAuth } from '@/features/auth/context/AuthContext'

export function GuestRoute() {
  const { isAuthenticated, isBootstrapping } = useAuth()

  if (isBootstrapping) return <PageLoader label="Restaurando sesión…" />
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
