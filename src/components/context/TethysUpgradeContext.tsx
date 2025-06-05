import { useState } from 'react'

import { initialTethysUpgrade } from '@/constants/blackShore/tethysUpgrade'
import { TethysUpgradeId, TethysUpgradeType } from '@/types/blackShore/tethysUpgrade'
import { createStrictContext } from '@/util/context/createStrictContext'

import { useEnergyContext } from './EnergyContext'

const [ContextProvider, useTethysUpgradeContext] =
  createStrictContext<TethysUpgradeContextType>('TethysUpgrade')

export { useTethysUpgradeContext }

const TethysUpgradeProvider = ({ children }: TethysUpgradeProviderProps) => {
  const { energy, setEnergy } = useEnergyContext()

  const [tethysUpgrade, setTethysUpgrade] = useState(initialTethysUpgrade)

  const unlockTethysUpgrade = (id: TethysUpgradeId) => {
    const upgrade = tethysUpgrade.find(upgrade => upgrade.id === id)
    if (upgrade) {
      if (energy.gte(upgrade.cost)) {
        setEnergy(prevEnergy => prevEnergy.minus(upgrade.cost))
        setTethysUpgrade(prev =>
          prev.map(upgrade => (upgrade.id === id ? { ...upgrade, unlocked: true } : upgrade))
        )
      }
    }
  }

  return (
    <ContextProvider value={{ tethysUpgrade, setTethysUpgrade, unlockTethysUpgrade }}>
      {children}
    </ContextProvider>
  )
}

type TethysUpgradeContextType = {
  tethysUpgrade: TethysUpgradeType[]
  setTethysUpgrade: React.Dispatch<React.SetStateAction<TethysUpgradeType[]>>
  unlockTethysUpgrade: (id: number) => void
}

type TethysUpgradeProviderProps = {
  children: React.ReactNode
}

export default TethysUpgradeProvider
