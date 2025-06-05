import Decimal from 'break_infinity.js'

import { TethysUpgradeId, TethysUpgradeType } from '@/types/blackShore/tethysUpgrade'

export const initialTethysUpgrade: TethysUpgradeType[] = [
  {
    id: TethysUpgradeId.EnergyEfficiency1,
    name: 'Energy Efficiency 1',
    cost: new Decimal(50),
    description: 'Increases energy production by 50%',
    unlocked: false
  },
  {
    id: TethysUpgradeId.AdventureUnlocked,
    name: 'Unlock Adventure',
    cost: new Decimal(100),
    description:
      'Unlocks the Adventure feature, allowing you to explore new areas and gain rewards.',
    unlocked: false
  }
]
