import IconWoodenHelmet from '@public/image/icon/equipment/weapon/icon-wooden-sword.jpg'
import Decimal from 'break_infinity.js'

import { InventoryItem, InventoryItemRarity, InventoryItemType } from '@/types/inventory'

export enum HelmetItemId {
  WoodenHelmet = 'woodenHelmet'
}

export const WoodenHelmet: InventoryItem = {
  itemId: HelmetItemId.WoodenHelmet,
  name: 'Wooden Helmet',
  icon: IconWoodenHelmet.src,
  description: 'A basic wooden helmet, provides minimal protection.',
  type: InventoryItemType.Helmet,
  rarity: InventoryItemRarity.Garbage,
  level: new Decimal(0),
  enhancementLevel: new Decimal(0),
  baseStats: {
    attack: new Decimal(0),
    defense: new Decimal(5),
    health: new Decimal(0),
    critChance: new Decimal(0),
    critDamage: new Decimal(0)
  },
  special: []
}

export const helmetItems: InventoryItem[] = [WoodenHelmet]
