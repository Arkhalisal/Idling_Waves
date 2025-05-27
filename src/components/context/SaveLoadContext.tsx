import 'dotenv/config'

import Decimal from 'break_infinity.js'
import { useCallback, useEffect, useRef, useState } from 'react'

import { DEFAULT_SAVE_SPEED } from '@/constants/defaultSetting'
import { SaveData } from '@/types/saveData'
import { createStrictContext } from '@/util/context/createStrictContext'
import { decrypt, encrypt } from '@/util/function/encrypt'

import { useEnergyCondenserContext } from './EnergyCondenserContext'
import { useEnergyContext } from './EnergyContext'

const [ContextProvider, useSaveLoadContext] = createStrictContext<SaveLoadContext>('SaveLoad')

export { useSaveLoadContext }

const SaveLoadProvider = ({ children }: SaveLoadProviderProps) => {
  const { energy, setEnergy } = useEnergyContext()
  const { energyCondensers, setEnergyCondensers } = useEnergyCondenserContext()

  const [loaded, setLoaded] = useState(false)

  // Use refs to track the latest energy and energyCondensers
  const energyRef = useRef(energy)
  const energyCondensersRef = useRef(energyCondensers)

  // Update refs whenever energy or energyCondensers change
  useEffect(() => {
    energyRef.current = energy
    energyCondensersRef.current = energyCondensers
  }, [energy, energyCondensers])

  const saveGame = useCallback(() => {
    try {
      const saveData: SaveData = {
        energy: energyRef.current.toString(),
        energyCondensers: energyCondensersRef.current.map(condenser => ({
          ...condenser,
          amount: condenser.amount.toString(),
          purchased: condenser.purchased.toString(),
          costMultiplier: condenser.costMultiplier.toString(),
          cost: condenser.cost.toString(),
          production: condenser.production.toString(),
          multiplier: condenser.multiplier.toString()
        }))
      }

      const encryptedSaveData = encrypt(JSON.stringify(saveData), process.env.SECRET_SALT || '')

      localStorage.setItem('saveData', encryptedSaveData)
    } catch (error) {
      console.error('Failed to save game:', error)
    }
  }, [])

  const loadGame = useCallback(() => {
    try {
      const saveData = localStorage.getItem('saveData')

      if (!saveData) {
        setLoaded(true)
        return
      }

      const parsedData: SaveData = JSON.parse(decrypt(saveData, process.env.SECRET_SALT || ''))

      const loadedEnergy = new Decimal(parsedData.energy)

      setEnergy(loadedEnergy)

      const loadedEnergyCondensers = parsedData.energyCondensers.map(condenser => ({
        ...condenser,
        amount: new Decimal(condenser.amount),
        purchased: new Decimal(condenser.purchased),
        costMultiplier: new Decimal(condenser.costMultiplier),
        cost: new Decimal(condenser.cost),
        production: new Decimal(condenser.production),
        multiplier: new Decimal(condenser.multiplier)
      }))

      setEnergyCondensers(loadedEnergyCondensers)

      console.log('Game loaded:', parsedData)

      setLoaded(true)
    } catch (error) {
      console.error('Failed to load game:', error)
    }
  }, [setEnergy, setEnergyCondensers])

  // Load game on initial render
  useEffect(() => {
    loadGame()
  }, [loadGame])

  // Save game every 15 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      //   saveGame()
    }, DEFAULT_SAVE_SPEED)

    return () => {
      clearInterval(saveInterval)
    }
  }, [saveGame])

  return <ContextProvider value={{ saveGame, loadGame, loaded }}>{children}</ContextProvider>
}

type SaveLoadContext = {
  saveGame: () => void
  loadGame: () => void
  loaded: boolean
}

type SaveLoadProviderProps = {
  children: React.ReactNode
}

export default SaveLoadProvider
