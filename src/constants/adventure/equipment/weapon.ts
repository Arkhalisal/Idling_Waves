import IconTrainingSword from '@public/image/icon/equipment/weapon/icon-training-sword.jpg'
import IconWoodenSword from '@public/image/icon/equipment/weapon/icon-wooden-sword.jpg'
import Decimal from 'break_infinity.js'

import { InventoryItem, InventoryItemRarity, InventoryItemType } from '@/types/inventory'

export enum WeaponItemId {
  WoodenSword = 'wooden_sword',
  TrainingSword = 'training_sword'
}

export const WoodenSword: InventoryItem = {
  itemId: WeaponItemId.WoodenSword,
  name: 'Wooden Sword',
  icon: IconWoodenSword.src,
  description: 'A basic wooden sword, suitable for beginners.',
  type: InventoryItemType.Weapon,
  rarity: InventoryItemRarity.Garbage,
  level: new Decimal(0),
  enhancementLevel: new Decimal(0),
  baseStats: {
    attack: new Decimal(5),
    defense: new Decimal(0),
    health: new Decimal(0),
    critChance: new Decimal(0),
    critDamage: new Decimal(0)
  },
  special: []
}

export const TrainingSword: InventoryItem = {
  itemId: WeaponItemId.TrainingSword,
  name: 'Training Sword',
  icon: IconTrainingSword.src,
  description: 'A sword used for training, slightly better than a wooden sword.',
  type: InventoryItemType.Weapon,
  rarity: InventoryItemRarity.Common,
  level: new Decimal(0),
  enhancementLevel: new Decimal(0),
  baseStats: {
    attack: new Decimal(10),
    defense: new Decimal(0),
    health: new Decimal(0),
    critChance: new Decimal(0),
    critDamage: new Decimal(0)
  },
  special: []
}

export const weaponItems: InventoryItem[] = [WoodenSword, TrainingSword]
