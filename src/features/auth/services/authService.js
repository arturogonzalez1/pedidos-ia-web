import { api } from '@/lib/api'
import { storage } from '@/lib/storage'
import { STORAGE_KEYS } from '@/config/app'

export const authService = {
  async login(email, password) {
    const data = await api('/auth/login', {
      method: 'POST',
      auth: false,
      body: { email, password },
    })
    storage.set(STORAGE_KEYS.token, data.token)
    storage.set(STORAGE_KEYS.user, data.user)
    return data
  },

  async me() {
    return api('/auth/me')
  },

  async logout() {
    try {
      await api('/auth/logout', { method: 'POST' })
    } finally {
      storage.remove(STORAGE_KEYS.token)
      storage.remove(STORAGE_KEYS.user)
    }
  },

  getStoredSession() {
    return {
      token: storage.get(STORAGE_KEYS.token),
      user: storage.get(STORAGE_KEYS.user),
    }
  },
}
