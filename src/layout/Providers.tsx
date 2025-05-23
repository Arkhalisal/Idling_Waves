'use client'

import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import EnergyCondenserProvider from '@/components/context/EnergyCondenserContext'
import EnergyProvider from '@/components/context/EnergyContext'
import NavbarProvider from '@/components/context/NavbarContext'
import theme from '@/styles/muiTheme'

const Providers = ({ children }: ProvidersProps) => {
  return (
    <BaseProvider>
      <GenericProvider>
        <NavbarProvider>
          <EnergyCondenserProvider>{children}</EnergyCondenserProvider>
        </NavbarProvider>
      </GenericProvider>
    </BaseProvider>
  )
}

const GenericProvider = ({ children }: ProvidersProps) => {
  return <EnergyProvider>{children}</EnergyProvider>
}

const BaseProvider = ({ children }: ProvidersProps) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  )
}

type ProvidersProps = {
  children: React.ReactNode
}

export default Providers
