import { Badge, EmptyState, Icon, Table } from '@/components/ui'
import { OrderStatusSelect } from '@/features/dashboard/components/OrderStatusSelect'
import { formatTime, formatTimeAgo, summarizeItems } from '@/lib/format'
import { cn } from '@/lib/cn'
import styles from '../pages/DashboardPage.module.css'

export function OrdersTable({ orders, updatingId, onStatusChange }) {
  if (!orders.length) {
    return (
      <EmptyState
        icon={<Icon name="inbox" size={28} />}
        title="Sin pedidos en esta vista"
        description="Prueba otro estatus o término de búsqueda."
      />
    )
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Pedido</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Productos</th>
          <th>Tiempo</th>
          <th>Estatus</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className={cn(order.isNew && styles.rowNew)}>
            <td>
              <div className={styles.orderId}>#{order.id}</div>
              {order.isNew ? <div className={styles.newTag}>Nuevo</div> : null}
            </td>
            <td>
              <div className={styles.customer}>{order.phone || '—'}</div>
              <Badge>
                <Icon name="phone" size={12} />
                Llamada
              </Badge>
            </td>
            <td>
              <div className={styles.customer}>{order.address || 'Sin dirección'}</div>
            </td>
            <td className={styles.items}>{summarizeItems(order.items)}</td>
            <td>
              <div className={styles.time}>{formatTimeAgo(order.createdAt)}</div>
              <div className={styles.notes}>{formatTime(order.createdAt)}</div>
            </td>
            <td>
              <OrderStatusSelect
                value={order.status}
                disabled={updatingId === order.id}
                onChange={(status) => onStatusChange(order, status)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
