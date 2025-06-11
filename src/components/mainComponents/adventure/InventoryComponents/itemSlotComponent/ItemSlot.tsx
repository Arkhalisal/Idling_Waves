import { Box, styled, Typography } from '@mui/material'
import * as R from 'ramda'
import { useMemo } from 'react'
import { Tooltip } from 'react-tooltip'

import NextImage from '@/components/mainComponents/share/NextImage'
import { InventoryItem } from '@/types/inventory'
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
  draggedItem,
  draggedIndex,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDragDrop
}: ItemSlotProps) => {
  const canMerge = useMemo(() => {
    if (R.isNil(draggedItem)) return false

    if (draggedIndex === index) return false

    return draggedItem.itemId === item.itemId
  }, [draggedIndex, draggedItem, index, item.itemId])

  return (
    <>
      <ItemSlotContainer
        data-tooltip-id={`item-tooltip-${index}`}
        __canMerge={canMerge}
        draggable
        onDragStart={() => handleDragStart(item, index)}
        onDragOver={handleDragOver}
        onDragEnd={() => handleDragEnd()}
        onDrop={() => handleDragDrop(item, index)}
      >
        <ItemImage key={item.itemId} src={item.icon} alt={item.name} />
      </ItemSlotContainer>
      <StyledTooltip id={`item-tooltip-${index}`}>
        <TooltipItem>{item.name}</TooltipItem>

        <TooltipItem>Enhancement: {item.enhancementLevel.toFixed(0)}</TooltipItem>
      </StyledTooltip>
    </>
  )
}

type ItemSlotProps = {
  index: number
  item: InventoryItem
  draggedItem: InventoryItem | null
  draggedIndex: number | null
  handleDragStart: (item: InventoryItem, index: number) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDragEnd: () => void
  handleDragDrop: (item: InventoryItem, index: number) => void
}

type InventorySlotContainerProps = {
  __canMerge: boolean
}

export default ItemSlot
