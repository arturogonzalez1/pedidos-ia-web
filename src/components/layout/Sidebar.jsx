import { NavLink } from 'react-router-dom'
import { Button, Icon } from '@/components/ui'
import { APP_CONFIG } from '@/config/app'
import { NAV_ITEMS } from '@/components/layout/nav'
import { useAuth } from '@/features/auth/context/AuthContext'
import { cn } from '@/lib/cn'
import styles from './layout.module.css'

function initials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()

  return (
    <aside className={cn(styles.sidebar, open && styles.sidebarOpen)}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>
          <Icon name="logo" size={18} />
        </span>
        {APP_CONFIG.name}
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) => cn(styles.navLink, isActive && styles.navLinkActive)}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.user}>
          <div className={styles.avatar}>{initials(user?.name)}</div>
          <div>
            <div className={styles.userName}>{user?.name}</div>
            <div className={styles.userRole}>{user?.role}</div>
          </div>
        </div>
        <Button variant="navGhost" size="sm" onClick={logout}>
          <Icon name="logout" size={16} />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  )
}
