import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '@/features/auth/services/authService'
import { getTokenExpiryMs, isTokenValid } from '@/lib/token'

const AuthContext = createContext(null)

function readInitialSession() {
  const stored = authService.getStoredSession()
  if (stored.token && stored.user) return stored
  authService.clearSession()
  return { token: null, user: null, expiresAt: null }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readInitialSession)
  const { user, token, expiresAt } = session

  const clearSession = useCallback(() => {
    authService.clearSession()
    setSession({ token: null, user: null, expiresAt: null })
  }, [])

  useEffect(() => {
    function onUnauthorized() {
      setSession({ token: null, user: null, expiresAt: null })
    }
    window.addEventListener('auth:unauthorized', onUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized)
  }, [])

  useEffect(() => {
    if (!token) return undefined

    const expiry = getTokenExpiryMs(token, expiresAt)
    const delay = expiry ? Math.max(expiry - Date.now(), 0) : 0
    const timer = window.setTimeout(() => {
      clearSession()
    }, delay)

    function onVisible() {
      if (document.visibilityState === 'visible' && !isTokenValid(token, expiresAt)) {
        clearSession()
      }
    }

    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [token, expiresAt, clearSession])

  const login = useCallback(async (userName, password) => {
    const data = await authService.login(userName, password)
    setSession({
      token: data.token,
      user: data.user,
      expiresAt: data.expiresAt,
    })
    return data
  }, [])

  const logout = useCallback(() => {
    clearSession()
  }, [clearSession])

  const value = useMemo(
    () => ({
      user,
      token,
      expiresAt,
      isAuthenticated: Boolean(user && token && isTokenValid(token, expiresAt)),
      isBootstrapping: false,
      login,
      logout,
    }),
    [user, token, expiresAt, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}
