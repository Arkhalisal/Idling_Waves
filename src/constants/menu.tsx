import { NavigationMenuType } from '@/types/navbar'

import { NavbarId } from './navbar'

const InitialNavigationMenu: NavigationMenuType[] = [
  {
    navName: 'BlackShore',
    navIcon: 'Bl',
    name: 'Tethys System',
    value: NavbarId.TethysSystem,
    unlocked: true,
    submenu: [
      {
        name: 'Tethys Upgrade',
        navIcon: 'Te',
        value: NavbarId.TethysUpgrade,
        unlocked: false
      }
    ],
    allValues: [NavbarId.TethysSystem, NavbarId.TethysUpgrade]
  },
  {
    navName: 'Adventure',
    navIcon: 'Ad',
    name: 'Adventure',
    value: NavbarId.Adventure,
    unlocked: false,
    submenu: [],
    allValues: [NavbarId.Adventure]
  },
  {
    navName: 'Achievements',
    navIcon: 'Ac',
    name: 'Achievements',
    value: NavbarId.Achievements,
    unlocked: true,
    submenu: [],
    allValues: [NavbarId.Achievements]
  }
]

export default InitialNavigationMenu
