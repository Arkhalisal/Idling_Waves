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

  console.log('Inventory items:', inventoryItem)

  return (
    <ContextProvider
      value={{
        inventoryItem,
        setInventoryItem
      }}
    >
      {children}
    </ContextProvider>
  )
}

type InventoryContextProps = {
  inventoryItem: (InventoryItem | null)[]
  setInventoryItem: React.Dispatch<React.SetStateAction<(InventoryItem | null)[]>>
}

type InventoryProviderProps = {
  children: React.ReactNode
}

export default InventoryProvider
