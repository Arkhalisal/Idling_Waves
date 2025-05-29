import 'dotenv/config'

import Decimal from 'break_infinity.js'
import { differenceInSeconds } from 'date-fns'
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
  const { energy, setEnergy, totalGeneratedEnergy, setTotalGeneratedEnergy } = useEnergyContext()
  const { energyCondensers, setEnergyCondensers } = useEnergyCondenserContext()

  const [loaded, setLoaded] = useState(false)
  const [totalOfflineTime, setTotalOfflineTime] = useState(0)

  // Use refs to track the latest energy and energyCondensers
  const currentEnergyRef = useRef(energy)
  const totalEnergyRef = useRef(totalGeneratedEnergy)
  const energyCondensersRef = useRef(energyCondensers)

  // Update refs
  useEffect(() => {
    currentEnergyRef.current = energy
    totalEnergyRef.current = totalGeneratedEnergy
    energyCondensersRef.current = energyCondensers
  }, [energy, energyCondensers, totalGeneratedEnergy])

  const saveGame = useCallback(() => {
    try {
      const saveData: SaveData = {
        lastSave: new Date().toISOString(),
        energy: currentEnergyRef.current.toString(),
        totalEnergy: totalEnergyRef.current.toString(),
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

      const lastSaveTime = new Date(parsedData.lastSave)
      const currentTime = new Date()

      setTotalOfflineTime(differenceInSeconds(currentTime, lastSaveTime))

      // Convert energy and totalEnergy to Decimal
      const loadedEnergy = new Decimal(parsedData.energy)
      setEnergy(loadedEnergy)

      const loadedTotalEnergy = new Decimal(parsedData.totalEnergy)
      setTotalGeneratedEnergy(loadedTotalEnergy)

      // Convert energyCondensers to Decimal and set state
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
  }, [setEnergy, setEnergyCondensers, setTotalGeneratedEnergy])

  // Load game on initial render
  useEffect(() => {
    loadGame()
  }, [loadGame])

  // Save game every 15 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      // saveGame()
    }, DEFAULT_SAVE_SPEED)

    return () => {
      clearInterval(saveInterval)
    }
  }, [saveGame])

  return (
    <ContextProvider value={{ saveGame, loadGame, loaded, totalOfflineTime }}>
      {children}
    </ContextProvider>
  )
}

type SaveLoadContext = {
  saveGame: () => void
  loadGame: () => void
  loaded: boolean
  totalOfflineTime: number
}

type SaveLoadProviderProps = {
  children: React.ReactNode
}

export default SaveLoadProvider
