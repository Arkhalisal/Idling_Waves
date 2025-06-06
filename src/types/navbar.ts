import { NavbarId } from '@/constants/navbar'

export enum SecondNavbarId {
  TethysSystem = 'SecondNavbarTethysSystem',
  TethysUpgrade = 'SecondNavbarTethysUpgrade',
  Adventure = 'SecondNavbarAdventure',
  Battle = 'SecondNavbarBattle',
  Achievements = 'SecondNavbarAchievements',
  Settings = 'SecondNavbarSettings',
  Testing = 'SecondNavbarTesting',
  Inventory = 'SecondNavbarInventory'
}

export type NavigationMenuType = {
  navName: string
  navIcon: string
  name: string
  value: NavbarId
  secondNavbarId: SecondNavbarId
  unlocked: boolean
  submenu: SubmenuType[]
  allValues: NavbarId[]
}

export type SubmenuType = {
  navIcon: string
  name: string
  value: NavbarId
  secondNavbarId: SecondNavbarId
  unlocked: boolean
}

export type ThirdNavbarType = {
  name: string
  value: number
  unlocked: boolean
}
