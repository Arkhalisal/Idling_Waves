export type SaveData = {
  lastSave: string
  energy: string
  totalEnergy: string
  energyCondensers: {
    name: string
    amount: string
    purchased: string
    cost: string
    costMultiplier: string
    production: string
    multiplier: string
    unlocked: boolean
  }[]
}
