import { Box, styled, Typography } from '@mui/material'
import * as R from 'ramda'
import { useMemo } from 'react'
import { Tooltip } from 'react-tooltip'

import NextImage from '@/components/mainComponents/share/NextImage'
import { InventoryItem, InventoryItemType } from '@/types/inventory'
import { noForwardProps } from '@/util/function/style'

const ItemSlotContainer = styled(Box, noForwardProps)<InventorySlotContainerProps>`
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;

  // if can merge, show green border
  border: ${props => props.__canMerge && '2px solid #4caf50'};
`

const ItemImage = styled(NextImage)`
  position: relative;
`

const StyledTooltip = styled(Tooltip)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 1;
`

const TooltipItem = styled(Typography)``

const ItemSlot = ({
  index,
  item,
  slotType,
  draggedItem,
  draggedIndex,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDragDrop,
  handleRightClick
}: ItemSlotProps) => {
  const canMerge = useMemo(() => {
    if (R.isNil(draggedItem)) return false

    if (draggedIndex === index) return false

    return draggedItem.itemId === item.itemId
  }, [draggedIndex, draggedItem, index, item.itemId])

  return (
    <>
      <ItemSlotContainer
        data-tooltip-id={`item-tooltip-${slotType}-${index}`}
        __canMerge={canMerge}
        draggable
        onDragStart={() => handleDragStart(item, index, slotType)}
        onDragOver={handleDragOver}
        onDragEnd={() => handleDragEnd()}
        onDrop={() => handleDragDrop(item, index, slotType)}
        onContextMenu={e => {
          e.preventDefault()
          handleRightClick(item, index, slotType)
        }}
      >
        <ItemImage key={item.itemId} src={item.icon} alt={item.name} />
      </ItemSlotContainer>
      <StyledTooltip id={`item-tooltip-${slotType}-${index}`}>
        <TooltipItem>{item.name}</TooltipItem>

        <TooltipItem>Enhancement: {item.enhancementLevel.toFixed(0)}</TooltipItem>
      </StyledTooltip>
    </>
  )
}

type ItemSlotProps = {
  index: number
  item: InventoryItem
  slotType: InventoryItemType
  draggedItem: InventoryItem | null
  draggedIndex: number | null
  handleDragStart: (item: InventoryItem, index: number, slotType: InventoryItemType) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDragEnd: () => void
  handleDragDrop: (item: InventoryItem, index: number, slotType: InventoryItemType) => void
  handleRightClick: (item: InventoryItem | null, index: number, slotType: InventoryItemType) => void
}

type InventorySlotContainerProps = {
  __canMerge: boolean
}

export default ItemSlot
