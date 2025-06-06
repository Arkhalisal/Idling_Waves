import * as R from 'ramda'
import { useCallback, useState } from 'react'

import PopupSequence from '@/components/mainComponents/share/PopupSequence'
import { PopupOptions, PopupSequenceType } from '@/types/popupSequence'
import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, usePopupContext] = createStrictContext<PopupContextProps>('PopupContext')

export { usePopupContext }

const PopupProvider = ({ children }: PopupProviderProps) => {
  const [activePopups, setActivePopups] = useState<PopupSequenceType[] | null>(null)
  const [popupOptions, setPopupOptions] = useState<PopupOptions>({})

  const showPopups = useCallback((popups: PopupSequenceType[], options: PopupOptions = {}) => {
    setActivePopups(popups)
    setPopupOptions(options)
  }, [])

  const hidePopups = useCallback(() => {
    setActivePopups(null)
    setPopupOptions({})
  }, [])

  const handleComplete = useCallback(() => {
    if (popupOptions.onComplete) {
      popupOptions.onComplete()
    }
    hidePopups()
  }, [popupOptions, hidePopups])

  return (
    <ContextProvider value={{ showPopups }}>
      {children}
      {R.isNotNil(activePopups) && (
        <PopupSequence
          popups={activePopups}
          autoAdvance={popupOptions.autoAdvance}
          onAllComplete={handleComplete}
        />
      )}
    </ContextProvider>
  )
}

type PopupContextProps = {
  showPopups: (popups: PopupSequenceType[], options?: PopupOptions) => void
}

type PopupProviderProps = {
  children: React.ReactNode
}

export default PopupProvider
