import { Box, styled } from '@mui/material'

import { NavbarId } from '@/constants/navbar'

import NormalAchievement from './Achievements/NormalAchievement'
import InfinityDimensions from './blackShore/InfinityDimensions'
import TethysSystem from './blackShore/TethysSystem'
import { useNavbarContext } from './context/NavbarContext'

const MainContainer = styled(Box)`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
`

const RenderPage = () => {
  const { CurrentSecondNavbar } = useNavbarContext()

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
