import { STORAGE_KEYS } from '@/config/app'
import { MOCK_USERS, toPublicUser } from '@/features/auth/data/users'
import { ORDER_STATUSES } from '@/features/dashboard/constants'
import { SEED_ORDERS } from '@/features/dashboard/data/seedOrders'
import { storage } from '@/lib/storage'
import { createBearerToken, parseBearerToken, readBearerHeader } from '@/lib/token'

const DELAY_MS = 380
const VALID_STATUS = new Set(ORDER_STATUSES.map((item) => item.id))

function json(status, data) {
  return {
    status,
    ok: status >= 200 && status < 300,
    async json() {
      return data
    },
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function requireUser(headers) {
  const token = readBearerHeader(headers)
  const payload = parseBearerToken(token)
  if (!payload) return null
  return MOCK_USERS.find((user) => user.id === payload.sub) || null
}

function loadOrders() {
  const saved = storage.get(STORAGE_KEYS.orders)
  if (Array.isArray(saved) && saved.length) {
    const newest = Math.max(...saved.map((order) => new Date(order.createdAt).getTime()))
    if (Date.now() - newest < 24 * 60 * 60 * 1000) return saved
  }
  const seeded = SEED_ORDERS.map((order) => ({ ...order }))
  storage.set(STORAGE_KEYS.orders, seeded)
  return seeded
}

function saveOrders(orders) {
  storage.set(STORAGE_KEYS.orders, orders)
}

function matchRoute(path, pattern) {
  const pathParts = path.replace(/^\//, '').split('/')
  const patternParts = pattern.replace(/^\//, '').split('/')
  if (pathParts.length !== patternParts.length) return null
  const params = {}
  for (let i = 0; i < patternParts.length; i += 1) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i])
    } else if (patternParts[i] !== pathParts[i]) {
      return null
    }
  }
  return params
}

function handleLogin(body) {
  const email = String(body?.email || '').trim().toLowerCase()
  const password = String(body?.password || '')
  const user = MOCK_USERS.find((item) => item.email === email)

  if (!user || user.password !== password) {
    return json(401, { message: 'Correo o contraseña incorrectos' })
  }

  const publicUser = toPublicUser(user)
  return json(200, {
    token: createBearerToken(publicUser),
    user: publicUser,
  })
}

function handleMe(headers) {
  const user = requireUser(headers)
  if (!user) return json(401, { message: 'Sesión no válida o expirada' })
  return json(200, { user: toPublicUser(user) })
}

function handleLogout() {
  return json(200, { ok: true })
}

function handleListOrders(headers) {
  if (!requireUser(headers)) return json(401, { message: 'No autorizado' })
  const orders = loadOrders().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  return json(200, { orders })
}

function handleUpdateOrder(headers, params, body) {
  if (!requireUser(headers)) return json(401, { message: 'No autorizado' })
  const status = body?.status
  if (!VALID_STATUS.has(status)) {
    return json(400, { message: 'Estatus no válido' })
  }

  const orders = loadOrders()
  const index = orders.findIndex((order) => order.id === params.id)
  if (index === -1) return json(404, { message: 'Pedido no encontrado' })

  const updated = { ...orders[index], status, updatedAt: new Date().toISOString() }
  orders[index] = updated
  saveOrders(orders)
  return json(200, { order: updated })
}

const ROUTES = [
  { method: 'POST', pattern: '/auth/login', auth: false, handler: ({ body }) => handleLogin(body) },
  { method: 'GET', pattern: '/auth/me', handler: ({ headers }) => handleMe(headers) },
  { method: 'POST', pattern: '/auth/logout', handler: () => handleLogout() },
  { method: 'GET', pattern: '/orders', handler: ({ headers }) => handleListOrders(headers) },
  {
    method: 'PATCH',
    pattern: '/orders/:id',
    handler: ({ headers, params, body }) => handleUpdateOrder(headers, params, body),
  },
]

export async function mockRequest(path, { method = 'GET', headers = {}, body } = {}) {
  await wait(DELAY_MS)

  const normalizedPath = path.replace(/^\/api/, '')
  const verb = method.toUpperCase()

  for (const route of ROUTES) {
    if (route.method !== verb) continue
    const params = matchRoute(normalizedPath, route.pattern)
    if (!params) continue
    return route.handler({ headers, params, body })
  }

  return json(404, { message: 'Ruta no encontrada' })
}
