import { HuangLongMapId, HuangLongMapType } from '@/types/map'

export const InitialHuangLongMap: HuangLongMapType[] = [
  {
    id: HuangLongMapId.SuspendedRuins,
    name: 'Suspended Ruins',
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
    unlocked: false
  },
  {
    id: HuangLongMapId.DesorockHighland,
    name: 'Desorock Highland',
    coordinates: [
      [78, 45],
      [74, 47],
      [70, 46],
      [66, 40],
      [69, 36],
      [70, 21],
      [80, 24],
      [86, 31],
      [87, 36]
    ],
    color: '#6366f1',
    description: '',
    recommandLevel: 25,
    unlocked: false
  },
  {
    id: HuangLongMapId.CentralPlains,
    name: 'Central Plains',
    coordinates: [
      [66, 40],
      [64, 42],
      [56, 37],
      [58, 31],
      [57, 26],
      [43, 27],
      [46, 14],
      [55, 16],
      [58, 21],
      [63, 23],
      [70, 21],
      [69, 36]
    ],
    color: '#06b6d4',
    description: '',
    recommandLevel: 10,
    unlocked: false
  },
  {
    id: HuangLongMapId.GorgesofSpirits,
    name: 'Gorges of Spirits',
    coordinates: [
      [55, 16],
      [58, 21],
      [63, 23],
      [70, 21],
      [69, 16],
      [65, 13],
      [59, 13]
    ],
    color: '#10b981',
    description: '',
    recommandLevel: 5,
    unlocked: false
  },
  {
    id: HuangLongMapId.TowerOfAdversity,
    name: 'Tower of Adversity',
    coordinates: [
      [64, 42],
      [56, 37],
      [51, 42],
      [57, 48]
    ],
    color: '#8b5cf6',
    description: '',
    recommandLevel: 15,
    unlocked: false
  },
  {
    id: HuangLongMapId.Jinzhou,
    name: 'Jinzhou',
    coordinates: [
      [43, 27],
      [57, 26],
      [58, 31],
      [56, 37],
      [51, 42],
      [46, 42],
      [47, 30]
    ],
    color: '#22c55e',
    description: '',
    recommandLevel: 0,
    unlocked: true
  },
  {
    id: HuangLongMapId.PortCityofGuixu,
    name: 'Port City of Guixu',
    coordinates: [
      [43, 27],
      [34, 30],
      [27, 16],
      [36, 12],
      [46, 14]
    ],
    color: '#f97316',
    description: '',
    recommandLevel: 30,
    unlocked: false
  },
  {
    id: HuangLongMapId.TigersMaw,
    name: "Tiger's Maw",
    coordinates: [
      [34, 30],
      [43, 27],
      [47, 30],
      [46, 42],
      [46, 44],
      [33, 46],
      [28, 38]
    ],
    color: '#ef4444',
    description: '',
    recommandLevel: 40,
    unlocked: false
  },
  {
    id: HuangLongMapId.DimForest,
    name: 'Dim Forest',
    coordinates: [
      [28, 38],
      [34, 30],
      [27, 16],
      [17, 21],
      [12, 39]
    ],
    color: '#ec4899',
    description: '',
    recommandLevel: 60,
    unlocked: false
  },
  {
    id: HuangLongMapId.WhiningAixsMire,
    name: 'Whining Aixs Mire',
    coordinates: [
      [12, 39],
      [28, 38],
      [33, 46],
      [31, 54],
      [21, 56],
      [12, 54]
    ],
    color: '#8b5cf6',
    description: '',
    recommandLevel: 70,
    unlocked: false
  },
  {
    id: HuangLongMapId.MtFirmament,
    name: 'Mt. Firmament',
    coordinates: [
      [25, 59],
      [28, 63],
      [25, 68],
      [27, 81],
      [21, 84],
      [13, 84],
      [8, 80],
      [6, 69],
      [10, 66],
      [13, 67]
    ],
    color: '#f59e0b',
    description: '',
    recommandLevel: 80,
    unlocked: false
  },
  {
    id: HuangLongMapId.BlackShore,
    name: 'Black Shore',
    coordinates: [
      [60, 83],
      [59, 85],
      [54, 88],
      [46, 86],
      [44, 83],
      [49, 77],
      [56, 78]
    ],
    color: '#10b981',
    description: '',
    recommandLevel: 90,
    unlocked: false
  }
]
