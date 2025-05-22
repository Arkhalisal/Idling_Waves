import { NavigationMenuType } from '@/types/navbar'

import { NavbarId } from './navbar'

const NavigationMenu: NavigationMenuType[] = [
  {
    navName: 'BlackShore',
    value: NavbarId.TethysSystem,
    name: 'Tethys System',
    navIcon: 'Bl',
    submenu: [
      {
        navIcon: 'Te',
        value: NavbarId.InfinityDimensions
      }
    ],
    allValues: [NavbarId.TethysSystem, NavbarId.InfinityDimensions]
  },
  {
    navName: 'Achievements',
    value: NavbarId.Achievements,
    name: 'Achievements',
    navIcon: 'Ac',
    submenu: [],
    allValues: [NavbarId.Achievements]
  }
]

export default NavigationMenu
