import { cn } from '@/lib/cn'
import styles from './ui.module.css'

export function Input({
  id,
  label,
  error,
  icon,
  suffix,
  className,
  ...props
}) {
  return (
    <label className={styles.field} htmlFor={id}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={styles.inputWrap}>
        {icon ? <span className={styles.inputIcon}>{icon}</span> : null}
        <input
          id={id}
          className={cn(
            styles.input,
            icon && styles.inputWithIcon,
            error && styles.inputError,
            className,
          )}
          {...props}
        />
        {suffix ? <span className={styles.inputSuffix}>{suffix}</span> : null}
      </span>
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  )
}
