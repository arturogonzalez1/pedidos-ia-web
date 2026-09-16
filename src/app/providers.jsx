import { ToastProvider } from '@/components/feedback/ToastContext'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import { ThemeProvider } from '@/theme/ThemeContext'

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
