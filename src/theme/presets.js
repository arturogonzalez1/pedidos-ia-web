export const THEME_PRESETS = [
  { id: 'terracotta', name: 'Terracota', primary: '#c45c26' },
  { id: 'oliva', name: 'Oliva', primary: '#4d7c0f' },
  { id: 'marino', name: 'Marino', primary: '#1d4ed8' },
  { id: 'vino', name: 'Vino', primary: '#9f1239' },
  { id: 'carbon', name: 'Carbón', primary: '#44403c' },
]

export const DEFAULT_THEME = {
  presetId: 'terracotta',
  primary: '#c45c26',
  mode: 'light',
}

export function applyTheme({ primary, mode }) {
  const root = document.documentElement
  root.style.setProperty('--color-primary', primary)
  root.dataset.mode = mode
}
