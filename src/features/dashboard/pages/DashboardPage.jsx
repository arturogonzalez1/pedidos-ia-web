import { useMemo, useState } from 'react'
import { Card, Spinner } from '@/components/ui'
import { useToast } from '@/components/feedback/ToastContext'
import { DashboardStats } from '@/features/dashboard/components/DashboardStats'
import { OrdersTable } from '@/features/dashboard/components/OrdersTable'
import { OrdersToolbar } from '@/features/dashboard/components/OrdersToolbar'
import { useOrders } from '@/features/dashboard/hooks/useOrders'
import { ORDER_STATUSES, getStatus } from '@/features/dashboard/constants'
import { useAuth } from '@/features/auth/context/AuthContext'
import styles from './DashboardPage.module.css'

function hubLabel(hubState) {
  if (hubState === 'connected') return 'En vivo'
  if (hubState === 'reconnecting') return 'Reconectando'
  return 'Sin conexión'
}

export function DashboardPage() {
  const { user } = useAuth()
  const { notify } = useToast()
  const { orders, sucursal, loading, error, updatingId, updateStatus, hubState } = useOrders()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')

  const counts = useMemo(() => {
    const next = { all: orders.length }
    for (const item of ORDER_STATUSES) {
      next[item.id] = orders.filter((order) => order.status === item.id).length
    }
    return next
  }, [orders])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return orders.filter((order) => {
      if (status !== 'all' && order.status !== status) return false
      if (!term) return true
      return (
        String(order.id).toLowerCase().includes(term) ||
        order.phone.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term) ||
        order.address.toLowerCase().includes(term) ||
        order.items.some((item) => item.name.toLowerCase().includes(term))
      )
    })
  }, [orders, query, status])

  async function handleStatusChange(order, nextStatus) {
    const label = getStatus(nextStatus)?.label
    try {
      await updateStatus(order.id, nextStatus)
      notify(`#${order.id} → ${label}`)
    } catch (err) {
      notify(err.message || 'No se pudo actualizar el estatus', 'error')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <div>
          <h2>Hola, {user?.name?.split(' ')[0]}</h2>
          <p>
            Pedidos de {sucursal?.nombre || 'tu sucursal'} y estatus de cocina en un solo lugar.
          </p>
        </div>
        <span className={styles.live} data-state={hubState}>
          <span className={styles.liveDot} />
          {hubLabel(hubState)}
        </span>
      </div>

      <DashboardStats orders={orders} />

      <Card className={styles.panel}>
        <OrdersToolbar
          query={query}
          onQuery={setQuery}
          status={status}
          onStatus={setStatus}
          counts={counts}
        />

        {error ? <p className={styles.error}>{error}</p> : null}

        {loading && !orders.length ? (
          <div className={styles.loaderRow}>
            <Spinner />
          </div>
        ) : (
          <OrdersTable
            orders={filtered}
            updatingId={updatingId}
            onStatusChange={handleStatusChange}
          />
        )}
      </Card>
    </div>
  )
}
