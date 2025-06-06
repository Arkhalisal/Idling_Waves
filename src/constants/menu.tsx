import IconBlackShore from '@public/image/icon/Icon-black-shore.png'

import { NavigationMenuType, SecondNavbarId } from '@/types/navbar'

import { NavbarId } from './navbar'

const InitialNavigationMenu: NavigationMenuType[] = [
  {
    navName: 'BlackShore',
    navIcon: IconBlackShore.src,
    name: 'Tethys System',
    value: NavbarId.TethysSystem,
    secondNavbarId: SecondNavbarId.TethysSystem,
    unlocked: true,
    submenu: [
      {
        name: 'Tethys Upgrade',
        navIcon: IconBlackShore.src,
        value: NavbarId.TethysUpgrade,
        secondNavbarId: SecondNavbarId.TethysUpgrade,
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
    secondNavbarId: SecondNavbarId.Adventure,
    unlocked: false,
    submenu: [
      {
        name: 'Battle',
        navIcon: IconBlackShore.src,
        value: NavbarId.Battle,
        secondNavbarId: SecondNavbarId.Battle,
        unlocked: true
      },
      {
        name: 'Inventory',
        navIcon: IconBlackShore.src,
        value: NavbarId.Inventory,
        secondNavbarId: SecondNavbarId.Inventory,
        unlocked: true
      }
    ],
    allValues: [NavbarId.Adventure]
  },
  {
    navName: 'Achievements',
    navIcon: IconBlackShore.src,
    name: 'Achievements',
    value: NavbarId.Achievements,
    secondNavbarId: SecondNavbarId.Achievements,
    unlocked: true,
    submenu: [],
    allValues: [NavbarId.Achievements]
  },
  {
    navName: 'Settings',
    navIcon: IconBlackShore.src,
    name: 'Settings',
    value: NavbarId.Settings,
    secondNavbarId: SecondNavbarId.Settings,
    unlocked: true,
    submenu: [],
    allValues: [NavbarId.Settings]
  },
  {
    navName: 'Testing',
    navIcon: IconBlackShore.src,
    name: 'Testing',
    value: NavbarId.Testing,
    secondNavbarId: SecondNavbarId.Testing,
    unlocked: true,
    submenu: [],
    allValues: [NavbarId.Testing]
  }
]

export default InitialNavigationMenu
