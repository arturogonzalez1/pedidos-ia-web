import { storage } from '@/lib/storage'
import { STORAGE_KEYS } from '@/config/app'
import { mockRequest } from '@/lib/mockBackend'

export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function api(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (auth) {
    const token = storage.get(STORAGE_KEYS.token)
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const response = await mockRequest(path, { method, headers, body })
  const payload = await response.json()

  if (response.status === 401) {
    storage.remove(STORAGE_KEYS.token)
    storage.remove(STORAGE_KEYS.user)
    window.dispatchEvent(new Event('auth:unauthorized'))
  }

  if (!response.ok) {
    throw new ApiError(payload.message || 'Error inesperado', response.status)
  }

  return payload
}
