import Decimal from 'break_infinity.js'

export enum EnergyCondenserId {
  CONDENSER_1 = 'EnergyCondenser 1',
  CONDENSER_2 = 'EnergyCondenser 2',
  CONDENSER_3 = 'EnergyCondenser 3',
  CONDENSER_4 = 'EnergyCondenser 4'
}

export type EnergyCondenser = {
  id: EnergyCondenserId
  name: string
  amount: Decimal
  purchased: Decimal
  cost: Decimal
  baseCost: Decimal
  costMultiplier: Decimal
  production: Decimal
  purchasedMultiplier: Decimal
  totalMultiplier: Decimal
  unlocked: boolean
}
