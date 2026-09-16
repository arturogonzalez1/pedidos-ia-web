import { APP_CONFIG } from '@/config/app'

export function formatMoney(value) {
  return new Intl.NumberFormat(APP_CONFIG.locale, {
    style: 'currency',
    currency: APP_CONFIG.currency,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatTime(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  const sameDay = date.toDateString() === new Date().toDateString()
  return new Intl.DateTimeFormat(APP_CONFIG.locale, {
    ...(sameDay ? {} : { day: '2-digit', month: 'short' }),
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatTimeAgo(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  const diff = Date.now() - date.getTime()
  const mins = Math.max(0, Math.floor(diff / 60000))
  if (mins < 1) return 'Ahora'
  if (mins < 60) return `Hace ${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours} h`
  const days = Math.floor(hours / 24)
  return days === 1 ? 'Ayer' : `Hace ${days} d`
}

export function summarizeItems(items, max = 2) {
  const names = (items || []).map((item) =>
    item.qty > 1 ? `${item.name} ×${item.qty}` : item.name,
  )
  if (names.length <= max) return names.join(', ')
  return `${names.slice(0, max).join(', ')} +${names.length - max}`
}
