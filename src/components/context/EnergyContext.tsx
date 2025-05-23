'use client'

import Decimal from 'break_infinity.js'
import { useState } from 'react'

import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useEnergyContext] = createStrictContext<EnergyContextType>('Energy')

export { useEnergyContext }

const EnergyProvider = ({ children }: EnergyProviderProps) => {
  const [energy, setEnergy] = useState<Decimal>(new Decimal(10))

  return <ContextProvider value={{ energy, setEnergy }}>{children}</ContextProvider>
}

type EnergyContextType = {
  energy: Decimal
  setEnergy: React.Dispatch<React.SetStateAction<Decimal>>
}

type EnergyProviderProps = {
  children: React.ReactNode
}

export default EnergyProvider
