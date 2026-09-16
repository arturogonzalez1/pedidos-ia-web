import styles from './ui.module.css'

export function EmptyState({ title, description, icon }) {
  return (
    <div className={styles.empty}>
      {icon}
      <p className={styles.emptyTitle}>{title}</p>
      {description ? <p>{description}</p> : null}
    </div>
  )
}
