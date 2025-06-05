'use client'

import Decimal from 'break_infinity.js'
import { useState } from 'react'

import { DEFAULT_ENERGY, DEFAULT_MAX_ENERGY } from '@/constants/defaultSetting'
import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useEnergyContext] = createStrictContext<EnergyContextType>('Energy')

export { useEnergyContext }

const EnergyProvider = ({ children }: EnergyProviderProps) => {
  const [energy, setEnergy] = useState<Decimal>(new Decimal(DEFAULT_ENERGY))

  const [maxEnergy, setMaxEnergy] = useState<Decimal>(new Decimal(DEFAULT_MAX_ENERGY))

  const [totalGeneratedEnergy, setTotalGeneratedEnergy] = useState<Decimal>(
    new Decimal(DEFAULT_ENERGY)
  )

  return (
    <ContextProvider
      value={{
        energy,
        maxEnergy,
        totalGeneratedEnergy,
        setEnergy,
        setMaxEnergy,
        setTotalGeneratedEnergy
      }}
    >
      {children}
    </ContextProvider>
  )
}

type EnergyContextType = {
  energy: Decimal
  maxEnergy: Decimal
  totalGeneratedEnergy: Decimal
  setEnergy: React.Dispatch<React.SetStateAction<Decimal>>
  setMaxEnergy: React.Dispatch<React.SetStateAction<Decimal>>
  setTotalGeneratedEnergy: React.Dispatch<React.SetStateAction<Decimal>>
}

type EnergyProviderProps = {
  children: React.ReactNode
}

export default EnergyProvider
