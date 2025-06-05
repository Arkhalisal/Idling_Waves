'use client'

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import InitialNavigationMenu from '@/constants/menu'
import { DefaultNavbarId, MapNavbarId, NavbarId } from '@/constants/navbar'
import { TethysUpgradeId } from '@/types/blackShore/tethysUpgrade'
import { NavigationMenuType } from '@/types/navbar'
import { createStrictContext } from '@/util/context/createStrictContext'

import { useTethysUpgradeContext } from './TethysUpgradeContext'

const [ContextProvider, useNavbarContext] = createStrictContext<NavbarContextType>('Navbar')

export { useNavbarContext }

const NavbarProvider = ({ children }: NavbarProviderProps) => {
  const { tethysUpgrade } = useTethysUpgradeContext()

  const [currentTab, setCurrentTab] = useState(DefaultNavbarId)

  const [currentSecondNavbar, setCurrentSecondNavbar] = useState(DefaultNavbarId)

  const [navigationMenu, setNavigationMenu] = useState(InitialNavigationMenu)

  // Main Navbar unlocked status

  const adventureUnlocked = useMemo(() => {
    return (
      tethysUpgrade.find(upgrade => upgrade.id === TethysUpgradeId.AdventureUnlocked)?.unlocked ||
      false
    )
  }, [tethysUpgrade])

  useEffect(() => {
    if (!adventureUnlocked) {
      return
    }

    setNavigationMenu(prev => {
      return prev.map(menu => {
        return menu.value === NavbarId.Adventure ? { ...menu, unlocked: true } : menu
      })
    })
  }, [adventureUnlocked])

  // handle main navbar and second navbar functions

  const handleNavbarCycle = useCallback(
    (tab: number) => {
      if (tab === currentTab) {
        const mainNavbar = navigationMenu.find(menu => menu.value === currentTab)

        const subNavbarValues =
          mainNavbar?.submenu.filter(item => item.unlocked).map(menu => menu.value) || []

        if (subNavbarValues.length === 0 || !mainNavbar) {
          return
        }

        const unlockedValues = [mainNavbar?.value, ...subNavbarValues]

        const currentIndex = unlockedValues?.indexOf(currentSecondNavbar)

        if (unlockedValues?.length - 1 === currentIndex) {
          setCurrentSecondNavbar(unlockedValues[0])
        } else {
          setCurrentSecondNavbar(unlockedValues[currentIndex + 1])
        }
      }
    },
    [currentTab, navigationMenu, currentSecondNavbar]
  )

  const handleNavbarChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
    setCurrentSecondNavbar(newValue)
  }, [])

  const handleSecondNavbarChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      const currentMenu = navigationMenu.find(menu => menu.allValues.includes(currentTab))

      const selectMenu = navigationMenu.find(menu => menu.allValues.includes(newValue))

      if (currentMenu && selectMenu) {
        if (currentMenu.value !== selectMenu.value) {
          setCurrentTab(selectMenu.value)
        }
      }

      setCurrentSecondNavbar(newValue)
    },
    [currentTab, navigationMenu]
  )

  // handle map navbar

  const [currentMapNavbar, setCurrentMapNavbar] = useState(MapNavbarId.HuangLong)

  return (
    <ContextProvider
      value={{
        navigationMenu,
        currentTab,
        currentSecondNavbar,
        currentMapNavbar,
        setNavigationMenu,
        handleNavbarCycle,
        handleNavbarChange,
        handleSecondNavbarChange,
        setCurrentMapNavbar
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
  navigationMenu: NavigationMenuType[]
  currentTab: number
  currentSecondNavbar: number
  currentMapNavbar: number
  setNavigationMenu: React.Dispatch<React.SetStateAction<NavigationMenuType[]>>
  handleNavbarCycle: (tab: number) => void
  handleNavbarChange: (event: React.SyntheticEvent, newValue: number) => void
  handleSecondNavbarChange: (event: React.SyntheticEvent, newValue: number) => void
  setCurrentMapNavbar: React.Dispatch<React.SetStateAction<number>>
}

export default NavbarProvider
