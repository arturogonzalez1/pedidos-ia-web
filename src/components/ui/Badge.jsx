import { cn } from '@/lib/cn'
import styles from './ui.module.css'

export function Badge({ children, tone = 'neutral', className }) {
  const toneClass = styles[`badge${tone.charAt(0).toUpperCase()}${tone.slice(1)}`]
  return (
    <span className={cn(styles.badge, toneClass || styles.badgeNeutral, className)}>
      {children}
    </span>
  )
}
