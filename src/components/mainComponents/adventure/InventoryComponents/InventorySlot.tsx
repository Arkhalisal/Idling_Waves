import { Box, styled } from '@mui/material'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { useInventoryContext } from '@/components/context/InventoryContext'
import { InventoryItem } from '@/types/inventory'

import NextImage from '../../share/NextImage'

const MainContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;

  min-width: 480px;
`

const ItemSlotContainer = styled(Box)`
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
`

const ItemImage = styled(NextImage)`
  position: relative;
`

const ItemSlot = ({ item, index, handleDragStart, handleDragDrop }: ItemSlotProps) => {
  return (
    <>
      <ItemSlotContainer
        data-tooltip-id={`item-tooltip-${index}`}
        draggable
        onDragStart={() => handleDragStart(item)}
        onDrop={() => handleDragDrop(index)}
      >
        <ItemImage src={item.icon} alt={item.name} />
      </ItemSlotContainer>
      <Tooltip id={`item-tooltip-${index}`}>{item.name}</Tooltip>
    </>
  )
}

const EmptyItemSlot = ({ index, handleDragDrop }: EmptyItemSlotProps) => {
  return (
    <ItemSlotContainer onDrop={() => handleDragDrop(index)}>
      {/* <ItemImage src='/image/icon/icon-blank.svg' alt='Empty Slot' /> */}
    </ItemSlotContainer>
  )
}

const InventorySlot = () => {
  const { inventoryItem, setInventoryItem } = useInventoryContext()

  const [draggedItem, setDraggedItem] = useState<InventoryItem | null>(null)

  const handleDragStart = (item: InventoryItem) => {
    setDraggedItem(item)
  }

  const handleDragDrop = (index: number) => {
    if (draggedItem) {
      const newInventory = [...inventoryItem]
      newInventory[index] = draggedItem
      console.log(index, draggedItem)
      // Update the inventory context here
      setInventoryItem(newInventory)
      setDraggedItem(null)
    }
  }

  return (
    <MainContainer>
      {RA.mapIndexed((item, index) => {
        if (R.isNil(item)) {
          return <EmptyItemSlot key={index} index={index} handleDragDrop={handleDragDrop} />
        }

        return (
          <ItemSlot
            key={index}
            item={item}
            index={index}
            handleDragStart={handleDragStart}
            handleDragDrop={handleDragDrop}
          />
        )
      }, inventoryItem)}
    </MainContainer>
  )
}

type ItemSlotProps = {
  item: InventoryItem
  index: number
  handleDragStart: (item: InventoryItem) => void
  handleDragDrop: (index: number) => void
}

type EmptyItemSlotProps = {
  index: number
  handleDragDrop: (index: number) => void
}

export default InventorySlot
