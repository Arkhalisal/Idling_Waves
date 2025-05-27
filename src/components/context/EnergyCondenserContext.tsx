'use client'

import Decimal from 'break_infinity.js'
import { useCallback, useEffect, useState } from 'react'

import { EnergyCondenser, initialEnergyCondensers } from '@/constants/energyCondenser'
import { createStrictContext } from '@/util/context/createStrictContext'
import { reminder } from '@/util/function/math'

import { useEnergyContext } from './EnergyContext'

const [ContextProvider, useEnergyCondenserContext] =
  createStrictContext<EnergyContextType>('EnergyCondenser')

export { useEnergyCondenserContext }

const EnergyCondenserProvider = ({ children }: EnergyProviderProps) => {
  const { energy, setEnergy } = useEnergyContext()

  const [energyCondensers, setEnergyCondensers] =
    useState<EnergyCondenser[]>(initialEnergyCondensers)

  // Pending values to handle energy and cost accumulation
  // ? These are used to ensure that set energy updates are applied without setting energy on render
  const [pendingEnergy, setPendingEnergy] = useState<Decimal>(new Decimal(0))
  const [pendingCost, setPendingCost] = useState<Decimal>(new Decimal(0))

  const energyCondenserLoop = useCallback((producionRate: number) => {
    setEnergyCondensers(prev => {
      const newEnergyCondensers = [...prev]
      let totalProduction = new Decimal(0)

      for (let i = newEnergyCondensers.length - 1; i >= 0; i--) {
        const condenser = newEnergyCondensers[i]
        const finalProduction = condenser.amount
          .times(condenser.production)
          .times(condenser.multiplier)
          .dividedBy(producionRate)

        if (i === 0) {
          totalProduction = totalProduction.plus(finalProduction)
        } else {
          newEnergyCondensers[i - 1].amount =
            newEnergyCondensers[i - 1].amount.plus(finalProduction)
        }
      }

      setPendingEnergy(prev => prev.plus(totalProduction))
      return newEnergyCondensers
    })
  }, [])

  const buyEnergyCondenser = useCallback(
    (index: number, buyAmount: Decimal, noAdd = false) => {
      setEnergyCondensers(prev => {
        const newEnergyCondensers = [...prev]
        const condenser = newEnergyCondensers[index]

        if (energy.gte(condenser.cost.times(buyAmount))) {
          if (!noAdd) {
            setPendingEnergy(prevEnergy => prevEnergy.plus(condenser.production.times(buyAmount)))
          }
          condenser.amount = condenser.amount.plus(buyAmount)
          condenser.purchased = condenser.purchased.plus(buyAmount)

          if (reminder(condenser.purchased).eq(0)) {
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

  const buyMaxEnergyCondenser = useCallback(() => {
    let totalCost = new Decimal(0)

    for (let i = 0; i < energyCondensers.length; i++) {
      if (!energyCondensers[i].unlocked) continue

      const condenser = energyCondensers[i]
      const canBuy = energy.gte(condenser.cost.times(10))
      const buyAmount = new Decimal(10).minus(reminder(condenser.purchased))

      if (energy.gte(condenser.cost.times(buyAmount).plus(totalCost)) && canBuy) {
        totalCost = totalCost.plus(condenser.cost.times(buyAmount))
        buyEnergyCondenser(i, buyAmount, true)
      }
    }

    if (totalCost.gt(0)) {
      setPendingCost(prevCost => prevCost.plus(totalCost))
    }
  }, [buyEnergyCondenser, energy, energyCondensers])

  useEffect(() => {
    if (pendingEnergy.gt(0)) {
      setEnergy(prevEnergy => prevEnergy.plus(pendingEnergy))
      setPendingEnergy(new Decimal(0))
    }

    if (pendingCost.gt(0)) {
      setEnergy(prevEnergy => prevEnergy.minus(pendingCost))
      setPendingCost(new Decimal(0))
    }
  }, [pendingEnergy, pendingCost, setEnergy])

  return (
    <ContextProvider
      value={{
        energyCondensers,
        setEnergyCondensers,
        buyEnergyCondenser,
        buyMaxEnergyCondenser,
        energyCondenserLoop
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
  energyCondensers: EnergyCondenser[]
  setEnergyCondensers: React.Dispatch<React.SetStateAction<EnergyCondenser[]>>
  buyEnergyCondenser: (index: number, buyAmount: Decimal) => void
  buyMaxEnergyCondenser: () => void
  energyCondenserLoop: (producionRate: number) => void
}

export default EnergyCondenserProvider
