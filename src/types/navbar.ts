import { NavbarId } from '@/constants/navbar'

export type NavigationMenuType = {
  navName: string
  navIcon: string
  name: string
  value: NavbarId
  unlocked: boolean
  submenu: SubmenuType[]
  allValues: NavbarId[]
}

export type SubmenuType = {
  navIcon: string
  name: string
  value: NavbarId
  unlocked: boolean
}
