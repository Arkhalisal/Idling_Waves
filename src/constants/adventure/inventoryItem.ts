import Decimal from 'break_infinity.js'

import { InventoryItem } from '@/types/inventory'

import { TrainingSword, WeaponItemId, weaponItems, WoodenSword } from './equipment/weapon'

export type InventoryItemId = WeaponItemId

export const initialInventoryItem: InventoryItem[] = [
  { ...WoodenSword, enhancementLevel: new Decimal(100) },
  TrainingSword,
  WoodenSword
]

export const allItems: InventoryItem[] = [...weaponItems]
