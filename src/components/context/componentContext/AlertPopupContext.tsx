import { useCallback, useState } from 'react'

import AlertPopup from '@/components/mainComponents/share/AlertPopup'
import { AlertInputType, AlertItemType } from '@/types/alertPopup'
import { createStrictContext } from '@/util/context/createStrictContext'
import { generateUUID } from '@/util/function/uuid'

const [ContextProvider, useAlertPopupContext] =
  createStrictContext<AlertPopupContextProps>('AlertPopup')

export { useAlertPopupContext }

const AlertPopupProvider = ({ children }: AlertPopupProviderProps) => {
  const [alerts, setAlerts] = useState<AlertItemType[]>([])

  const createAlert = useCallback(({ content, variant, timeout }: AlertInputType) => {
    const id = generateUUID()
    const newAlert: AlertItemType = {
      id,
      content,
      variant,
      timeout
    }

    setAlerts(prevAlerts => [...prevAlerts, newAlert])
    return id
  }, [])

  const closeAlert = useCallback((id: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id))
  }, [])

  return (
    <ContextProvider value={{ createAlert }}>
      {children}
      <AlertPopup alerts={alerts} closeAlert={closeAlert} />
    </ContextProvider>
  )
}

type AlertPopupContextProps = {
  createAlert: (alert: AlertInputType) => string
}

type AlertPopupProviderProps = {
  children: React.ReactNode
}

export default AlertPopupProvider
