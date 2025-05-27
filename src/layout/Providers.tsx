'use client'

import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import EnergyCondenserProvider from '@/components/context/EnergyCondenserContext'
import EnergyProvider from '@/components/context/EnergyContext'
import GameLoopProvider from '@/components/context/GameLoopContext'
import NavbarProvider from '@/components/context/NavbarContext'
import SaveLoadProvider from '@/components/context/SaveLoadContext'
import theme from '@/styles/muiTheme'

const Providers = ({ children }: ProvidersProps) => {
  return (
    <BaseProvider>
      <GenericProvider>
        <NavbarProvider>
          <FunctionalProvider>
            <SaveLoadProvider>
              <GameLoopProvider>{children}</GameLoopProvider>
            </SaveLoadProvider>
          </FunctionalProvider>
        </NavbarProvider>
      </GenericProvider>
    </BaseProvider>
  )
}

const FunctionalProvider = ({ children }: ProvidersProps) => {
  return <EnergyCondenserProvider>{children}</EnergyCondenserProvider>
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
