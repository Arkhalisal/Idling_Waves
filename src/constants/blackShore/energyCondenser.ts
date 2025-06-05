import Decimal from 'break_infinity.js'

import { EnergyCondenser, EnergyCondenserId } from '@/types/blackShore/energyCondenser'

export const initialEnergyCondensers: EnergyCondenser[] = [
  {
    id: EnergyCondenserId.CONDENSER_1,
    name: 'EnergyCondenser 1',
    amount: new Decimal(0),
    purchased: new Decimal(0),
    baseCost: new Decimal(10),
    cost: new Decimal(10),
    costMultiplier: new Decimal('100'),
    production: new Decimal(1),
    purchasedMultiplier: new Decimal(1),
    totalMultiplier: new Decimal(1),
    unlocked: true
  },
  {
    id: EnergyCondenserId.CONDENSER_2,
    name: 'EnergyCondenser 2',
    amount: new Decimal(0),
    purchased: new Decimal(0),
    cost: new Decimal(10000),
    baseCost: new Decimal(10000),
    costMultiplier: new Decimal('1e3'),
    production: new Decimal(0.8),
    purchasedMultiplier: new Decimal(1),
    totalMultiplier: new Decimal(1),
    unlocked: false
  },
  {
    id: EnergyCondenserId.CONDENSER_3,
    name: 'EnergyCondenser 3',
    amount: new Decimal(0),
    purchased: new Decimal(0),
    cost: new Decimal(1000000),
    baseCost: new Decimal(1000000),
    costMultiplier: new Decimal('1e3'),
    production: new Decimal(0.6),
    purchasedMultiplier: new Decimal(1),
    totalMultiplier: new Decimal(1),
    unlocked: false
  },
  {
    id: EnergyCondenserId.CONDENSER_4,
    name: 'EnergyCondenser 4',
    amount: new Decimal(0),
    purchased: new Decimal(0),
    cost: new Decimal(100000000),
    baseCost: new Decimal(100000000),
    costMultiplier: new Decimal('1e3'),
    production: new Decimal(0.4),
    purchasedMultiplier: new Decimal(1),
    totalMultiplier: new Decimal(1),
    unlocked: false
  }
]
