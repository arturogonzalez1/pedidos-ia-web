import { StatCard } from '@/components/ui'
import styles from '../pages/DashboardPage.module.css'

export function DashboardStats({ orders }) {
  const active = orders.filter((order) => order.status !== 'entregado').length
  const received = orders.filter((order) => order.status === 'recibido').length
  const preparing = orders.filter((order) => order.status === 'preparando').length
  const sent = orders.filter((order) => order.status === 'enviado').length

  return (
    <section className={styles.stats}>
      <StatCard label="Activos" value={active} hint="Sin entregar" icon="inbox" />
      <StatCard label="Recibidos" value={received} hint="Por atender" icon="phone" />
      <StatCard label="En cocina" value={preparing} hint="Preparando ahora" icon="flame" />
      <StatCard label="En camino" value={sent} hint="Enviado" icon="truck" />
    </section>
  )
}
