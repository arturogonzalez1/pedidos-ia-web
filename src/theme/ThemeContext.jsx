import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { STORAGE_KEYS } from '@/config/app'
import { storage } from '@/lib/storage'
import { applyTheme, DEFAULT_THEME, THEME_PRESETS } from '@/theme/presets'

const ThemeContext = createContext(null)

function loadTheme() {
  return { ...DEFAULT_THEME, ...storage.get(STORAGE_KEYS.theme) }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const initial = loadTheme()
    applyTheme(initial)
    return initial
  })

  const setTheme = useCallback((patch) => {
    setThemeState((current) => {
      const next = { ...current, ...patch }
      storage.set(STORAGE_KEYS.theme, next)
      applyTheme(next)
      return next
    })
  }, [])

  const selectPreset = useCallback(
    (presetId) => {
      const preset = THEME_PRESETS.find((item) => item.id === presetId)
      if (!preset) return
      setTheme({ presetId: preset.id, primary: preset.primary })
    },
    [setTheme],
  )

  const value = useMemo(
    () => ({ theme, setTheme, selectPreset, presets: THEME_PRESETS }),
    [theme, setTheme, selectPreset],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider')
  return context
}
