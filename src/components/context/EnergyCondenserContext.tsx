'use client'

import Decimal from 'break_infinity.js'
import { useCallback, useMemo, useState } from 'react'

import { EnergyCondenser, initialEnergyCondensers } from '@/constants/energyCondenser'
import { createStrictContext } from '@/util/context/createStrictContext'
import { reminder } from '@/util/function/math'

import { useEnergyContext } from './EnergyContext'

const [ContextProvider, useEnergyCondenserContext] =
  createStrictContext<EnergyContextType>('EnergyCondenser')

export { useEnergyCondenserContext }

const EnergyCondenserProvider = ({ children }: EnergyProviderProps) => {
  const { energy, maxEnergy, setEnergy, setTotalGeneratedEnergy } = useEnergyContext()

  const [energyCondensers, setEnergyCondensers] =
    useState<EnergyCondenser[]>(initialEnergyCondensers)

  const calculateProduction = useCallback((condenser: EnergyCondenser) => {
    return condenser.amount.times(condenser.production).times(condenser.multiplier)
  }, [])

  const energyPerSecond = useMemo(() => {
    return calculateProduction(energyCondensers[0])
  }, [calculateProduction, energyCondensers])

  const energyCondenserLoop = useCallback(
    (producionRate: number) => {
      setEnergyCondensers(prev => {
        const newEnergyCondensers = [...prev]

        for (let i = newEnergyCondensers.length - 1; i >= 0; i--) {
          const condenser = newEnergyCondensers[i]
          const finalProduction = calculateProduction(condenser).dividedBy(producionRate)

          if (i !== 0) {
            newEnergyCondensers[i - 1].amount =
              newEnergyCondensers[i - 1].amount.plus(finalProduction)
          }
        }

        return newEnergyCondensers
      })

      const energyProduction = energyPerSecond.dividedBy(producionRate)

      const totalEnergy = energy.plus(energyProduction)

      if (totalEnergy.gt(maxEnergy)) {
        if (energy.eq(maxEnergy)) {
          // If we already have max energy, just return
          return
        }

        if (energy.gt(maxEnergy)) {
          setEnergy(maxEnergy)
          return
        }

        setEnergy(maxEnergy)
        setTotalGeneratedEnergy(prev => prev.plus(maxEnergy.minus(energy)))
        return
      }

      setEnergy(prev => prev.plus(energyProduction))
      setTotalGeneratedEnergy(prev => prev.plus(energyProduction))
    },
    [calculateProduction, energy, energyPerSecond, maxEnergy, setEnergy, setTotalGeneratedEnergy]
  )

  const buyEnergyCondenser = useCallback(
    (index: number, buyAmount: Decimal) => {
      if (index < 0 || index >= energyCondensers.length || !energyCondensers[index].unlocked) {
        return
      }

      if (buyAmount.lte(0)) {
        return
      }

      const condenser = energyCondensers[index]
      const totalCost = condenser.cost.times(buyAmount)

      setEnergy(prevEnergy => prevEnergy.minus(totalCost))

      setEnergyCondensers(prev => {
        const newEnergyCondensers = [...prev]
        const newCondenser = newEnergyCondensers[index]

        if (energy.gte(totalCost)) {
          newCondenser.amount = newCondenser.amount.plus(buyAmount)
          newCondenser.purchased = newCondenser.purchased.plus(buyAmount)

          if (reminder(condenser.purchased).eq(0)) {
            newCondenser.cost = newCondenser.cost.times(newCondenser.costMultiplier)
            newCondenser.multiplier = newCondenser.multiplier.times(2)
          }

          return newEnergyCondensers
        }

        return newEnergyCondensers
      })
    },
    [energy, energyCondensers, setEnergy]
  )

  const buyMaxOneEnergyCondenser = useCallback(
    (index: number) => {
      if (index < 0 || index >= energyCondensers.length || !energyCondensers[index].unlocked) {
        return
      }

      const condenser = energyCondensers[index]
      let totalCost = new Decimal(0)
      let nextCost = condenser.cost

      const alreadyBought = reminder(condenser.purchased)

      if (alreadyBought.gt(0)) {
        totalCost = totalCost.plus(condenser.cost.times(new Decimal(10).minus(alreadyBought)))
        nextCost = nextCost.times(condenser.costMultiplier)
        buyEnergyCondenser(index, new Decimal(10).minus(alreadyBought))
      }

      while (energy.gte(totalCost.plus(condenser.cost.times(10)))) {
        totalCost = totalCost.plus(condenser.cost.times(10))
        nextCost = nextCost.times(condenser.costMultiplier)
        buyEnergyCondenser(index, new Decimal(10))
      }
    },
    [buyEnergyCondenser, energy, energyCondensers]
  )

  const buyMaxEnergyCondenser = useCallback(() => {
    let totalCost = new Decimal(0)

    for (let i = 0; i < energyCondensers.length; i++) {
      const condenser = energyCondensers[i]
      let nextCost = condenser.cost

      const alreadyBought = reminder(condenser.purchased)

      if (alreadyBought.gt(0)) {
        totalCost = totalCost.plus(condenser.cost.times(new Decimal(10).minus(alreadyBought)))
        nextCost = nextCost.times(condenser.costMultiplier)
        buyEnergyCondenser(i, new Decimal(10).minus(alreadyBought))
      }

      while (energy.gte(totalCost.plus(nextCost.times(10)))) {
        totalCost = totalCost.plus(condenser.cost.times(10))
        nextCost = nextCost.times(condenser.costMultiplier)
        buyEnergyCondenser(i, new Decimal(10))
      }
    }
  }, [buyEnergyCondenser, energy, energyCondensers])

  return (
    <ContextProvider
      value={{
        energyCondensers,
        energyPerSecond,
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
  energyPerSecond: Decimal
  setEnergyCondensers: React.Dispatch<React.SetStateAction<EnergyCondenser[]>>
  buyEnergyCondenser: (index: number, buyAmount: Decimal) => void
  buyMaxEnergyCondenser: () => void
  energyCondenserLoop: (producionRate: number) => void
}

export default EnergyCondenserProvider
