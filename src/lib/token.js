import { TOKEN_TTL_MS } from '@/config/app'

const EXPIRY_SKEW_MS = 5_000

function toBase64Url(value) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))))
    .replace(/=+$/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function fromBase64Url(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const padLength = (4 - (padded.length % 4)) % 4
  const binary = atob(padded + '='.repeat(padLength))
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return JSON.parse(new TextDecoder().decode(bytes))
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

export function decodeJwtPayload(token) {
  if (!token || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    return fromBase64Url(parts[1])
  } catch {
    return null
  }
}

function expiryFromJwt(payload) {
  if (!payload?.exp) return null
  const exp = Number(payload.exp)
  if (!Number.isFinite(exp)) return null
  return exp > 1e12 ? exp : exp * 1000
}

export function getTokenExpiryMs(token, expiresAt) {
  if (expiresAt) {
    const fromResponse = new Date(expiresAt).getTime()
    if (Number.isFinite(fromResponse)) return fromResponse
  }
  return expiryFromJwt(decodeJwtPayload(token))
}

export function isTokenValid(token, expiresAt) {
  if (!token || typeof token !== 'string') return false
  const expiry = getTokenExpiryMs(token, expiresAt)
  if (!expiry) return false
  return expiry - EXPIRY_SKEW_MS > Date.now()
}

export function mapAuthUser(dto) {
  if (!dto) return null
  const roles = Array.isArray(dto.roles) ? dto.roles.filter(Boolean) : []
  const name = dto.displayName || dto.userName || dto.email || ''
  return {
    id: dto.id,
    userName: dto.userName || '',
    email: dto.email || '',
    name,
    displayName: dto.displayName || name,
    role: roles[0] || '',
    roles,
  }
}

export function parseBearerToken(token, expiresAt) {
  if (!isTokenValid(token, expiresAt)) return null
  return decodeJwtPayload(token)
}

export function readBearerHeader(headers = {}) {
  const raw = headers.Authorization || headers.authorization || ''
  if (!raw.startsWith('Bearer ')) return null
  return raw.slice(7).trim()
}
