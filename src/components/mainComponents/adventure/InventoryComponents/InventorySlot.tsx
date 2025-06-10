import { Box, styled, Typography } from '@mui/material'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { useInventoryContext } from '@/components/context/InventoryContext'
import { DEFAULT_INVENTORY_SPACE } from '@/constants/defaultSetting'
import { InventoryItem } from '@/types/inventory'
import { calculateInventoryLayout } from '@/util/function/layout'
import { noForwardProps } from '@/util/function/style'

import NextImage from '../../share/NextImage'

const MainContainer = styled(Box)`
  min-width: 600px;
`

const InventoryContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const InventorySlotContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  width: 80%;

  padding: 10px 60px;
`

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

const EmptyItemSlot = ({ index, handleDragOver, handleDragDrop }: EmptyItemSlotProps) => {
  return (
    <ItemSlotContainer
      onDragOver={handleDragOver}
      onDrop={() => handleDragDrop(index)}
      __canMerge={false}
    >
      <ItemImage src='/image/icon/icon-blank.svg' alt='Empty Slot' />
    </ItemSlotContainer>
  )
}

const InventorySlot = () => {
  const {
    inventoryItem,
    draggedItem,
    draggedIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDropEmpty,
    handleDropItem
  } = useInventoryContext()

  const [currentPage, setCurrentPage] = useState(2)

  const [itemsPerPage, setItemsPerPage] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateItemsPerPage = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const containerPadding = 120
        const itemsPerPage = calculateInventoryLayout(containerWidth - containerPadding, 4)

        setItemsPerPage(itemsPerPage)
      }
    }

    calculateItemsPerPage()

    const handleResize = () => {
      setTimeout(calculateItemsPerPage, 100)
    }

    window.addEventListener('resize', handleResize)

    const resizeObserver = new ResizeObserver(handleResize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
    }
  }, [inventoryItem.length])

  const currentPageItems = useMemo(() => {
    const start = currentPage * itemsPerPage
    const end = Math.min(start + itemsPerPage, DEFAULT_INVENTORY_SPACE)
    return inventoryItem.slice(start, end)
  }, [currentPage, itemsPerPage, inventoryItem])

  const totalPages = useMemo(() => {
    return Math.ceil(inventoryItem.length / itemsPerPage)
  }, [inventoryItem.length, itemsPerPage])

  const minWidth = useMemo(() => {
    const itemsPerRow = itemsPerPage / 4

    return itemsPerRow * 60 + 120
  }, [itemsPerPage])

  const getGlobalIndex = useCallback(
    (localIndex: number) => {
      return currentPage * itemsPerPage + localIndex
    },
    [currentPage, itemsPerPage]
  )

  return (
    <MainContainer>
      <InventoryContainer>
        <InventorySlotContainer ref={containerRef}>
          {RA.mapIndexed((item, index) => {
            const globalIndex = getGlobalIndex(index)

            if (R.isNil(item)) {
              return (
                <EmptyItemSlot
                  key={`empty-${globalIndex}`}
                  index={globalIndex}
                  handleDragOver={handleDragOver}
                  handleDragEnd={handleDragEnd}
                  handleDragDrop={handleDropEmpty}
                />
              )
            }

            return (
              <ItemSlot
                key={`item-${globalIndex}`}
                index={globalIndex}
                item={item}
                draggedItem={draggedItem}
                draggedIndex={draggedIndex}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDragEnd={handleDragEnd}
                handleDragDrop={handleDropItem}
              />
            )
          }, currentPageItems)}
        </InventorySlotContainer>
      </InventoryContainer>
    </MainContainer>
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

type EmptyItemSlotProps = {
  index: number
  handleDragOver: (e: React.DragEvent) => void
  handleDragEnd: () => void
  handleDragDrop: (index: number) => void
}

type InventorySlotContainerProps = {
  __canMerge: boolean
}

export default InventorySlot
