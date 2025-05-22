'use client'

import { ThemeProvider } from '@mui/material'

import EnergyCondenserProvider from '@/components/context/EnergyCondenserContext'
import NavbarProvider from '@/components/context/NavbarContext'
import theme from '@/styles/muiTheme'

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarProvider>
        <EnergyCondenserProvider>{children}</EnergyCondenserProvider>
      </NavbarProvider>
    </ThemeProvider>
  )
}

type ProvidersProps = {
  children: React.ReactNode
}

export default Providers
