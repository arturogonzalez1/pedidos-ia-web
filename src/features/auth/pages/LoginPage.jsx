import { APP_CONFIG, DEMO_CREDENTIALS } from '@/config/app'
import { Icon } from '@/components/ui'
import { LoginForm } from '@/features/auth/components/LoginForm'
import styles from './LoginPage.module.css'

const HIGHLIGHTS = [
  'Estados de cocina en un clic',
  'Pedidos de mesa, delivery y para llevar',
  'Colores de marca personalizables',
]

export function LoginPage() {
  return (
    <div className={styles.page}>
      <section className={styles.brand}>
        <div className={styles.brandInner}>
          <div className={styles.logo}>
            <Icon name="logo" size={26} />
            <span>{APP_CONFIG.name}</span>
          </div>
          <h1>El servicio, bajo control.</h1>
          <p>{APP_CONFIG.tagline}. Recibido, preparando, enviado y entregado — sin fricción.</p>
          <ul>
            {HIGHLIGHTS.map((item) => (
              <li key={item}>
                <Icon name="check" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.card}>
          <div className={styles.mobileBrand}>
            <Icon name="logo" size={22} />
            {APP_CONFIG.name}
          </div>
          <p className={styles.kicker}>Acceso al panel</p>
          <h2>Iniciar sesión</h2>
          <p className={styles.lead}>Usa tu cuenta de personal. No hay registro público.</p>
          <LoginForm />
          <p className={styles.demo}>
            Demo: <strong>{DEMO_CREDENTIALS.userName}</strong> / {DEMO_CREDENTIALS.password}
          </p>
        </div>
      </section>
    </div>
  )
}
