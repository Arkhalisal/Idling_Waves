import Decimal from 'break_infinity.js'

export type Stats = {
  attack: Decimal
  defense: Decimal
  health: Decimal
  critChance: Decimal
  critDamage: Decimal
}

export enum SpecialId {
  FlatAttackBoost = 'flat_attack_boost',
  FlatDefenseBoost = 'flat_defense_boost',
  FlatHealthBoost = 'flat_health_boost',
  PercentageAttackBoost = 'percentage_attack_boost',
  PercentageDefenseBoost = 'percentage_defense_boost',
  PercentageHealthBoost = 'percentage_health_boost',
  CritChanceBoost = 'crit_chance_boost',
  CritDamageBoost = 'crit_damage_boost',
  EquipmentDropRateBoost = 'equipment_drop_rate_boost',
  EchoDropRateBoost = 'echo_drop_rate_boost',
  ItemDropRateBoost = 'item_drop_rate_boost',
  AllDropRateBoost = 'all_drop_rate_boost',
  ExperienceGainBoost = 'experience_gain_boost',
  GoldDropRateBoost = 'gold_drop_rate_boost'
}

export enum SpecialName {
  FlatAttackBoost = 'Flat Attack Boost',
  FlatDefenseBoost = 'Flat Defense Boost',
  FlatHealthBoost = 'Flat Health Boost',
  PercentageAttackBoost = 'Percentage Attack Boost',
  PercentageDefenseBoost = 'Percentage Defense Boost',
  PercentageHealthBoost = 'Percentage Health Boost',
  CritChanceBoost = 'Crit Chance Boost',
  CritDamageBoost = 'Crit Damage Boost',
  EquipmentDropRateBoost = 'Equipment Drop Rate Boost',
  EchoDropRateBoost = 'Echo Drop Rate Boost',
  ItemDropRateBoost = 'Item Drop Rate Boost',
  AllDropRateBoost = 'All Drop Rate Boost',
  ExperienceGainBoost = 'Experience Gain Boost',
  GoldDropRateBoost = 'Gold Drop Rate Boost'
}

export type Special = {
  id: SpecialId
  name: SpecialName
  percentage: boolean
  value: Decimal
}

export enum InventoryItemRarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary'
}

export type InventoryItemType = {
  id: string
  name: string
  description: string
  level: Decimal
  rarity: InventoryItemRarity
  stats: Stats
  special: Special[]
}
