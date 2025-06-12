export type SaveData = {
  lastSave: string
  energy: string
  maxEnergy: string
  totalEnergy: string
  navigationMenu: {
    unlocked: boolean
    submenu: {
      unlocked: boolean
    }[]
  }[]
  energyCondensers: {
    amount: string
    purchased: string
    cost: string
    purchasedMultiplier: string
    unlocked: boolean
  }[]
  tethysUpgrade: {
    unlocked: boolean
  }[]
  maps: {
    huangLongMap: {
      unlocked: boolean
    }[]
  }
  inventoryItem: ({
    id: string
    level: string
    enhancementLevel: string
  } | null)[]
  weapon: {
    id: string
    level: string
    enhancementLevel: string
  } | null
  armors: ({
    id: string
    level: string
    enhancementLevel: string
  } | null)[]
  echoes: ({
    id: string
    level: string
    enhancementLevel: string
  } | null)[]
}
