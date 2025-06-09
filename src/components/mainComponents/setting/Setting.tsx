import { Box, styled } from '@mui/material'

import { useSaveLoadContext } from '@/components/context/SaveLoadContext'
import { useThemeSettingContext } from '@/components/context/ThemeSettingContext'
import { ThemeType } from '@/constants/theme'

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

  const { theme, handleThemeChange } = useThemeSettingContext()

  const changeTheme = () => {
    if (theme.palette.mode === ThemeType.LIGHT) {
      handleThemeChange(ThemeType.DARK)
    } else {
      handleThemeChange(ThemeType.LIGHT)
    }
  }

  return (
    <MainContainer>
      <SectionTitle title='Settings' />
      <ButtonContainer>
        <StyledButton onClick={() => saveGame()}>Save Game</StyledButton>
        <LoadGameButton />
        <StyledButton onClick={() => resetGame()}>Reset Game</StyledButton>
        <StyledButton onClick={changeTheme}>
          Change Theme ({theme.palette.mode === ThemeType.LIGHT ? 'Light' : 'Dark'})
        </StyledButton>
      </ButtonContainer>
    </MainContainer>
  )
}

export default Setting
