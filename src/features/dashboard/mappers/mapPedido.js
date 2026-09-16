import { ORDER_STATUSES } from '@/features/dashboard/constants'

const STATUS_IDS = new Set(ORDER_STATUSES.map((item) => item.id))

function normalizeStatus(estatus) {
  const key = String(estatus || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
  return STATUS_IDS.has(key) ? key : 'recibido'
}

function mapItems(raw) {
  const productos = raw.productos || raw.items || []
  return productos.map((item) => ({
    name: item.nombre ?? item.name ?? 'Producto',
    qty: Number(item.cantidad ?? item.qty ?? 1),
    price: Number(item.price ?? 0),
  }))
}

export function mapPedido(raw, sucursal) {
  const phone = raw.telefono || raw.phone || ''
  return {
    id: raw.id,
    sucursalId: raw.sucursalId ?? sucursal?.id ?? null,
    sucursalCodigo: raw.sucursalCodigo ?? sucursal?.codigo ?? '',
    sucursalNombre: raw.sucursalNombre ?? sucursal?.nombre ?? '',
    callSid: raw.callSid || '',
    customer: phone || 'Cliente',
    phone,
    address: raw.direccion || raw.address || '',
    channel: 'llamada',
    transcription: raw.transcripcion || '',
    notes: '',
    items: mapItems(raw),
    total: raw.total ?? null,
    createdAt: raw.createdAt,
    status: normalizeStatus(raw.estatus ?? raw.status),
    isNew: false,
  }
}

export function mapPedidosResponse(data) {
  const sucursal = data?.sucursal
  const pedidos = Array.isArray(data) ? data : data?.pedidos || []
  return pedidos
    .map((pedido) => mapPedido(pedido, sucursal))
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
}
