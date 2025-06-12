import { Box, styled, Typography } from '@mui/material'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

import { useInventoryContext } from '@/components/context/InventoryContext'
import { InventoryItemType } from '@/types/inventory'

import EmptyItemSlot from './itemSlotComponent/EmptyItemSlot'
import ItemSlot from './itemSlotComponent/ItemSlot'

const MainContainer = styled(Box)`
  width: 100%;
  height: auto;
  padding: 20px 10px;

  border-radius: 20px;

  background-color: ${props => props.theme.palette.background.paper};

  display: flex;
  justify-content: center;
`

const MiddleSection = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 400px;

  position: relative;
`

const WeaponSection = styled(Box)``

const ArmorSection = styled(Box)``

const EchoesSection = styled(Box)`
  display: flex;
  flex-direction: column;
`

const EchoesTitle = styled(Typography)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const StyledEmptyItemSlot = styled(EmptyItemSlot)<{ __left: number; __margin?: number }>`
  position: relative;

  left: ${props => props.__left}px;
  margin: ${props => props.__margin}px 0px;
`

const EquipmentSlot = () => {
  const {
    weapon,
    armors,
    echoes,
    draggedIndex,
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDropEmpty,
    handleDropItem,
    handleRightClick
  } = useInventoryContext()

  return (
    <MainContainer>
      <MiddleSection>
        <WeaponSection>
          {R.isNil(weapon) ? (
            <EmptyItemSlot
              index={0}
              slotType={InventoryItemType.Weapon}
              handleDragOver={handleDragOver}
              handleDragEnd={handleDragEnd}
              handleDragDrop={handleDropEmpty}
              handleRightClick={handleRightClick}
            />
          ) : (
            <ItemSlot
              index={0}
              item={weapon}
              slotType={InventoryItemType.Weapon}
              draggedItem={draggedItem}
              draggedIndex={draggedIndex}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDragEnd={handleDragEnd}
              handleDragDrop={handleDropItem}
              handleRightClick={handleRightClick}
            />
          )}
        </WeaponSection>

        <ArmorSection>
          {RA.mapIndexed((armor, index) => {
            if (R.isNil(armor.item)) {
              return (
                <EmptyItemSlot
                  key={index}
                  index={index}
                  slotType={armor.type}
                  handleDragOver={handleDragOver}
                  handleDragEnd={handleDragEnd}
                  handleDragDrop={handleDropEmpty}
                  handleRightClick={handleRightClick}
                />
              )
            }

            return (
              <ItemSlot
                key={index}
                index={index}
                item={armor.item}
                slotType={armor.type}
                draggedItem={draggedItem}
                draggedIndex={draggedIndex}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDragEnd={handleDragEnd}
                handleDragDrop={handleDropItem}
                handleRightClick={handleRightClick}
              />
            )
          }, armors)}
        </ArmorSection>

        <EchoesSection>
          <EchoesTitle>Echoes</EchoesTitle>
          {RA.mapIndexed((echo, index) => {
            const left = index === 2 ? 120 : index === 1 || index === 3 ? 75 : 0

            if (R.isNil(echo)) {
              return (
                <StyledEmptyItemSlot
                  key={index}
                  index={index}
                  slotType={InventoryItemType.Echoes}
                  handleDragOver={handleDragOver}
                  handleDragEnd={handleDragEnd}
                  handleDragDrop={handleDropEmpty}
                  handleRightClick={handleRightClick}
                  __left={left}
                  __margin={index === 2 ? 20 : 0}
                />
              )
            }

            return (
              <ItemSlot
                key={index}
                index={index}
                item={echo}
                slotType={InventoryItemType.Echoes}
                draggedItem={draggedItem}
                draggedIndex={draggedIndex}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDragEnd={handleDragEnd}
                handleDragDrop={handleDropItem}
                handleRightClick={handleRightClick}
              />
            )
          }, echoes)}
        </EchoesSection>
      </MiddleSection>
    </MainContainer>
  )
}

export default EquipmentSlot
