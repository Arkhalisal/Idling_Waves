import Decimal from 'break_infinity.js'

export enum TethysUpgradeId {
  EnergyEfficiency1 = 0,
  AdventureUnlocked = 1
}

export type TethysUpgradeType = {
  id: number
  name: string
  cost: Decimal
  description: string
  unlocked: boolean
}
