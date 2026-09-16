import { Icon } from '@/components/ui'
import { useTheme } from '@/theme/ThemeContext'
import { cn } from '@/lib/cn'
import styles from './layout.module.css'

export function ThemePanel() {
  const { theme, setTheme, selectPreset, presets } = useTheme()

  return (
    <div className={styles.themePanel} role="dialog" aria-label="Apariencia">
      <p className={styles.themeTitle}>Apariencia</p>
      <p className={styles.themeHint}>Colores básicos, fáciles de cambiar. Se guardan en este navegador.</p>

      <div className={styles.presets}>
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={cn(styles.swatch, theme.presetId === preset.id && styles.swatchActive)}
            style={{ background: preset.primary }}
            onClick={() => selectPreset(preset.id)}
            aria-label={preset.name}
            title={preset.name}
          />
        ))}
      </div>

      <div className={styles.row}>
        <label htmlFor="primary-color">Color primario</label>
        <input
          id="primary-color"
          className={styles.colorInput}
          type="color"
          value={theme.primary}
          onChange={(event) => setTheme({ primary: event.target.value, presetId: 'custom' })}
        />
      </div>

      <div className={styles.row}>
        <span>Modo</span>
        <div className={styles.modeToggle}>
          <button
            type="button"
            className={cn(styles.modeBtn, theme.mode === 'light' && styles.modeBtnActive)}
            onClick={() => setTheme({ mode: 'light' })}
          >
            <Icon name="sun" size={14} /> Claro
          </button>
          <button
            type="button"
            className={cn(styles.modeBtn, theme.mode === 'dark' && styles.modeBtnActive)}
            onClick={() => setTheme({ mode: 'dark' })}
          >
            <Icon name="moon" size={14} /> Oscuro
          </button>
        </div>
      </div>
    </div>
  )
}
