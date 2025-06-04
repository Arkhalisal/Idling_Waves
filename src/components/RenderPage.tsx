'use client'

import { Box, styled } from '@mui/material'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { NavbarId } from '@/constants/navbar'

import { useNavbarContext } from './context/NavbarContext'
import { useSaveLoadContext } from './context/SaveLoadContext'
import { NormalAchievement, Setting, TethysSystem } from './mainComponents'

const MainContainer = styled(Box)`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;

  margin-top: 20px;
  padding: 0 40px;

  position: relative;
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

  const AdventureMap = useMemo(() => {
    return dynamic(() => import('./mainComponents/adventure/AdventureMap'), {
      loading: () => <p>A map is loading</p>,
      ssr: false
    })
  }, [])

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
      case NavbarId.TethysUpgrade:
        return <></>
      case NavbarId.Adventure:
        return <AdventureMap />
      case NavbarId.Achievements:
        return <NormalAchievement />
      case NavbarId.Settings:
        return <Setting />
      default:
        return <></>
    }
  }

  return <MainContainer>{renderComponent()}</MainContainer>
}

export default RenderPage
