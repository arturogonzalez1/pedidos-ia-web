import { cn } from '@/lib/cn'
import { Spinner } from '@/components/ui/Spinner'
import styles from './ui.module.css'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  iconOnly = false,
  className,
  disabled,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        styles.button,
        styles[variant],
        size !== 'md' && styles[size],
        block && styles.block,
        iconOnly && styles.iconOnly,
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner size={16} /> : children}
    </button>
  )
}
