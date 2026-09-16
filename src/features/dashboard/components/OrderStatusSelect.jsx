import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@/components/ui'
import { ORDER_STATUSES, getStatus } from '@/features/dashboard/constants'
import { cn } from '@/lib/cn'
import styles from './OrderStatusSelect.module.css'

export function OrderStatusSelect({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const current = getStatus(value)

  function openMenu() {
    const rect = triggerRef.current.getBoundingClientRect()
    const width = 220
    const estimatedHeight = 220
    const left = Math.min(rect.left, window.innerWidth - width - 12)
    const top =
      rect.bottom + 6 + estimatedHeight > window.innerHeight
        ? Math.max(12, rect.top - estimatedHeight - 6)
        : rect.bottom + 6
    setCoords({ top, left })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return undefined

    function handlePointer(event) {
      if (triggerRef.current?.contains(event.target)) return
      if (menuRef.current?.contains(event.target)) return
      setOpen(false)
    }

    function handleDismiss() {
      setOpen(false)
    }

    document.addEventListener('mousedown', handlePointer)
    window.addEventListener('resize', handleDismiss)
    window.addEventListener('scroll', handleDismiss, true)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      window.removeEventListener('resize', handleDismiss)
      window.removeEventListener('scroll', handleDismiss, true)
    }
  }, [open])

  async function select(id) {
    setOpen(false)
    if (id === value) return
    await onChange(id)
  }

  return (
    <div className={styles.wrap}>
      <button
        ref={triggerRef}
        type="button"
        className={cn(styles.trigger, styles[value])}
        onClick={() => (open ? setOpen(false) : openMenu())}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Icon name={current?.icon} size={14} />
        {current?.label}
        <Icon name="chevronDown" size={14} />
      </button>

      {open && coords
        ? createPortal(
            <div
              ref={menuRef}
              className={styles.menu}
              role="listbox"
              style={{ top: coords.top, left: coords.left }}
            >
              {ORDER_STATUSES.map((status) => (
                <button
                  key={status.id}
                  type="button"
                  role="option"
                  aria-selected={status.id === value}
                  className={cn(styles.option, status.id === value && styles.optionActive)}
                  onClick={() => select(status.id)}
                >
                  <span
                    className={cn(
                      styles.dot,
                      styles[`dot${status.id.charAt(0).toUpperCase()}${status.id.slice(1)}`],
                    )}
                  />
                  <span>
                    <span className={styles.optionLabel}>{status.label}</span>
                    <span className={styles.optionHint}>{status.hint}</span>
                  </span>
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
