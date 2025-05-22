'use client'

import { Box, styled } from '@mui/material'
import * as R from 'ramda'
import { useEffect } from 'react'

import RenderPage from '@/components/RenderPage'
import MainNavbar from '@/layout/Navbar/MainNavbar'
import { roboto } from '@/styles/font'

const MainContainer = styled(Box)`
  display: flex;
`

export default function Home() {
  useEffect(() => {
    const body = document.querySelector('body')

    if (R.isNotNil(body)) {
      body.classList.add(roboto.className)
      body.classList.add(roboto.variable)
    }
  }, [])

  return (
    <MainContainer>
      <MainNavbar />
      <RenderPage />
    </MainContainer>
  )
}
