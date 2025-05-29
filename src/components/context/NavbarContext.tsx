'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'

import InitialNavigationMenu from '@/constants/menu'
import { DefaultNavbarId, NavbarId } from '@/constants/navbar'
import { NavigationMenuType } from '@/types/navbar'
import { createStrictContext } from '@/util/context/createStrictContext'

import { useEnergyContext } from './EnergyContext'

const [ContextProvider, useNavbarContext] = createStrictContext<NavbarContextType>('Navbar')

export { useNavbarContext }

const NavbarProvider = ({ children }: NavbarProviderProps) => {
  const [CurrentTab, setCurrentTab] = useState(DefaultNavbarId)

  const [CurrentSecondNavbar, setCurrentSecondNavbar] = useState(DefaultNavbarId)

  const [NavigationMenu, setNavigationMenu] = useState(InitialNavigationMenu)

  const { energy } = useEnergyContext()

  useEffect(() => {
    if (
      energy.gte(100) &&
      !NavigationMenu.find(menu => menu.value === NavbarId.Adventure)?.unlocked
    ) {
      console.log('Unlocking Adventure tab')
      setNavigationMenu(prev => {
        return prev.map(menu => {
          if (menu.value === NavbarId.Adventure) {
            return {
              ...menu,
              unlocked: true
            }
          } else {
            return menu
          }
        })
      })
    }
  }, [energy])

  const handleNavbarCycle = useCallback(
    (tab: number) => {
      if (tab === CurrentTab) {
        const mainNavbar = NavigationMenu.find(menu => menu.value === CurrentTab)

        const subNavbarValues =
          mainNavbar?.submenu.filter(item => item.unlocked).map(menu => menu.value) || []

        if (subNavbarValues.length === 0 || !mainNavbar) {
          return
        }

        const unlockedValues = [mainNavbar?.value, ...subNavbarValues]

        const currentIndex = unlockedValues?.indexOf(CurrentSecondNavbar)

        if (unlockedValues?.length - 1 === currentIndex) {
          setCurrentSecondNavbar(unlockedValues[0])
        } else {
          setCurrentSecondNavbar(unlockedValues[currentIndex + 1])
        }
      }
    },
    [CurrentSecondNavbar, CurrentTab, NavigationMenu]
  )

  const handleNavbarChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
    setCurrentSecondNavbar(newValue)
  }, [])

  const handleSecondNavbarChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      const currentMenu = NavigationMenu.find(menu => menu.allValues.includes(CurrentTab))

      const selectMenu = NavigationMenu.find(menu => menu.allValues.includes(newValue))

      if (currentMenu && selectMenu) {
        if (currentMenu.value !== selectMenu.value) {
          setCurrentTab(selectMenu.value)
        }
      }

      setCurrentSecondNavbar(newValue)
    },
    [CurrentTab, NavigationMenu]
  )

  return (
    <ContextProvider
      value={{
        NavigationMenu,
        CurrentTab,
        CurrentSecondNavbar,
        setNavigationMenu,
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
  NavigationMenu: NavigationMenuType[]
  CurrentTab: number
  CurrentSecondNavbar: number
  setNavigationMenu: React.Dispatch<React.SetStateAction<NavigationMenuType[]>>
  handleNavbarCycle: (tab: number) => void
  handleNavbarChange: (event: React.SyntheticEvent, newValue: number) => void
  handleSecondNavbarChange: (event: React.SyntheticEvent, newValue: number) => void
}

export default NavbarProvider
