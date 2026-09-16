import { useEffect } from 'react'

export function useClickOutside(ref, onOutside, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined

    function handle(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutside(event)
      }
    }

    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [ref, onOutside, enabled])
}
