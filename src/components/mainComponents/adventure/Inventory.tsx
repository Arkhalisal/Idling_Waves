import { Box, styled } from '@mui/material'

import SectionTitle from '../share/SectionTitle'
import InventorySlot from './InventoryComponents/InventorySlot'

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Inventory = () => {
  return (
    <MainContainer>
      <SectionTitle title='Inventory' />

      <InventorySlot />
    </MainContainer>
  )
}

export default Inventory
