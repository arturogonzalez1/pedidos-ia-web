import { useRef, useState } from 'react'
import { Button, Icon } from '@/components/ui'
import { ThemePanel } from '@/components/layout/ThemePanel'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useAuth } from '@/features/auth/context/AuthContext'
import styles from './layout.module.css'

export function Header({ title, onMenu }) {
  const { logout } = useAuth()
  const [themeOpen, setThemeOpen] = useState(false)
  const panelRef = useRef(null)

  useClickOutside(panelRef, () => setThemeOpen(false), themeOpen)

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Button
          className={styles.menuBtn}
          variant="ghost"
          iconOnly
          onClick={onMenu}
          aria-label="Abrir menú"
        >
          <Icon name="menu" />
        </Button>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.headerActions} ref={panelRef}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setThemeOpen((value) => !value)}
          aria-expanded={themeOpen}
        >
          <Icon name="palette" size={16} />
          Colores
        </Button>
        <Button variant="ghost" size="sm" onClick={logout}>
          <Icon name="logout" size={16} />
          Salir
        </Button>
        {themeOpen ? <ThemePanel /> : null}
      </div>
    </header>
  )
}
