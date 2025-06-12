import Decimal from 'break_infinity.js'

import { InventoryItem } from '@/types/inventory'

import { HelmetItemId, helmetItems, WoodenHelmet } from './equipment/helmet'
import { TrainingSword, WeaponItemId, weaponItems, WoodenSword } from './equipment/weapon'

export type InventoryItemId = WeaponItemId | HelmetItemId

export const initialInventoryItem: InventoryItem[] = [
  { ...WoodenSword, enhancementLevel: new Decimal(100) },
  TrainingSword,
  WoodenSword,
  WoodenHelmet,
  WoodenHelmet,
  WoodenHelmet,
  WoodenHelmet
]

export const allItems: InventoryItem[] = [...weaponItems, ...helmetItems]
