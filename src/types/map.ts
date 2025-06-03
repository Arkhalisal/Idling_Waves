export type MapType = {
  id: string
  name: string
  coordinates: number[][]
  color: string
  description: string
  recommandLevel: number
  unlocked: boolean
}

export enum HuangLongMapId {
  NorfallBarrens = 'NorfallBarrens',
  HochlandDesorock = 'HochlandDesorock',
  ZentralebeNen = 'ZentralebeNen',
  GeisterschlUchten = 'GeisterschlUchten',
  TowerOfAdversity = 'TowerofAdversity',
  Jinzhou = 'Jinzhou',
  HafenstadtGuixu = 'HafenstadtGuixu',
  Tigerschlund = 'Tigerschlund',
  BachtWuming = 'BachtWuming',
  DustererWald = 'DustererWald',
  JaulenderSumpf = 'JaulenderSumpf',
  MtFirmament = 'MtFirmament',
  BlackShore = 'BlackShore'
}
