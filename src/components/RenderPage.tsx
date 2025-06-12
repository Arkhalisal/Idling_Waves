'use client'

import { Box, styled } from '@mui/material'
import dynamic from 'next/dynamic'
import { useEffect, useMemo } from 'react'

import { NavbarId } from '@/constants/navbar'

import { usePopupContext } from './context/componentContext/PopupContext'
import { useGameLoopContext } from './context/GameLoopContext'
import { useNavbarContext } from './context/NavbarContext'
import { NormalAchievement, Setting, TethysSystem, TethysUpgrade } from './mainComponents'
import Battle from './mainComponents/adventure/Battle'
import Inventory from './mainComponents/adventure/Inventory'
import Testing from './mainComponents/testing/Testing'

const MainContainer = styled(Box)`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;

  padding: 20px 40px;

  position: relative;

  overflow: auto;
`

const RenderPage = () => {
  const { currentSecondNavbar } = useNavbarContext()

  const { showPopups } = usePopupContext()

  const { offlineEnergy } = useGameLoopContext()

  useEffect(() => {
    if (offlineEnergy.gt(0)) {
      showPopups([
        {
          id: 'offline_1',
          title: 'Offline Gain',
          content: `You generated ${offlineEnergy.toString()} offline energy.`
        }
      ])
    }
  }, [offlineEnergy, showPopups])

  const AdventureMap = useMemo(() => {
    return dynamic(() => import('./mainComponents/adventure/AdventureMap'), {
      loading: () => <p>A map is loading</p>,
      ssr: false
    })
  }, [])

  const renderComponent = () => {
    switch (currentSecondNavbar) {
      case NavbarId.TethysSystem:
        return <TethysSystem />
      case NavbarId.TethysUpgrade:
        return <TethysUpgrade />
      case NavbarId.Adventure:
        return <AdventureMap />
      case NavbarId.Battle:
        return <Battle />
      case NavbarId.Inventory:
        return <Inventory />
      case NavbarId.Achievements:
        return <NormalAchievement />
      case NavbarId.Settings:
        return <Setting />
      case NavbarId.Testing:
        return <Testing />
      default:
        return <></>
    }
  }

  return <MainContainer>{renderComponent()}</MainContainer>
}

export default RenderPage
