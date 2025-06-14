'use client'

import Decimal from 'break_infinity.js'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { DEFAULT_TICK_SPEED } from '@/constants/defaultSetting'
import { createStrictContext } from '@/util/context/createStrictContext'

import { useEnergyCondenserContext } from './EnergyCondenserContext'
import { useSaveLoadContext } from './SaveLoadContext'

const [ContextProvider, useGameLoopContext] = createStrictContext<GameLoopContext>('GameLoop')

export { useGameLoopContext }

const GameLoopProvider = ({ children }: GameLoopContextProps) => {
  const { energyCondenserLoop } = useEnergyCondenserContext()

  const { loaded, totalOfflineTime } = useSaveLoadContext()

  const [offlineGained, setOfflineGained] = useState(false)

  const [offlineEnergy, setOfflineEnergy] = useState(new Decimal(0))

  const productionRate = useMemo(() => {
    return Math.floor(1000 / DEFAULT_TICK_SPEED)
  }, [])

  const productionLoop = useCallback(
    (rate: number) => {
      // This function can be used to handle production logic
      // For example, you can call energyCondenserLoop here if needed
      const energyProduced = energyCondenserLoop(rate)

      if (!offlineGained) {
        setOfflineEnergy(prev => prev.plus(energyProduced))
      }
    },
    [energyCondenserLoop, offlineGained]
  )

  const calculateOfflineGain = useCallback(() => {
    // This function calculates the offline gain based on total offline time
    // and sets the offlineGain state accordingly
    if (totalOfflineTime > 0) {
      for (let i = 0; i < totalOfflineTime; i += 1) {
        productionLoop(1)
      }
      setOfflineGained(true)
    } else {
      setOfflineGained(true)
    }
  }, [productionLoop, totalOfflineTime])

  useEffect(() => {
    // If the game is not loaded, we don't start the game loop
    if (!loaded) return

    // Calculate offline gain if applicable
    if (!offlineGained) {
      calculateOfflineGain()
      return
    }

    // Start the game loop
    const gameLoop = setInterval(() => {
      productionLoop(productionRate)
    }, DEFAULT_TICK_SPEED)

    return () => {
      clearInterval(gameLoop)
    }
  }, [calculateOfflineGain, loaded, offlineGained, productionLoop, productionRate])

  return <ContextProvider value={{ offlineGained, offlineEnergy }}>{children}</ContextProvider>
}

type GameLoopContext = {
  offlineGained: boolean
  offlineEnergy: Decimal
}

type GameLoopContextProps = {
  children: React.ReactNode
}

export default GameLoopProvider
