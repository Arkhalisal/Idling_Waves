import { Box, styled } from '@mui/material'

import { NavbarId } from '@/constants/navbar'

import NormalAchievement from './Achievements/NormalAchievement'
import InfinityDimensions from './blackShore/InfinityDimensions'
import TethysSystem from './blackShore/TethysSystem'
import { useNavbarContext } from './context/NavbarContext'
import { useSaveLoadContext } from './context/SaveLoadContext'

const MainContainer = styled(Box)`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;

  margin-top: 20px;
  padding: 0 40px;
`

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100vh;

  font-size: 50px;
  font-weight: 700;
  color: black;
`

const RenderPage = () => {
  const { CurrentSecondNavbar } = useNavbarContext()

  const { loaded } = useSaveLoadContext()

  // If the game is not loaded, we don't render anything
  if (!loaded) {
    return (
      <MainContainer>
        <LoadingContainer>Loading...</LoadingContainer>
      </MainContainer>
    )
  }

  const renderComponent = () => {
    switch (CurrentSecondNavbar) {
      case NavbarId.TethysSystem:
        return <TethysSystem />
      case NavbarId.Achievements:
        return <NormalAchievement />
      case NavbarId.InfinityDimensions:
        return <InfinityDimensions />
      default:
        return <></>
    }
  }

  return <MainContainer>{renderComponent()}</MainContainer>
}

export default RenderPage
