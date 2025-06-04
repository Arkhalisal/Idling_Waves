import 'dotenv/config'

import Decimal from 'break_infinity.js'
import { differenceInSeconds } from 'date-fns'
import { useCallback, useEffect, useRef, useState } from 'react'

import { DEFAULT_ENERGY, DEFAULT_SAVE_SPEED } from '@/constants/defaultSetting'
import { initialEnergyCondensers } from '@/constants/energyCondenser'
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

  const loadGame = useCallback(
    (saveData: string | null) => {
      try {
        setLoaded(false)

        if (!saveData) {
          setLoaded(true)
          return
        }

        // error handling for decryption
        let decryptedData
        try {
          decryptedData = decrypt(saveData, process.env.SECRET_SALT || '')
        } catch (decryptError) {
          console.error('Decryption failed:', decryptError)
          setLoaded(true) // Mark as loaded to prevent infinite retries
          return
        }

        // error handling for JSON parsing
        let parsedData: SaveData
        try {
          parsedData = JSON.parse(decryptedData)
        } catch (parseError) {
          console.error('Invalid JSON data:', parseError)
          setLoaded(true) // Mark as loaded to skip invalid data
          return
        }

        const lastSaveTime = new Date(parsedData.lastSave)
        const currentTime = new Date()

        const offlineTime = differenceInSeconds(currentTime, lastSaveTime)

        // Set total offline time if it exceeds 120 seconds
        if (offlineTime > 120) {
          setTotalOfflineTime(offlineTime)
        }

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
    },
    [setEnergy, setEnergyCondensers, setTotalGeneratedEnergy]
  )

  const resetGame = useCallback(() => {
    setEnergy(new Decimal(DEFAULT_ENERGY))
    setTotalGeneratedEnergy(new Decimal(0))
    setEnergyCondensers(initialEnergyCondensers)
    setTotalOfflineTime(0)
    localStorage.removeItem('saveData')
  }, [setEnergy, setEnergyCondensers, setTotalGeneratedEnergy, setTotalOfflineTime])

  // Load game on initial render
  useEffect(() => {
    const saveData = localStorage.getItem('saveData')

    loadGame(saveData)
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
    <ContextProvider value={{ saveGame, loadGame, resetGame, loaded, totalOfflineTime }}>
      {children}
    </ContextProvider>
  )
}

type SaveLoadContext = {
  saveGame: () => void
  loadGame: (saveData: string | null) => void
  resetGame: () => void
  loaded: boolean
  totalOfflineTime: number
}

type SaveLoadProviderProps = {
  children: React.ReactNode
}

export default SaveLoadProvider
