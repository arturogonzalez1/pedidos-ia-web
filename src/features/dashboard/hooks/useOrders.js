import { useCallback, useEffect, useRef, useState } from 'react'
import { useToast } from '@/components/feedback/ToastContext'
import { mapPedido } from '@/features/dashboard/mappers/mapPedido'
import { usePedidosHub } from '@/features/dashboard/hooks/usePedidosHub'
import { ordersService } from '@/features/dashboard/services/ordersService'

const NEW_HIGHLIGHT_MS = 8000

export function useOrders() {
  const { notify } = useToast()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const highlightTimers = useRef(new Map())
  const knownIds = useRef(new Set())

  const clearHighlight = useCallback((id) => {
    const key = String(id)
    const previous = highlightTimers.current.get(key)
    if (previous) window.clearTimeout(previous)
    const timer = window.setTimeout(() => {
      setOrders((items) =>
        items.map((order) => (String(order.id) === key ? { ...order, isNew: false } : order)),
      )
      highlightTimers.current.delete(key)
    }, NEW_HIGHLIGHT_MS)
    highlightTimers.current.set(key, timer)
  }, [])

  useEffect(() => {
    return () => {
      for (const timer of highlightTimers.current.values()) window.clearTimeout(timer)
    }
  }, [])

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await ordersService.list()
      setOrders((current) => {
        const incomingIds = new Set(data.map((order) => String(order.id)))
        const extras = current.filter((order) => !incomingIds.has(String(order.id)))
        const incoming = data.map((order) => {
          const existing = current.find((item) => String(item.id) === String(order.id))
          return existing?.isNew ? { ...order, isNew: true } : order
        })
        const merged = [...extras, ...incoming]
        knownIds.current = new Set(merged.map((order) => String(order.id)))
        return merged
      })
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handlePedidoCreado = useCallback(
    (raw) => {
      const mapped = { ...mapPedido(raw), isNew: true }
      const key = String(mapped.id)
      if (knownIds.current.has(key)) return
      knownIds.current.add(key)

      setOrders((items) => {
        if (items.some((order) => String(order.id) === key)) return items
        return [mapped, ...items]
      })

      clearHighlight(mapped.id)
      const destino = mapped.address || 'sin dirección'
      notify(`Nuevo pedido #${mapped.id}: ${destino}`, 'info', 6000)
    },
    [clearHighlight, notify],
  )

  const hubState = usePedidosHub(handlePedidoCreado)

  const updateStatus = useCallback(async (id, status) => {
    setUpdatingId(id)
    setOrders((items) =>
      items.map((order) => (String(order.id) === String(id) ? { ...order, status } : order)),
    )
    setUpdatingId(null)
  }, [])

  return { orders, loading, error, updatingId, updateStatus, refresh, hubState }
}
