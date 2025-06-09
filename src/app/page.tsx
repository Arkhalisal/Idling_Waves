'use client'

import { Box, styled } from '@mui/material'
import * as R from 'ramda'
import { useEffect } from 'react'

import { useSaveLoadContext } from '@/components/context/SaveLoadContext'
import { useThemeSettingContext } from '@/components/context/ThemeSettingContext'
import RenderPage from '@/components/RenderPage'
import MainNavbar from '@/layout/Navbar/MainNavbar'
import { roboto } from '@/styles/font'
import { noForwardProps } from '@/util/function/style'

const MainContainer = styled(Box, noForwardProps)<{ __backgroundColor: string }>`
  display: flex;

  height: 100vh;
  min-width: 100vw;

  background-color: ${props => props.__backgroundColor};

  transition: all 0.3s ease;
`

export default function Home() {
  const { theme } = useThemeSettingContext()

  const { loaded } = useSaveLoadContext()

  useEffect(() => {
    const body = document.querySelector('body')

    if (R.isNotNil(body)) {
      body.classList.add(roboto.className)
      body.classList.add(roboto.variable)
    }
  }, [])

  if (!loaded) {
    return <></>
  }

  return (
    <MainContainer __backgroundColor={theme.palette.background.default}>
      <MainNavbar />
      <RenderPage />
    </MainContainer>
  )
}
