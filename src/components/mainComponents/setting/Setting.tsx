import { Box, styled } from '@mui/material'

import { useSaveLoadContext } from '@/components/context/SaveLoadContext'

import ColorButton from '../share/ColorButton'
import SectionTitle from '../share/SectionTitle'
import LoadGameButton from './popup/LoadGame'

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

const StyledButton = styled(ColorButton)``

const Setting = () => {
  const { saveGame, resetGame } = useSaveLoadContext()

  return (
    <MainContainer>
      <SectionTitle title='Settings' />
      <ButtonContainer>
        <StyledButton onClick={() => saveGame()}>Save Game</StyledButton>
        <LoadGameButton />
        <StyledButton onClick={() => resetGame()}>Reset Game</StyledButton>
      </ButtonContainer>
    </MainContainer>
  )
}

export default Setting
