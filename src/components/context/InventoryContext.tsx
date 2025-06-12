import Decimal from 'break_infinity.js'
import * as R from 'ramda'
import { useCallback, useState } from 'react'

import { initialInventoryItem } from '@/constants/adventure/inventoryItem'
import { DEFAULT_INVENTORY_SPACE } from '@/constants/defaultSetting'
import { InventoryItem, InventoryItemType } from '@/types/inventory'
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

  const [weapon, setWeapon] = useState<InventoryItem | null>(null)

  const [armors, setArmors] = useState<Armor>([
    {
      type: InventoryItemType.Helmet,
      item: null
    },
    {
      type: InventoryItemType.Chest,
      item: null
    },
    {
      type: InventoryItemType.Leggings,
      item: null
    },
    {
      type: InventoryItemType.Boots,
      item: null
    }
  ])

  const [echoes, setEchoes] = useState<(InventoryItem | null)[]>([null, null, null, null, null])

  // Initialize equipment max level
  const [equipmentMaxLevel, setEquipmentMaxLevel] = useState(new Decimal(100))

  const [draggedItem, setDraggedItem] = useState<InventoryItem | null>(null)

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const [draggedSlotType, setDraggedSlotType] = useState<InventoryItemType | null>(null)

  const handleDragStart = useCallback(
    (item: InventoryItem, index: number, slotType: InventoryItemType) => {
      setDraggedItem(item)
      setDraggedIndex(index)
      setDraggedSlotType(slotType)
    },
    []
  )

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
    (index: number, slotType: InventoryItemType) => {
      if (R.isNil(draggedIndex) || R.isNil(draggedItem)) return

      const newInventory = [...inventoryItem]
      let newWeapon = weapon
      const newArmors = [...armors]
      const newEchoes = [...echoes]

      if (slotType === InventoryItemType.Inventory) {
        if (draggedSlotType === InventoryItemType.Weapon) {
          newWeapon = null
          newInventory[index] = draggedItem
        }

        if (
          draggedSlotType === InventoryItemType.Helmet ||
          draggedSlotType === InventoryItemType.Chest ||
          draggedSlotType === InventoryItemType.Leggings ||
          draggedSlotType === InventoryItemType.Boots
        ) {
          const armorIndex = newArmors.findIndex(armor => armor.type === draggedSlotType)
          newArmors[armorIndex].item = null
          newInventory[index] = draggedItem
        }

        if (draggedSlotType === InventoryItemType.Echoes) {
          newEchoes[draggedIndex] = null
          newInventory[index] = draggedItem
        }

        if (draggedSlotType === InventoryItemType.Inventory) {
          newInventory[index] = draggedItem
          newInventory[draggedIndex] = null
        }
      }

      if (slotType === InventoryItemType.Weapon) {
        newWeapon = draggedItem
        newInventory[draggedIndex] = null
      }

      if (
        slotType === InventoryItemType.Helmet ||
        slotType === InventoryItemType.Chest ||
        slotType === InventoryItemType.Leggings ||
        slotType === InventoryItemType.Boots
      ) {
        if (draggedItem.type !== slotType) return

        const armorIndex = newArmors.findIndex(armor => armor.type === slotType)
        if (armorIndex !== -1) {
          newArmors[armorIndex].item = draggedItem
          newInventory[draggedIndex] = null
        }
      }

      if (slotType === InventoryItemType.Echoes) {
        if (draggedItem.type !== InventoryItemType.Echoes) return

        newEchoes[index] = draggedItem
        newInventory[draggedIndex] = null
      }

      setInventoryItem(newInventory)
      setWeapon(newWeapon)
      setArmors(newArmors)
      setEchoes(newEchoes)
      setDraggedItem(null)
      setDraggedIndex(null)
      setDraggedSlotType(null)
    },
    [draggedIndex, draggedItem, draggedSlotType, inventoryItem, weapon, armors, echoes]
  )

  const handleDropItem = useCallback(
    (item: InventoryItem, index: number, slotType: InventoryItemType) => {
      if (R.isNil(draggedIndex) || R.isNil(draggedItem)) return

      const newInventory = [...inventoryItem]
      let newWeapon = weapon
      const newArmors = [...armors]
      const newEchoes = [...echoes]

      const notMaxLevel =
        item.enhancementLevel.lt(equipmentMaxLevel) &&
        draggedItem.enhancementLevel.lt(equipmentMaxLevel)

      // merge items if they are the same
      if (draggedItem.itemId === item.itemId && notMaxLevel) {
        const mergedLevel = item.enhancementLevel.plus(draggedItem.enhancementLevel).plus(1)

        // Ensure the merged level does not exceed the max level
        const finalLevel = Decimal.min(mergedLevel, equipmentMaxLevel)

        const mergedItem = { ...item, enhancementLevel: finalLevel }

        if (slotType === InventoryItemType.Weapon) {
          newWeapon = mergedItem
          newInventory[draggedIndex] = null
        }

        if (
          slotType === InventoryItemType.Helmet ||
          slotType === InventoryItemType.Chest ||
          slotType === InventoryItemType.Leggings ||
          slotType === InventoryItemType.Boots
        ) {
          const armorIndex = newArmors.findIndex(armor => armor.type === slotType)
          if (armorIndex !== -1) {
            newArmors[armorIndex].item = mergedItem
            newInventory[draggedIndex] = null
          }
        }

        if (slotType === InventoryItemType.Inventory) {
          if (draggedSlotType === InventoryItemType.Weapon) {
            newWeapon = null
            newInventory[index] = mergedItem
          }

          if (
            draggedSlotType === InventoryItemType.Helmet ||
            draggedSlotType === InventoryItemType.Chest ||
            draggedSlotType === InventoryItemType.Leggings ||
            draggedSlotType === InventoryItemType.Boots
          ) {
            newArmors[draggedIndex].item = null
            newInventory[index] = mergedItem
          }

          if (draggedSlotType === InventoryItemType.Echoes) {
            newEchoes[draggedIndex] = null
            newInventory[index] = mergedItem
          }

          if (draggedSlotType === InventoryItemType.Inventory) {
            newInventory[index] = mergedItem
            newInventory[draggedIndex] = null
          }
        }
      }

      // swap items if they are different
      if (draggedItem.itemId !== item.itemId) {
        if (slotType === InventoryItemType.Inventory) {
          if (draggedSlotType === InventoryItemType.Weapon && item.type === draggedItem.type) {
            newWeapon = item
            newInventory[index] = draggedItem
          }

          if (
            (draggedSlotType === InventoryItemType.Helmet && item.type === draggedItem.type) ||
            (draggedSlotType === InventoryItemType.Chest && item.type === draggedItem.type) ||
            (draggedSlotType === InventoryItemType.Leggings && item.type === draggedItem.type) ||
            (draggedSlotType === InventoryItemType.Boots && item.type === draggedItem.type)
          ) {
            newArmors[draggedIndex].item = item
            newInventory[index] = draggedItem
          }

          if (draggedSlotType === InventoryItemType.Echoes && item.type === draggedItem.type) {
            newEchoes[draggedIndex] = item
            newInventory[index] = draggedItem
          }

          if (draggedSlotType === InventoryItemType.Inventory) {
            newInventory[index] = draggedItem
            newInventory[draggedIndex] = item
          }
        }

        if (slotType === InventoryItemType.Weapon && item.type === draggedItem.type) {
          newWeapon = draggedItem
          newInventory[draggedIndex] = item
        }

        if (
          (slotType === InventoryItemType.Helmet && item.type === draggedItem.type) ||
          (slotType === InventoryItemType.Chest && item.type === draggedItem.type) ||
          (slotType === InventoryItemType.Leggings && item.type === draggedItem.type) ||
          (slotType === InventoryItemType.Boots && item.type === draggedItem.type)
        ) {
          newArmors[index].item = draggedItem
          newInventory[draggedIndex] = item
        }

        if (slotType === InventoryItemType.Echoes && item.type === draggedItem.type) {
          newEchoes[index] = draggedItem
          newInventory[draggedIndex] = item
        }
      }

      setInventoryItem(newInventory)
      setWeapon(newWeapon)
      setArmors(newArmors)
      setEchoes(newEchoes)
      setDraggedItem(null)
      setDraggedIndex(null)
    },
    [
      armors,
      draggedIndex,
      draggedItem,
      draggedSlotType,
      echoes,
      equipmentMaxLevel,
      inventoryItem,
      weapon
    ]
  )

  const handleRightClick = useCallback(
    (item: InventoryItem | null, index: number, slotType: InventoryItemType) => {
      const newInventory = [...inventoryItem]
      let newWeapon = weapon
      const newArmors = [...armors]
      const newEchoes = [...echoes]

      if (slotType === InventoryItemType.Inventory) {
        if (item?.type === InventoryItemType.Weapon) {
          if (R.isNil(weapon)) {
            newWeapon = item
            newInventory[index] = null
          } else {
            newWeapon = item
            newInventory[index] = weapon
          }
        }

        if (
          item?.type === InventoryItemType.Helmet ||
          item?.type === InventoryItemType.Chest ||
          item?.type === InventoryItemType.Leggings ||
          item?.type === InventoryItemType.Boots
        ) {
          const armorIndex = newArmors.findIndex(armor => armor.type === item.type)
          if (R.isNil(newArmors[armorIndex].item)) {
            newArmors[armorIndex].item = item
            newInventory[index] = null
          } else {
            newInventory[index] = newArmors[armorIndex].item
            newArmors[armorIndex].item = item
          }
        }

        if (item?.type === InventoryItemType.Echoes) {
          const emptyIndex = newEchoes.findIndex(echo => R.isNil(echo))
          if (emptyIndex === -1) {
            newEchoes[emptyIndex] = item
            newInventory[index] = null
          } else {
            newInventory[index] = newEchoes[0]
            newEchoes[0] = item
          }
        }
      }

      const emptyIndex = newInventory.findIndex(inventoryItem => R.isNil(inventoryItem))

      if (slotType === InventoryItemType.Weapon) {
        if (emptyIndex === -1) {
          // insert alert or something
        } else {
          newWeapon = null
          newInventory[emptyIndex] = item
        }
      }

      if (
        slotType === InventoryItemType.Helmet ||
        slotType === InventoryItemType.Chest ||
        slotType === InventoryItemType.Leggings ||
        slotType === InventoryItemType.Boots
      ) {
        if (emptyIndex === -1) {
          // insert alert or something
        } else {
          newArmors[index].item = null
          newInventory[emptyIndex] = item
        }
      }

      if (slotType === InventoryItemType.Echoes) {
        if (emptyIndex === -1) {
          // insert alert or something
        } else {
          newEchoes[index] = null
          newInventory[emptyIndex] = item
        }
      }

      setInventoryItem(newInventory)
      setWeapon(newWeapon)
      setArmors(newArmors)
      setEchoes(newEchoes)
      setDraggedItem(null)
      setDraggedIndex(null)
      setDraggedSlotType(null)
    },
    [armors, echoes, inventoryItem, weapon]
  )

  return (
    <ContextProvider
      value={{
        inventoryItem,
        equipmentMaxLevel,
        draggedItem,
        draggedIndex,
        weapon,
        armors,
        echoes,
        setInventoryItem,
        setEquipmentMaxLevel,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDropEmpty,
        handleDropItem,
        handleRightClick,
        setWeapon,
        setArmors,
        setEchoes
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
  weapon: InventoryItem | null
  armors: Armor
  echoes: (InventoryItem | null)[]
  setInventoryItem: React.Dispatch<React.SetStateAction<(InventoryItem | null)[]>>
  setEquipmentMaxLevel: React.Dispatch<React.SetStateAction<Decimal>>
  handleDragStart: (item: InventoryItem, index: number, slotType: InventoryItemType) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDragEnd: () => void
  handleDropEmpty: (index: number, slotType: InventoryItemType) => void
  handleDropItem: (item: InventoryItem, index: number, slotType: InventoryItemType) => void
  handleRightClick: (item: InventoryItem | null, index: number, slotType: InventoryItemType) => void
  setWeapon: React.Dispatch<React.SetStateAction<InventoryItem | null>>
  setArmors: React.Dispatch<React.SetStateAction<Armor>>
  setEchoes: React.Dispatch<React.SetStateAction<(InventoryItem | null)[]>>
}

type Armor = {
  type: InventoryItemType
  item: InventoryItem | null
}[]

type InventoryProviderProps = {
  children: React.ReactNode
}

export default InventoryProvider
