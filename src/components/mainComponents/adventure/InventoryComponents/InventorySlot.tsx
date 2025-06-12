import { Box, styled } from '@mui/material'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useInventoryContext } from '@/components/context/InventoryContext'
import { DEFAULT_INVENTORY_SPACE } from '@/constants/defaultSetting'
import { InventoryItemType } from '@/types/inventory'
import { noForwardProps } from '@/util/function/style'

import ColorButton from '../../share/ColorButton'
import EmptyItemSlot from './itemSlotComponent/EmptyItemSlot'
import ItemSlot from './itemSlotComponent/ItemSlot'

const MainContainer = styled(Box)`
  width: 100%;
  min-width: 600px;
`

const InventoryContainer = styled(Box)`
  display: flex;
  width: 100%;

  border-radius: 20px;

  background-color: ${props => props.theme.palette.background.paper};
`

const InventorySlotWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 80%;

  padding: 10px 60px 10px 40px;
`

const InventorySlotContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`

const InventorySlotControls = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  gap: 6px;

  width: 100%;

  margin-top: 10px;
`

const PageButton = styled(ColorButton, noForwardProps)<PageButtonProps>`
  min-width: 40px;
  height: 36px;

  background-color: ${props => props.__Active && props.theme.palette.custom.active};
`

const InventorySlot = () => {
  const {
    inventoryItem,
    draggedItem,
    draggedIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDropEmpty,
    handleDropItem,
    handleRightClick
  } = useInventoryContext()

  const [currentPage, setCurrentPage] = useState(0)

  const [itemsPerPage, setItemsPerPage] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateItemsPerPage = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const itemsPerPage = Math.floor((containerWidth - 100) / 60) * 4

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
    if (itemsPerPage === 0) return 0

    return Math.ceil(inventoryItem.length / itemsPerPage)
  }, [inventoryItem.length, itemsPerPage])

  const getGlobalIndex = useCallback(
    (localIndex: number) => {
      return currentPage * itemsPerPage + localIndex
    },
    [currentPage, itemsPerPage]
  )

  return (
    <MainContainer>
      <InventoryContainer>
        <InventorySlotWrapper ref={containerRef}>
          <Box sx={{ minHeight: '240px' }}>
            <InventorySlotContainer>
              {RA.mapIndexed((item, index) => {
                const globalIndex = getGlobalIndex(index)

                if (R.isNil(item)) {
                  return (
                    <EmptyItemSlot
                      key={`empty-${globalIndex}`}
                      index={globalIndex}
                      slotType={InventoryItemType.Inventory}
                      handleDragOver={handleDragOver}
                      handleDragEnd={handleDragEnd}
                      handleDragDrop={handleDropEmpty}
                      handleRightClick={handleRightClick}
                    />
                  )
                }

                return (
                  <ItemSlot
                    key={`item-${globalIndex}`}
                    index={globalIndex}
                    slotType={InventoryItemType.Inventory}
                    item={item}
                    draggedItem={draggedItem}
                    draggedIndex={draggedIndex}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDragEnd={handleDragEnd}
                    handleDragDrop={handleDropItem}
                    handleRightClick={handleRightClick}
                  />
                )
              }, currentPageItems)}
            </InventorySlotContainer>
          </Box>

          <InventorySlotControls>
            {R.range(0, totalPages).map(page => {
              const isCurrentPage = page === currentPage

              return (
                <PageButton
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  __Active={isCurrentPage}
                >
                  {page + 1}
                </PageButton>
              )
            })}
          </InventorySlotControls>
        </InventorySlotWrapper>
      </InventoryContainer>
    </MainContainer>
  )
}

type PageButtonProps = {
  __Active?: boolean
}

export default InventorySlot
