import { cn } from '@/lib/cn'
import styles from './ui.module.css'

export function Card({ children, className, ...props }) {
  return (
    <div className={cn(styles.card, className)} {...props}>
      {children}
    </div>
  )
}
