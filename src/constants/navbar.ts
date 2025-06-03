export enum NavbarId {
  TethysSystem = 0,
  TethysUpgrade = 1,
  Adventure = 2,
  Achievements = 3
}

export const DefaultNavbarId = NavbarId.Adventure

export enum MapNavbarId {
  HuangLong = 0,
  Rinacita = 1
}

export const InitialMapNavItems = [
  { name: 'HuangLong', value: MapNavbarId.HuangLong, unlocked: true },
  { name: 'Rinacita', value: MapNavbarId.Rinacita, unlocked: false }
]
