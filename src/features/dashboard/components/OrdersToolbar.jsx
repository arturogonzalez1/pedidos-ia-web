import { Icon, Input } from '@/components/ui'
import { ORDER_STATUSES } from '@/features/dashboard/constants'
import { cn } from '@/lib/cn'
import styles from '../pages/DashboardPage.module.css'

export function OrdersToolbar({ query, onQuery, status, onStatus, counts }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.filters}>
        <button
          type="button"
          className={cn(styles.chip, status === 'all' && styles.chipActive)}
          onClick={() => onStatus('all')}
        >
          Todos <span>{counts.all}</span>
        </button>
        {ORDER_STATUSES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(styles.chip, status === item.id && styles.chipActive)}
            onClick={() => onStatus(item.id)}
          >
            {item.label} <span>{counts[item.id] || 0}</span>
          </button>
        ))}
      </div>

      <div className={styles.toolbarRight}>
        <div className={styles.search}>
          <Input
            id="order-search"
            placeholder="Buscar folio, teléfono o dirección"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            icon={<Icon name="search" size={16} />}
          />
        </div>
      </div>
    </div>
  )
}
