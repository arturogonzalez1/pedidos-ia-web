import { STORAGE_KEYS } from '@/config/app'
import { ApiError, backendFetch, getAccessToken } from '@/lib/backend'
import { storage } from '@/lib/storage'
import { isTokenValid, mapAuthUser } from '@/lib/token'

function persistSession({ token, user, expiresAt }) {
  storage.set(STORAGE_KEYS.token, token)
  storage.set(STORAGE_KEYS.user, user)
  storage.set(STORAGE_KEYS.expiresAt, expiresAt)
}

function clearStoredSession() {
  storage.remove(STORAGE_KEYS.token)
  storage.remove(STORAGE_KEYS.user)
  storage.remove(STORAGE_KEYS.expiresAt)
}

export const authService = {
  async login(userName, password) {
    const data = await backendFetch('/api/auth/login', {
      method: 'POST',
      auth: false,
      body: { userName, password },
    })

    const session = {
      token: data.accessToken,
      tokenType: data.tokenType || 'Bearer',
      expiresAt: data.expiresAt,
      user: mapAuthUser(data.user),
    }

    if (!session.token || !session.user) {
      throw new ApiError('La respuesta de autenticación es inválida', 500)
    }

    persistSession(session)
    return session
  },

  logout() {
    clearStoredSession()
  },

  clearSession() {
    clearStoredSession()
  },

  getAccessToken,

  getStoredSession() {
    const token = storage.get(STORAGE_KEYS.token)
    const user = storage.get(STORAGE_KEYS.user)
    const expiresAt = storage.get(STORAGE_KEYS.expiresAt)
    if (!isTokenValid(token, expiresAt) || !user) {
      return { token: null, user: null, expiresAt: null }
    }
    return { token, user, expiresAt }
  },
}
