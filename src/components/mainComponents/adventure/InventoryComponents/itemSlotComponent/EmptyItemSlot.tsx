import { Box, styled } from '@mui/material'

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

const EmptyItemSlot = ({
  index,
  slotType,
  className,
  handleDragOver,
  handleDragDrop,
  handleRightClick
}: EmptyItemSlotProps) => {
  return (
    <ItemSlotContainer
      onDragOver={handleDragOver}
      onDrop={() => handleDragDrop(index, slotType)}
      onContextMenu={e => {
        e.preventDefault()
        handleRightClick(null, index, slotType)
      }}
      __canMerge={false}
      className={className}
    >
      <ItemImage src='/image/icon/icon-blank.svg' alt='Empty Slot' />
    </ItemSlotContainer>
  )
}

type EmptyItemSlotProps = {
  index: number
  slotType: InventoryItemType
  className?: string
  handleDragOver: (e: React.DragEvent) => void
  handleDragEnd: () => void
  handleDragDrop: (index: number, slotType: InventoryItemType) => void
  handleRightClick: (item: InventoryItem | null, index: number, slotType: InventoryItemType) => void
}

type InventorySlotContainerProps = {
  __canMerge: boolean
}

export default EmptyItemSlot
