import { TOKEN_TTL_MS } from '@/config/app'

function toBase64Url(value) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))))
    .replace(/=+$/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function fromBase64Url(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const json = decodeURIComponent(escape(atob(padded)))
  return JSON.parse(json)
}

export function createBearerToken(user) {
  const header = toBase64Url({ alg: 'HS256', typ: 'JWT' })
  const payload = toBase64Url({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + TOKEN_TTL_MS,
  })
  const signature = toBase64Url({ mock: true, v: 1 })
  return `${header}.${payload}.${signature}`
}

export function parseBearerToken(token) {
  if (!token || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const payload = fromBase64Url(parts[1])
    if (!payload?.sub || !payload.exp) return null
    if (payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

export function readBearerHeader(headers = {}) {
  const raw = headers.Authorization || headers.authorization || ''
  if (!raw.startsWith('Bearer ')) return null
  return raw.slice(7).trim()
}
