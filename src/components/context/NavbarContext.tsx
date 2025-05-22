'use client'

import * as R from 'ramda'
import { ReactNode, useCallback, useState } from 'react'

import NavigationMenu from '@/constants/menu'
import { DefaultNavbarId } from '@/constants/navbar'
import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useNavbarContext] =
  createStrictContext<NavbarContextType>('Navbar')

export { useNavbarContext }

const NavbarProvider = ({ children }: NavbarProviderProps) => {
  const [CurrentTab, setCurrentTab] = useState(DefaultNavbarId)

  const [CurrentSecondNavbar, setCurrentSecondNavbar] =
    useState(DefaultNavbarId)

  const handleNavbarCycle = useCallback(
    (tab: number) => {
      if (tab === CurrentTab) {
        const currentMenuValues = NavigationMenu.find(menu =>
          menu.allValues.includes(CurrentTab)
        )?.allValues

        if (R.isNil(currentMenuValues)) {
          return
        }

        const currentIndex = currentMenuValues?.indexOf(CurrentSecondNavbar)

        if (currentMenuValues?.length - 1 === currentIndex) {
          setCurrentSecondNavbar(currentMenuValues[0])
        } else {
          setCurrentSecondNavbar(currentMenuValues[currentIndex + 1])
        }
      }
    },
    [CurrentSecondNavbar, CurrentTab]
  )

  const handleNavbarChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setCurrentTab(newValue)
      setCurrentSecondNavbar(newValue)
    },
    []
  )

  const handleSecondNavbarChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      const currentMenu = NavigationMenu.find(menu =>
        menu.allValues.includes(CurrentTab)
      )

      const selectMenu = NavigationMenu.find(menu =>
        menu.allValues.includes(newValue)
      )

      if (currentMenu && selectMenu) {
        if (currentMenu.value !== selectMenu.value) {
          setCurrentTab(selectMenu.value)
        }
      }

      setCurrentSecondNavbar(newValue)
    },
    [CurrentTab]
  )

  return (
    <ContextProvider
      value={{
        CurrentTab,
        CurrentSecondNavbar,
        handleNavbarCycle,
        handleNavbarChange,
        handleSecondNavbarChange
      }}
    >
      {children}
    </ContextProvider>
  )
}

type NavbarProviderProps = {
  children: ReactNode
}

type NavbarContextType = {
  CurrentTab: number
  CurrentSecondNavbar: number
  handleNavbarCycle: (tab: number) => void
  handleNavbarChange: (event: React.SyntheticEvent, newValue: number) => void
  handleSecondNavbarChange: (
    event: React.SyntheticEvent,
    newValue: number
  ) => void
}

export default NavbarProvider
