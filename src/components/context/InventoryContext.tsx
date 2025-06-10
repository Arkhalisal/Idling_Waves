import Decimal from 'break_infinity.js'
import * as R from 'ramda'
import { useCallback, useState } from 'react'

import { initialInventoryItem } from '@/constants/adventure/inventoryItem'
import { DEFAULT_INVENTORY_SPACE } from '@/constants/defaultSetting'
import { InventoryItem } from '@/types/inventory'
import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useInventoryContext] =
  createStrictContext<InventoryContextProps>('InventoryContext')

export { useInventoryContext }

const InventoryProvider = ({ children }: InventoryProviderProps) => {
  const initializeInventory = useCallback((): (InventoryItem | null)[] => {
    const inventory = new Array(DEFAULT_INVENTORY_SPACE).fill(null)
    initialInventoryItem.forEach((item, index) => {
      inventory[index] = item
    })
    return inventory
  }, [])

  const [inventoryItem, setInventoryItem] = useState<(InventoryItem | null)[]>(
    initializeInventory()
  )

  // Initialize equipment max level
  const [equipmentMaxLevel, setEquipmentMaxLevel] = useState(new Decimal(100))

  const [draggedItem, setDraggedItem] = useState<InventoryItem | null>(null)

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = useCallback((item: InventoryItem, index: number) => {
    setDraggedItem(item)
    setDraggedIndex(index)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    // remove the green plus icon when dragging
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null)
    setDraggedIndex(null)
  }, [])

  const handleDropEmpty = useCallback(
    (index: number) => {
      if (R.isNil(draggedIndex) || R.isNil(draggedItem)) return

      const newInventory = [...inventoryItem]
      newInventory[index] = draggedItem
      newInventory[draggedIndex] = null

      setInventoryItem(newInventory)
      setDraggedItem(null)
      setDraggedIndex(null)
    },
    [draggedIndex, draggedItem, inventoryItem, setInventoryItem]
  )

  const handleDropItem = useCallback(
    (item: InventoryItem, index: number) => {
      if (R.isNil(draggedIndex) || R.isNil(draggedItem)) return
      if (draggedIndex === index) return // Prevent self-drop

      const newInventory = [...inventoryItem]

      const notMaxLevel =
        item.enhancementLevel.lt(equipmentMaxLevel) &&
        draggedItem.enhancementLevel.lt(equipmentMaxLevel)

      // merge items if they are the same
      if (draggedItem.itemId === item.itemId && notMaxLevel) {
        const mergedLevel = item.enhancementLevel.plus(draggedItem.enhancementLevel).plus(1)

        // Ensure the merged level does not exceed the max level
        const finalLevel = Decimal.min(mergedLevel, equipmentMaxLevel)

        const mergedItem = { ...item, enhancementLevel: finalLevel }

        newInventory[index] = mergedItem
        newInventory[draggedIndex] = null
      }

      // swap items if they are different
      if (draggedItem.itemId !== item.itemId) {
        newInventory[index] = draggedItem
        newInventory[draggedIndex] = item
      }

      setInventoryItem(newInventory)
      setDraggedItem(null)
      setDraggedIndex(null)
    },
    [draggedIndex, draggedItem, equipmentMaxLevel, inventoryItem, setInventoryItem]
  )

  console.log('Inventory items:', inventoryItem)

  return (
    <ContextProvider
      value={{
        inventoryItem,
        equipmentMaxLevel,
        draggedItem,
        draggedIndex,
        setInventoryItem,
        setEquipmentMaxLevel,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDropEmpty,
        handleDropItem
      }}
    >
      {children}
    </ContextProvider>
  )
}

type InventoryContextProps = {
  inventoryItem: (InventoryItem | null)[]
  equipmentMaxLevel: Decimal
  draggedItem: InventoryItem | null
  draggedIndex: number | null
  setInventoryItem: React.Dispatch<React.SetStateAction<(InventoryItem | null)[]>>
  setEquipmentMaxLevel: React.Dispatch<React.SetStateAction<Decimal>>
  handleDragStart: (item: InventoryItem, index: number) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDragEnd: () => void
  handleDropEmpty: (index: number) => void
  handleDropItem: (item: InventoryItem, index: number) => void
}

type InventoryProviderProps = {
  children: React.ReactNode
}

export default InventoryProvider
