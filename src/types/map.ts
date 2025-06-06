export type HuangLongMapType = {
  id: HuangLongMapId
  name: string
  coordinates: number[][]
  color: string
  description: string
  recommandLevel: number
  unlocked: boolean
}

export enum HuangLongMapId {
  SuspendedRuins = 'SuspendedRuins',
  DesorockHighland = 'DesorockHighland',
  CentralPlains = 'CentralPlains',
  GorgesofSpirits = 'GorgesofSpirits',
  TowerOfAdversity = 'TowerofAdversity',
  Jinzhou = 'Jinzhou',
  PortCityofGuixu = 'PortCityofGuixu',
  TigersMaw = 'TigersMaw',
  WumingBay = 'WumingBay',
  DimForest = 'DimForest',
  WhiningAixsMire = 'WhiningAixsMire',
  MtFirmament = 'MtFirmament',
  BlackShore = 'BlackShore'
}

export enum PlaceHolderId {
  Placeholder = 'Placeholder'
}

export type AllZoneId = PlaceHolderId | HuangLongMapId
