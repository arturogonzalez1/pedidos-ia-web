export const APP_CONFIG = {
  name: 'Pedidos',
  tagline: 'Control de cocina en tiempo real',
  locale: 'es-MX',
  currency: 'MXN',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5174',
  hubUrl: import.meta.env.VITE_HUB_URL || 'http://localhost:5174/hubs/pedidos',
  sucursalId: Number(import.meta.env.VITE_SUCURSAL_ID || 1),
}

export const STORAGE_KEYS = {
  token: 'auth.token',
  user: 'auth.user',
  expiresAt: 'auth.expiresAt',
  orders: 'orders',
  theme: 'theme',
}

export const TOKEN_TTL_MS = 8 * 60 * 60 * 1000

export const DEMO_CREDENTIALS = {
  userName: 'admin',
  password: 'Admin123!',
}
