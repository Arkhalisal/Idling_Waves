'use client'

import { ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import AdventureMapProvider from '@/components/context/AdventureMapContext'
import AlertPopupProvider from '@/components/context/componentContext/AlertPopupContext'
import PopupProvider from '@/components/context/componentContext/PopupContext'
import EnergyCondenserProvider from '@/components/context/EnergyCondenserContext'
import EnergyProvider from '@/components/context/EnergyContext'
import GameLoopProvider from '@/components/context/GameLoopContext'
import NavbarProvider from '@/components/context/NavbarContext'
import SaveLoadProvider from '@/components/context/SaveLoadContext'
import TethysUpgradeProvider from '@/components/context/TethysUpgradeContext'
import theme from '@/styles/muiTheme'

const Providers = ({ children }: ProvidersProps) => {
  return (
    <BaseProvider>
      <GenericProvider>
        <FunctionalProvider>
          <NavbarProvider>
            <SaveLoadProvider>
              <GameLoopProvider>{children}</GameLoopProvider>
            </SaveLoadProvider>
          </NavbarProvider>
        </FunctionalProvider>
      </GenericProvider>
    </BaseProvider>
  )
}

const FunctionalProvider = ({ children }: ProvidersProps) => {
  return (
    <TethysUpgradeProvider>
      <EnergyCondenserProvider>
        <AdventureMapProvider>{children}</AdventureMapProvider>
      </EnergyCondenserProvider>
    </TethysUpgradeProvider>
  )
}

const GenericProvider = ({ children }: ProvidersProps) => {
  return <EnergyProvider>{children}</EnergyProvider>
}

const BaseProvider = ({ children }: ProvidersProps) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <PopupProvider>
          <AlertPopupProvider>{children}</AlertPopupProvider>
        </PopupProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

type ProvidersProps = {
  children: React.ReactNode
}

export default Providers
