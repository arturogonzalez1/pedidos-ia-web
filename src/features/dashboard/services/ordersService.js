import { APP_CONFIG } from '@/config/app'
import { backendFetch } from '@/lib/backend'
import { mapPedidosResponse } from '@/features/dashboard/mappers/mapPedido'

export const ordersService = {
  async list(sucursalId = APP_CONFIG.sucursalId) {
    const data = await backendFetch(`/api/sucursales/${sucursalId}/pedidos`)
    return mapPedidosResponse(data)
  },
}
