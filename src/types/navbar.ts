import { NavbarId } from '@/constants/navbar'

export type NavigationMenuType = {
  navName: string
  value: NavbarId
  name: string
  navIcon: string
  submenu: SubmenuType[]
  allValues: NavbarId[]
}

export type SubmenuType = {
  navIcon: string
  value: NavbarId
}
