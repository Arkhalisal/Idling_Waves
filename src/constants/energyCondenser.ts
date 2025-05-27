import Decimal from 'break_infinity.js'

export type EnergyCondenser = {
  name: string
  amount: Decimal
  purchased: Decimal
  cost: Decimal
  costMultiplier: Decimal
  production: Decimal
  multiplier: Decimal
  unlocked: boolean
}

export const initialEnergyCondensers: EnergyCondenser[] = [
  {
    name: 'EnergyCondenser 1',
    amount: new Decimal(0),
    purchased: new Decimal(0),
    cost: new Decimal(1),
    costMultiplier: new Decimal('1e3'),
    production: new Decimal(1),
    multiplier: new Decimal(1),
    unlocked: true
  },
  {
    name: 'EnergyCondenser 2',
    amount: new Decimal(0),
    purchased: new Decimal(0),
    cost: new Decimal(1),
    costMultiplier: new Decimal('1e3'),
    production: new Decimal(1),
    multiplier: new Decimal(1),
    unlocked: true
  },
  {
    name: 'EnergyCondenser 3',
    amount: new Decimal(0),
    purchased: new Decimal(0),
    cost: new Decimal(1),
    costMultiplier: new Decimal('1e3'),
    production: new Decimal(1),
    multiplier: new Decimal(1),
    unlocked: true
  },
  {
    name: 'EnergyCondenser 4',
    amount: new Decimal(0),
    purchased: new Decimal(0),
    cost: new Decimal(1),
    costMultiplier: new Decimal('1e3'),
    production: new Decimal(1),
    multiplier: new Decimal(1),
    unlocked: true
  }
]
