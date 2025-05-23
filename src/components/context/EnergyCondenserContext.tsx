'use client'

import Decimal from 'break_infinity.js'
import { useCallback, useEffect, useState } from 'react'

import { DEFAULT_TICK_SPEED, DEFAULT_TICK_SPEED_MS } from '@/constants/defaultSetting'
import { EnergyCondenser, initialEnergyCondensers } from '@/constants/energyCondenser'
import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useEnergyCondenserContext] =
  createStrictContext<EnergyContextType>('EnergyCondenser')

export { useEnergyCondenserContext }

const EnergyCondenserProvider = ({ children }: EnergyProviderProps) => {
  const [energy, setEnergy] = useState<Decimal>(new Decimal(10))
  const [energyCondensers, setEnergyCondensers] =
    useState<EnergyCondenser[]>(initialEnergyCondensers)

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setEnergyCondensers(prev => {
        const newEnergyCondensers = [...prev]
        for (let i = newEnergyCondensers.length - 1; i >= 0; i--) {
          const condenser = newEnergyCondensers[i]
          const finalProduction = condenser.amount
            .times(condenser.production)
            .times(condenser.multiplier)
            .dividedBy(DEFAULT_TICK_SPEED_MS)
          if (i === 0) {
            setEnergy(prevEnergy => prevEnergy.plus(finalProduction))
          } else {
            newEnergyCondensers[i - 1].amount =
              newEnergyCondensers[i - 1].amount.plus(finalProduction)
          }
        }
        return newEnergyCondensers
      })
    }, DEFAULT_TICK_SPEED)

    return () => clearInterval(gameLoop)
  }, [])

  const buyEnergyCondenser = useCallback(
    (index: number) => {
      setEnergyCondensers(prev => {
        const newEnergyCondensers = [...prev]
        const condenser = newEnergyCondensers[index]

        if (energy.gte(condenser.cost)) {
          setEnergy(prevEnergy => prevEnergy.minus(condenser.cost))
          condenser.amount = condenser.amount.plus(1)
          condenser.purchased += 1

          if (condenser.purchased % 10 === 0) {
            condenser.cost = condenser.cost.times(condenser.costMultiplier)
            condenser.multiplier = condenser.multiplier.times(2)
          }

          return newEnergyCondensers
        }

        return newEnergyCondensers
      })
    },
    [energy]
  )

  const buy10EnergyCondenser = useCallback(
    (index: number) => {
      setEnergyCondensers(prev => {
        const newEnergyCondensers = [...prev]
        const condenser = newEnergyCondensers[index]
        const totalBuyAmount = condenser.purchased % 10
        const totalCost = new Decimal(totalBuyAmount).times(condenser.cost)

        if (energy.gte(totalCost)) {
          setEnergy(prevEnergy => prevEnergy.minus(totalCost))
          condenser.amount = condenser.amount.plus(10)
          condenser.purchased += 10

          return newEnergyCondensers
        }
        return newEnergyCondensers
      })
    },
    [energy]
  )

  return (
    <ContextProvider
      value={{
        energy,
        energyCondensers,
        buyEnergyCondenser,
        buy10EnergyCondenser
      }}
    >
      {children}
    </ContextProvider>
  )
}

type EnergyProviderProps = {
  children: React.ReactNode
}

type EnergyContextType = {
  energy: Decimal
  energyCondensers: EnergyCondenser[]
  buyEnergyCondenser: (index: number) => void
  buy10EnergyCondenser: (index: number) => void
}

export default EnergyCondenserProvider
