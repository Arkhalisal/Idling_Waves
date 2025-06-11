import { Box, styled } from '@mui/material'

import SectionTitle from '../share/SectionTitle'
import EquipmentSlot from './InventoryComponents/EquipmentSlot'
import InventorySlot from './InventoryComponents/InventorySlot'

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;

  width: 100%;
`

const Inventory = () => {
  return (
    <MainContainer>
      <SectionTitle title='Inventory' />

      <EquipmentSlot />

      <InventorySlot />
    </MainContainer>
  )
}

export default Inventory
