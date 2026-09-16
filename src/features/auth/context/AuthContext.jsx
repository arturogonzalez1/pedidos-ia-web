import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { parseBearerToken } from '@/lib/token'
import { authService } from '@/features/auth/services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  const clearSession = useCallback(() => {
    setUser(null)
    setToken(null)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      const stored = authService.getStoredSession()
      const payload = parseBearerToken(stored.token)

      if (!payload || !stored.token) {
        if (!cancelled) setIsBootstrapping(false)
        return
      }

      try {
        const data = await authService.me()
        if (!cancelled) {
          setToken(stored.token)
          setUser(data.user)
        }
      } catch {
        await authService.logout().catch(() => undefined)
        if (!cancelled) clearSession()
      } finally {
        if (!cancelled) setIsBootstrapping(false)
      }
    }

    bootstrap()
    return () => {
      cancelled = true
    }
  }, [clearSession])

  useEffect(() => {
    function onUnauthorized() {
      clearSession()
    }
    window.addEventListener('auth:unauthorized', onUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized)
  }, [clearSession])

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password)
    setToken(data.token)
    setUser(data.user)
    return data
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    clearSession()
  }, [clearSession])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isBootstrapping,
      login,
      logout,
    }),
    [user, token, isBootstrapping, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}
