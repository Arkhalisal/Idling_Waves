import { HuangLongMapId, MapType } from '@/types/map'

export const InitialHuangLongMap: MapType[] = [
  {
    id: HuangLongMapId.NorfallBarrens,
    name: 'Norfall Barrens',
    coordinates: [
      [98, 50],
      [96, 55],
      [91, 60],
      [85, 63],
      [81, 58],
      [78, 50],
      [78, 48],
      [78, 45], // border right
      [87, 36], // border left
      [94, 40]
    ],
    color: '#f59e0b',
    description: '',
    recommandLevel: 0,
    unlocked: true
  },
  {
    id: HuangLongMapId.HochlandDesorock,
    name: 'Hochland Desorock',
    coordinates: [
      [78, 45],
      [74, 47],
      [87, 36]
    ],
    color: '#6366f1',
    description: '',
    recommandLevel: 25,
    unlocked: true
  },
  {
    id: HuangLongMapId.ZentralebeNen,
    name: 'Zentralebe Nen',
    coordinates: [],
    color: '#06b6d4',
    description: '',
    recommandLevel: 10,
    unlocked: true
  },
  {
    id: HuangLongMapId.GeisterschlUchten,
    name: 'Geisterschl Uchten',
    coordinates: [],
    color: '#10b981',
    description: '',
    recommandLevel: 5,
    unlocked: true
  },
  {
    id: HuangLongMapId.TowerOfAdversity,
    name: 'Tower of Adversity',
    coordinates: [],
    color: '#8b5cf6',
    description: '',
    recommandLevel: 15,
    unlocked: true
  },
  {
    id: HuangLongMapId.Jinzhou,
    name: 'Jinzhou',
    coordinates: [],
    color: '#22c55e',
    description: '',
    recommandLevel: 10,
    unlocked: true
  },
  {
    id: HuangLongMapId.HafenstadtGuixu,
    name: 'Hafenstadt Guixu',
    coordinates: [],
    color: '#f97316',
    description: '',
    recommandLevel: 30,
    unlocked: true
  },
  {
    id: HuangLongMapId.Tigerschlund,
    name: 'Tigerschlund',
    coordinates: [],
    color: '#ef4444',
    description: '',
    recommandLevel: 40,
    unlocked: true
  },
  {
    id: HuangLongMapId.BachtWuming,
    name: 'Bacht Wuming',
    coordinates: [],
    color: '#f43f5e',
    description: '',
    recommandLevel: 50,
    unlocked: true
  },
  {
    id: HuangLongMapId.DustererWald,
    name: 'Dusterer Wald',
    coordinates: [],
    color: '#ec4899',
    description: '',
    recommandLevel: 60,
    unlocked: true
  },
  {
    id: HuangLongMapId.JaulenderSumpf,
    name: 'Jaulender Sumpf',
    coordinates: [],
    color: '#8b5cf6',
    description: '',
    recommandLevel: 70,
    unlocked: true
  },
  {
    id: HuangLongMapId.MtFirmament,
    name: 'Mt. Firmament',
    coordinates: [],
    color: '#f59e0b',
    description: '',
    recommandLevel: 80,
    unlocked: true
  },
  {
    id: HuangLongMapId.BlackShore,
    name: 'BlackShore',
    coordinates: [],
    color: '#10b981',
    description: '',
    recommandLevel: 90,
    unlocked: true
  }
]
