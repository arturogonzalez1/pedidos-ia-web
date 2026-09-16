import { APP_CONFIG } from '@/config/app'
import { ApiError } from '@/lib/api'

export async function backendFetch(path, { method = 'GET', body } = {}) {
  const url = `${APP_CONFIG.apiBaseUrl}${path}`
  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  const response = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new ApiError(payload.message || 'Error inesperado', response.status)
  }

  return payload
}
