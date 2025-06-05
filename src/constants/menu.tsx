import IconBlackShore from '@public/image/icon/Icon-black-shore.png'

import { NavigationMenuType } from '@/types/navbar'

import { NavbarId } from './navbar'

const InitialNavigationMenu: NavigationMenuType[] = [
  {
    navName: 'BlackShore',
    navIcon: IconBlackShore.src,
    name: 'Tethys System',
    value: NavbarId.TethysSystem,
    unlocked: true,
    submenu: [
      {
        name: 'Tethys Upgrade',
        navIcon: IconBlackShore.src,
        value: NavbarId.TethysUpgrade,
        unlocked: true
      }
    ],
    allValues: [NavbarId.TethysSystem, NavbarId.TethysUpgrade]
  },
  {
    navName: 'Adventure',
    navIcon: IconBlackShore.src,
    name: 'Adventure',
    value: NavbarId.Adventure,
    unlocked: false,
    submenu: [],
    allValues: [NavbarId.Adventure]
  },
  {
    navName: 'Achievements',
    navIcon: IconBlackShore.src,
    name: 'Achievements',
    value: NavbarId.Achievements,
    unlocked: true,
    submenu: [],
    allValues: [NavbarId.Achievements]
  },
  {
    navName: 'Settings',
    navIcon: IconBlackShore.src,
    name: 'Settings',
    value: NavbarId.Settings,
    unlocked: true,
    submenu: [],
    allValues: [NavbarId.Settings]
  },
  {
    navName: 'Testing',
    navIcon: IconBlackShore.src,
    name: 'Testing',
    value: NavbarId.Testing,
    unlocked: true,
    submenu: [],
    allValues: [NavbarId.Testing]
  }
]

export default InitialNavigationMenu
