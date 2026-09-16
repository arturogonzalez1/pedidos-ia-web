import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import styles from './ui.module.css'

export function StatCard({ label, value, hint, icon }) {
  return (
    <Card className={styles.statCard}>
      <div>
        <p className={styles.statLabel}>{label}</p>
        <p className={styles.statValue}>{value}</p>
        {hint ? <p className={styles.statHint}>{hint}</p> : null}
      </div>
      <div className={styles.statIcon}>
        <Icon name={icon} size={18} />
      </div>
    </Card>
  )
}
