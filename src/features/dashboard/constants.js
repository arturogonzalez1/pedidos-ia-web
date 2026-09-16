export const ORDER_STATUSES = [
  { id: 'recibido', label: 'Recibido', hint: 'Pedido tomado', icon: 'inbox' },
  { id: 'preparando', label: 'Preparando', hint: 'En cocina', icon: 'flame' },
  { id: 'enviado', label: 'Enviado', hint: 'En camino / en mesa', icon: 'truck' },
  { id: 'entregado', label: 'Entregado', hint: 'Completado', icon: 'check' },
]

export const CHANNELS = [
  { id: 'llamada', label: 'Llamada', icon: 'phone' },
  { id: 'mesa', label: 'Mesa', icon: 'utensils' },
  { id: 'delivery', label: 'Delivery', icon: 'bike' },
  { id: 'para_llevar', label: 'Para llevar', icon: 'bag' },
]

export function getStatus(id) {
  return ORDER_STATUSES.find((item) => item.id === id)
}

export function getChannel(id) {
  return CHANNELS.find((item) => item.id === id)
}
