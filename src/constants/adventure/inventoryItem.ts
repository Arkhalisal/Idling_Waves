import IconBlackShore from '@public/image/icon/Icon-black-shore.png'
import Decimal from 'break_infinity.js'

import { InventoryItem, InventoryItemRarity, InventoryItemType } from '@/types/inventory'

export enum InventoryItemId {
  WoodenSword = 'wooden_sword'
}

const WoodenSword: InventoryItem = {
  itemId: InventoryItemId.WoodenSword,
  name: 'Wooden Sword',
  icon: IconBlackShore.src,
  description: 'A basic wooden sword, suitable for beginners.',
  type: InventoryItemType.Weapon,
  rarity: InventoryItemRarity.Common,
  level: new Decimal(0),
  baseStats: {
    attack: new Decimal(5),
    defense: new Decimal(0),
    health: new Decimal(0),
    critChance: new Decimal(0),
    critDamage: new Decimal(0)
  },
  special: []
}

export const initialInventoryItem: InventoryItem[] = [WoodenSword]
