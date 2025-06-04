import { useState } from 'react'

import { InitialHuangLongMap } from '@/constants/map/huangLong'
import { InitialMapNavItems } from '@/constants/navbar'
import { AllZoneId, HuangLongMapType, PlaceHolderId } from '@/types/map'
import { ThirdNavbarType } from '@/types/navbar'
import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useAdventureMapContext] =
  createStrictContext<AdventureMapContextProps>('AdventureMap')

export { useAdventureMapContext }

const AdventureMapProvider = ({ children }: AdventureMapProviderProps) => {
  const [mapNavItems, setMapNavItems] = useState<ThirdNavbarType[]>(InitialMapNavItems)

  const [huangLongMap, setHuangLongMap] = useState<HuangLongMapType[]>(InitialHuangLongMap)

  const [selectedZone, setSelectedZone] = useState<AllZoneId>(PlaceHolderId.Placeholder)

  return (
    <ContextProvider
      value={{
        mapNavItems,
        huangLongMap,
        selectedZone,
        setMapNavItems,
        setHuangLongMap,
        setSelectedZone
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
}

type AdventureMapProviderProps = {
  children: React.ReactNode
}

export default AdventureMapProvider
