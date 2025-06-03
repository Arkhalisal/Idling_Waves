import { useState } from 'react'

import { InitialHuangLongMap } from '@/constants/map/huangLong'
import { InitialMapNavItems } from '@/constants/navbar'
import { MapType } from '@/types/map'
import { ThirdNavbarType } from '@/types/navbar'
import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useAdventureMapContext] =
  createStrictContext<AdventureMapContextProps>('AdventureMap')

export { useAdventureMapContext }

const AdventureMapProvider = ({ children }: AdventureMapProviderProps) => {
  const [mapNavItems, setMapNavItems] = useState<ThirdNavbarType[]>(InitialMapNavItems)

  const [huangLongMap, setHuangLongMap] = useState<MapType[]>(InitialHuangLongMap)

  return (
    <ContextProvider
      value={{
        mapNavItems,
        huangLongMap,
        setMapNavItems,
        setHuangLongMap
      }}
    >
      {children}
    </ContextProvider>
  )
}

type AdventureMapContextProps = {
  mapNavItems: ThirdNavbarType[]
  huangLongMap: MapType[]
  setMapNavItems?: React.Dispatch<React.SetStateAction<ThirdNavbarType[]>>
  setHuangLongMap: React.Dispatch<React.SetStateAction<MapType[]>>
}

type AdventureMapProviderProps = {
  children: React.ReactNode
}

export default AdventureMapProvider
