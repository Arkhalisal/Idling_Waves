'use client'

import { useEffect, useMemo } from 'react'

import { DEFAULT_TICK_SPEED } from '@/constants/defaultSetting'
import { createStrictContext } from '@/util/context/createStrictContext'

import { useEnergyCondenserContext } from './EnergyCondenserContext'
import { useSaveLoadContext } from './SaveLoadContext'

const [ContextProvider, useGameLoopContext] = createStrictContext<GameLoopContext>('GameLoop')

export { useGameLoopContext }

const GameLoopProvider = ({ children }: GameLoopContextProps) => {
  const { energyCondenserLoop } = useEnergyCondenserContext()

  const { loaded } = useSaveLoadContext()

  const productionRate = useMemo(() => {
    return 1000 / DEFAULT_TICK_SPEED
  }, [])

  useEffect(() => {
    // If the game is not loaded, we don't start the game loop
    if (!loaded) return

    // Start the game loop
    const gameLoop = setInterval(() => {
      energyCondenserLoop(productionRate)
    }, DEFAULT_TICK_SPEED)

    return () => {
      clearInterval(gameLoop)
    }
  }, [energyCondenserLoop, loaded, productionRate])

  return <ContextProvider value={{}}>{children}</ContextProvider>
}

type GameLoopContext = object

type GameLoopContextProps = {
  children: React.ReactNode
}

export default GameLoopProvider
