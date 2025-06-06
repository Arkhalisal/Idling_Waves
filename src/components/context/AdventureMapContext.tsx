import { useCallback, useState } from 'react'

import { InitialHuangLongMap } from '@/constants/map/huangLong'
import { InitialMapNavItems } from '@/constants/navbar'
import { AllZoneId, HuangLongMapId, HuangLongMapType, PlaceHolderId } from '@/types/map'
import { ThirdNavbarType } from '@/types/navbar'
import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useAdventureMapContext] =
  createStrictContext<AdventureMapContextProps>('AdventureMap')

export { useAdventureMapContext }

const AdventureMapProvider = ({ children }: AdventureMapProviderProps) => {
  const [mapNavItems, setMapNavItems] = useState<ThirdNavbarType[]>(InitialMapNavItems)

  const [huangLongMap, setHuangLongMap] = useState<HuangLongMapType[]>(InitialHuangLongMap)

  const [selectedZone, setSelectedZone] = useState<AllZoneId>(PlaceHolderId.Placeholder)

  const isHuangLongMapId = useCallback((mapId: AllZoneId): mapId is HuangLongMapId => {
    return Object.values(HuangLongMapId).includes(mapId as HuangLongMapId)
  }, [])

  const unlockMap = (mapId: AllZoneId) => {
    if (isHuangLongMapId(mapId)) {
      setHuangLongMap(prevMaps =>
        prevMaps.map(map => (map.id === mapId ? { ...map, unlocked: true } : map))
      )
    }
  }

  return (
    <ContextProvider
      value={{
        mapNavItems,
        huangLongMap,
        selectedZone,
        setMapNavItems,
        setHuangLongMap,
        setSelectedZone,
        unlockMap
      }}
    >
      {children}
    </ContextProvider>
  )
}

type AdventureMapContextProps = {
  mapNavItems: ThirdNavbarType[]
  huangLongMap: HuangLongMapType[]
  selectedZone: AllZoneId
  setMapNavItems: React.Dispatch<React.SetStateAction<ThirdNavbarType[]>>
  setHuangLongMap: React.Dispatch<React.SetStateAction<HuangLongMapType[]>>
  setSelectedZone: React.Dispatch<React.SetStateAction<AllZoneId>>
  unlockMap: (mapId: AllZoneId) => void
}

type AdventureMapProviderProps = {
  children: React.ReactNode
}

export default AdventureMapProvider
