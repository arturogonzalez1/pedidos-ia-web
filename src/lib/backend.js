import { APP_CONFIG, STORAGE_KEYS } from '@/config/app'
import { storage } from '@/lib/storage'
import { isTokenValid } from '@/lib/token'

export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function clearAuthAndNotify() {
  storage.remove(STORAGE_KEYS.token)
  storage.remove(STORAGE_KEYS.user)
  storage.remove(STORAGE_KEYS.expiresAt)
  window.dispatchEvent(new Event('auth:unauthorized'))
}

function readErrorMessage(payload, fallback) {
  if (!payload) return fallback
  if (typeof payload === 'string' && payload.trim()) return payload
  return payload.message || payload.title || fallback
}

export function getAccessToken() {
  const token = storage.get(STORAGE_KEYS.token)
  const expiresAt = storage.get(STORAGE_KEYS.expiresAt)
  if (!isTokenValid(token, expiresAt)) return null
  return token
}

export async function backendFetch(path, { method = 'GET', body, auth = true } = {}) {
  const url = `${APP_CONFIG.apiBaseUrl}${path}`
  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  if (auth) {
    const token = getAccessToken()
    if (!token) {
      clearAuthAndNotify()
      throw new ApiError('Sesión expirada. Inicia sesión de nuevo.', 401)
    }
    headers.Authorization = `Bearer ${token}`
  }

  let response
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('No se pudo conectar con el servidor', 0)
  }

  const payload = await response.json().catch(() => ({}))

  if (response.status === 401 && auth) {
    clearAuthAndNotify()
    throw new ApiError(readErrorMessage(payload, 'Sesión no válida o expirada'), 401)
  }

  if (!response.ok) {
    throw new ApiError(readErrorMessage(payload, 'Error inesperado'), response.status)
  }

  return payload
}
