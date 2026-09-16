import { cn } from '@/lib/cn'
import styles from './ui.module.css'

export function Table({ children, className }) {
  return (
    <div className={styles.tableWrap}>
      <table className={cn(styles.table, className)}>{children}</table>
    </div>
  )
}
