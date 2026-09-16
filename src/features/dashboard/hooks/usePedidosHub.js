import { useEffect, useRef, useState } from 'react'
import { HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr'
import { APP_CONFIG } from '@/config/app'

const RETRY_MS = 4000

export function usePedidosHub(onPedidoCreado) {
  const [state, setState] = useState('disconnected')
  const handlerRef = useRef(onPedidoCreado)

  useEffect(() => {
    handlerRef.current = onPedidoCreado
  }, [onPedidoCreado])

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(APP_CONFIG.hubUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build()

    let stopped = false

    async function joinSucursal() {
      if (connection.state !== HubConnectionState.Connected) return
      await connection.invoke('JoinSucursal', APP_CONFIG.sucursalId)
    }

    connection.on('pedidoCreado', (pedido) => {
      handlerRef.current?.(pedido)
    })

    connection.onreconnecting(() => {
      if (!stopped) setState('reconnecting')
    })

    connection.onreconnected(() => {
      if (stopped) return
      setState('connected')
      joinSucursal().catch(() => undefined)
    })

    connection.onclose(() => {
      if (!stopped) setState('disconnected')
    })

    async function start() {
      while (!stopped) {
        try {
          await connection.start()
          if (stopped) {
            await connection.stop()
            return
          }
          setState('connected')
          await joinSucursal()
          return
        } catch {
          if (stopped) return
          setState('disconnected')
          await new Promise((resolve) => window.setTimeout(resolve, RETRY_MS))
        }
      }
    }

    start()

    return () => {
      stopped = true
      connection.off('pedidoCreado')
      connection.stop().catch(() => undefined)
    }
  }, [])

  return state
}
