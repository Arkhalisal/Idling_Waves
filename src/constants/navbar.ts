export enum NavbarId {
  TethysSystem = 0,
  TethysUpgrade = 1,
  Adventure = 2,
  Achievements = 3,
  Settings = 4,
  Testing = 5,
  Battle = 6,
  Inventory = 7
}

export const DefaultNavbarId = NavbarId.Testing

export enum MapNavbarId {
  HuangLong = 0,
  BlackShore = 1,
  Rinacita = 2
}

export const InitialMapNavItems = [
  { name: 'HuangLong', value: MapNavbarId.HuangLong, unlocked: true },
  { name: 'Black Shore', value: MapNavbarId.BlackShore, unlocked: false },
  { name: 'Rinacita', value: MapNavbarId.Rinacita, unlocked: false }
]
