import { useState } from 'react'

import { EnergyCondenser } from '@/constants/energy'
import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useEnergyCondenserContext] =
  createStrictContext<EnergyContextType>('EnergyCondenser')

export { useEnergyCondenserContext }

const EnergyCondenserProvider = ({ children }: EnergyProviderProps) => {
  const [energyCondensers, setEnergyCondensers] = useState<
    EnergyCondenserType[]
  >([
    { name: EnergyCondenser.ONE, amount: 0, purchase: 0 },
    { name: EnergyCondenser.TWO, amount: 0, purchase: 0 },
    { name: EnergyCondenser.THREE, amount: 0, purchase: 0 },
    { name: EnergyCondenser.FOUR, amount: 0, purchase: 0 }
  ])

  const buyEnergyCondenser = (name: EnergyCondenser) => {
    setEnergyCondensers(prevState =>
      prevState.map(item => {
        if (item.name === name) {
          return {
            ...item,
            purchase: item.purchase + 1,
            amount: item.amount + 1
          }
        }
        return item
      })
    )
  }

  const buy10EnergyCondenser = (name: EnergyCondenser) => {
    setEnergyCondensers(prevState =>
      prevState.map(item => {
        if (item.name === name) {
          return {
            ...item,
            purchase: item.purchase + 10,
            amount: item.amount + 10
          }
        }
        return item
      })
    )
  }

  return (
    <ContextProvider
      value={{ energyCondensers, buyEnergyCondenser, buy10EnergyCondenser }}
    >
      {children}
    </ContextProvider>
  )
}

type EnergyProviderProps = {
  children: React.ReactNode
}

type EnergyCondenserType = {
  name: EnergyCondenser
  amount: number
  purchase: number
}

type EnergyContextType = {
  energyCondensers: EnergyCondenserType[]
  buyEnergyCondenser: (name: EnergyCondenser) => void
  buy10EnergyCondenser: (name: EnergyCondenser) => void
}

export default EnergyCondenserProvider
