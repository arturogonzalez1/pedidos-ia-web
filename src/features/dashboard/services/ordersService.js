import { backendFetch } from '@/lib/backend'
import { mapPedidosResponse } from '@/features/dashboard/mappers/mapPedido'

export const ordersService = {
  async list() {
    const data = await backendFetch('/api/pedidos')
    return {
      sucursal: data?.sucursal || null,
      orders: mapPedidosResponse(data),
    }
  },
}
