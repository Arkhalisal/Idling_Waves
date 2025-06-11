import { Box, styled } from '@mui/material'

const MainContainer = styled(Box)`
  width: 100%;
  height: 300px;

  border-radius: 20px;

  background-color: ${props => props.theme.palette.background.paper};
`

const EquipmentSlot = () => {
  return (
    <MainContainer>
      <></>
    </MainContainer>
  )
}

export default EquipmentSlot
