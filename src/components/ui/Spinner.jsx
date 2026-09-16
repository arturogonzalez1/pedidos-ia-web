import styles from './ui.module.css'

export function Spinner({ size = 22 }) {
  return <span className={styles.spinner} style={{ width: size, height: size }} />
}

export function PageLoader({ label = 'Cargando…' }) {
  return (
    <div className={styles.pageLoader}>
      <div className={styles.pageLoaderInner}>
        <Spinner />
        <span>{label}</span>
      </div>
    </div>
  )
}
