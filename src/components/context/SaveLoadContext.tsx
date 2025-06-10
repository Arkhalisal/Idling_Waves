import 'dotenv/config'

import Decimal from 'break_infinity.js'
import { differenceInSeconds } from 'date-fns'
import * as R from 'ramda'
import { useCallback, useEffect, useRef, useState } from 'react'

import { allItems } from '@/constants/adventure/inventoryItem'
import { initialEnergyCondensers } from '@/constants/blackShore/energyCondenser'
import { DEFAULT_ENERGY, DEFAULT_SAVE_SPEED } from '@/constants/defaultSetting'
import { SaveData } from '@/types/saveData'
import { createStrictContext } from '@/util/context/createStrictContext'
import { decrypt, encrypt } from '@/util/function/encrypt'

import { useAdventureMapContext } from './AdventureMapContext'
import { useEnergyCondenserContext } from './EnergyCondenserContext'
import { useEnergyContext } from './EnergyContext'
import { useInventoryContext } from './InventoryContext'
import { useNavbarContext } from './NavbarContext'
import { useTethysUpgradeContext } from './TethysUpgradeContext'

const [ContextProvider, useSaveLoadContext] = createStrictContext<SaveLoadContext>('SaveLoad')

export { useSaveLoadContext }

const SaveLoadProvider = ({ children }: SaveLoadProviderProps) => {
  const {
    energy,
    setEnergy,
    maxEnergy,
    setMaxEnergy,
    totalGeneratedEnergy,
    setTotalGeneratedEnergy
  } = useEnergyContext()
  const { energyCondensers, setEnergyCondensers } = useEnergyCondenserContext()
  const { tethysUpgrade, setTethysUpgrade } = useTethysUpgradeContext()
  const { navigationMenu, setNavigationMenu } = useNavbarContext()
  const { huangLongMap, setHuangLongMap } = useAdventureMapContext()
  const { inventoryItem, setInventoryItem } = useInventoryContext()

  const [loaded, setLoaded] = useState(false)
  const [totalOfflineTime, setTotalOfflineTime] = useState(0)

  // Use refs to track the latest energy and energyCondensers
  const currentEnergyRef = useRef(energy)
  const maxEnergyRef = useRef(maxEnergy)
  const totalEnergyRef = useRef(totalGeneratedEnergy)
  const energyCondensersRef = useRef(energyCondensers)
  const tethysUpgradeRef = useRef(tethysUpgrade)
  const navigationMenuRef = useRef(navigationMenu)
  const huangLongMapRef = useRef(huangLongMap)
  const inventoryItemRef = useRef(inventoryItem)

  // Update refs
  useEffect(() => {
    currentEnergyRef.current = energy
    maxEnergyRef.current = maxEnergy
    totalEnergyRef.current = totalGeneratedEnergy
    energyCondensersRef.current = energyCondensers
    tethysUpgradeRef.current = tethysUpgrade
    navigationMenuRef.current = navigationMenu
    huangLongMapRef.current = huangLongMap
    inventoryItemRef.current = inventoryItem
  }, [
    energy,
    energyCondensers,
    huangLongMap,
    inventoryItem,
    maxEnergy,
    navigationMenu,
    tethysUpgrade,
    totalGeneratedEnergy
  ])

  const saveGame = useCallback(() => {
    try {
      const saveData: SaveData = {
        lastSave: new Date().toISOString(),
        energy: currentEnergyRef.current.toString(),
        maxEnergy: maxEnergyRef.current.toString(),
        totalEnergy: totalEnergyRef.current.toString(),
        energyCondensers: energyCondensersRef.current.map(condenser => ({
          amount: condenser.amount.toString(),
          purchased: condenser.purchased.toString(),
          cost: condenser.cost.toString(),
          purchasedMultiplier: condenser.purchasedMultiplier.toString(),
          unlocked: condenser.unlocked
        })),
        tethysUpgrade: tethysUpgradeRef.current.map(upgrade => ({
          unlocked: upgrade.unlocked
        })),
        navigationMenu: navigationMenuRef.current.map(menu => ({
          unlocked: menu.unlocked,
          submenu: menu.submenu.map(submenu => ({
            unlocked: submenu.unlocked
          }))
        })),
        maps: {
          huangLongMap: huangLongMapRef.current.map(region => ({
            unlocked: region.unlocked
          }))
        },
        inventoryItem: inventoryItemRef.current.map(item => {
          if (R.isNil(item)) return null

          return {
            id: item.itemId,
            level: item.level.toString(),
            enhancementLevel: item.enhancementLevel.toString()
          }
        })
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

        // Convert energies to Decimal
        const loadedEnergy = new Decimal(parsedData.energy)
        setEnergy(loadedEnergy)

        const loadedMaxEnergy = new Decimal(parsedData.maxEnergy)
        setMaxEnergy(loadedMaxEnergy)

        const loadedTotalEnergy = new Decimal(parsedData.totalEnergy)
        setTotalGeneratedEnergy(loadedTotalEnergy)

        // Convert energyCondensers to Decimal and set state
        const loadedEnergyCondensers = parsedData.energyCondensers.map(condenser => ({
          amount: new Decimal(condenser.amount),
          purchased: new Decimal(condenser.purchased),
          cost: new Decimal(condenser.cost),
          purchasedMultiplier: new Decimal(condenser.purchasedMultiplier),
          unlocked: condenser.unlocked
        }))

        setEnergyCondensers(prev => {
          return prev.map((existingCondenser, index) => {
            const loadedCondenser = loadedEnergyCondensers[index]
            if (!loadedCondenser) return existingCondenser
            return {
              ...existingCondenser,
              amount: loadedCondenser.amount,
              purchased: loadedCondenser.purchased,
              cost: loadedCondenser.cost,
              purchasedMultiplier: loadedCondenser.purchasedMultiplier,
              unlocked: loadedCondenser.unlocked
            }
          })
        })

        // Set Tethys upgrades
        setTethysUpgrade(prev => {
          return prev.map((existingUpgrade, index) => {
            const loadedUpgrade = parsedData.tethysUpgrade[index]
            if (!loadedUpgrade) return existingUpgrade
            return {
              ...existingUpgrade,
              unlocked: loadedUpgrade.unlocked
            }
          })
        })

        // Set navigation menu
        setNavigationMenu(prev => {
          return prev.map((existingMenu, index) => {
            const loadedMenu = parsedData.navigationMenu[index]
            if (!loadedMenu) return existingMenu
            return {
              ...existingMenu,
              unlocked: loadedMenu.unlocked,
              submenu: existingMenu.submenu.map((submenu, subIndex) => {
                const loadedSubmenu = loadedMenu.submenu[subIndex]
                if (!loadedSubmenu) return submenu
                return {
                  ...submenu,
                  unlocked: loadedSubmenu.unlocked
                }
              })
            }
          })
        })

        // Set Huang Long map
        setHuangLongMap(prev => {
          return prev.map((existingRegion, index) => {
            const loadedRegion = parsedData.maps.huangLongMap[index]
            if (!loadedRegion) return existingRegion
            return {
              ...existingRegion,
              unlocked: loadedRegion.unlocked
            }
          })
        })

        // Set inventory items
        const loadedInventoryItems = parsedData.inventoryItem.map(item => {
          if (R.isNil(item)) return null
          const foundItem = allItems.find(i => i.itemId === item.id)
          if (!foundItem) return null
          return {
            ...foundItem,
            level: new Decimal(item.level),
            enhancementLevel: new Decimal(item.enhancementLevel)
          }
        })

        setInventoryItem(prev => {
          const newInventory = [...prev]
          loadedInventoryItems.forEach((item, index) => {
            if (item) {
              newInventory[index] = item
            } else {
              newInventory[index] = null
            }
          })
          return newInventory
        })

        console.log('Game loaded:', parsedData)

        setLoaded(true)
      } catch (error) {
        console.error('Failed to load game:', error)
      }
    },
    [
      setEnergy,
      setEnergyCondensers,
      setHuangLongMap,
      setMaxEnergy,
      setNavigationMenu,
      setTethysUpgrade,
      setTotalGeneratedEnergy
    ]
  )

  const resetGame = useCallback(() => {
    setEnergy(new Decimal(DEFAULT_ENERGY))
    setTotalGeneratedEnergy(new Decimal(0))
    setEnergyCondensers(initialEnergyCondensers)
    setTotalOfflineTime(0)
    localStorage.removeItem('saveData')
    window.location.reload()
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
