export type SaveData = {
  energy: string
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
