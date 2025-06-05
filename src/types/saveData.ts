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
}
