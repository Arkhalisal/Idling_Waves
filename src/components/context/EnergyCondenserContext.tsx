'use client'

import Decimal from 'break_infinity.js'
import { useCallback, useMemo, useState } from 'react'

import { initialEnergyCondensers } from '@/constants/blackShore/energyCondenser'
import { EnergyCondenser, EnergyCondenserId } from '@/types/blackShore/energyCondenser'
import { TethysUpgradeId } from '@/types/blackShore/tethysUpgrade'
import { createStrictContext } from '@/util/context/createStrictContext'
import { reminder } from '@/util/function/math'

import { useEnergyContext } from './EnergyContext'
import { useTethysUpgradeContext } from './TethysUpgradeContext'

const [ContextProvider, useEnergyCondenserContext] =
  createStrictContext<EnergyContextType>('EnergyCondenser')

export { useEnergyCondenserContext }

const EnergyCondenserProvider = ({ children }: EnergyProviderProps) => {
  const { energy, maxEnergy, setEnergy, setTotalGeneratedEnergy } = useEnergyContext()

  const { tethysUpgrade } = useTethysUpgradeContext()

  const [energyCondensers, setEnergyCondensers] =
    useState<EnergyCondenser[]>(initialEnergyCondensers)

  const calculateTotalMult = useCallback(
    (condenser: EnergyCondenser) => {
      let extraMultiplier = new Decimal(1)

      if (condenser.id === EnergyCondenserId.CONDENSER_1) {
        const tethysUpgrade1 = tethysUpgrade.find(
          upgrade => upgrade.id === TethysUpgradeId.EnergyEfficiency1
        )

        if (tethysUpgrade1?.unlocked) {
          extraMultiplier = extraMultiplier.times(1.5)
        }
      }

      return condenser.purchasedMultiplier.times(extraMultiplier)
    },
    [tethysUpgrade]
  )

  const calculateProduction = useCallback(
    (condenser: EnergyCondenser) => {
      return condenser.production.times(condenser.amount.times(calculateTotalMult(condenser)))
    },
    [calculateTotalMult]
  )

  const energyPerSecond = useMemo(() => {
    return calculateProduction(energyCondensers[0])
  }, [calculateProduction, energyCondensers])

  const energyCondenserLoop = useCallback(
    (producionRate: number) => {
      setEnergyCondensers(prev => {
        const newEnergyCondensers = [...prev]

        for (let i = newEnergyCondensers.length - 1; i >= 0; i--) {
          const condenser = newEnergyCondensers[i]
          condenser.totalMultiplier = calculateTotalMult(condenser)
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
    [
      calculateProduction,
      calculateTotalMult,
      energy,
      energyPerSecond,
      maxEnergy,
      setEnergy,
      setTotalGeneratedEnergy
    ]
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

      if (energy.gte(totalCost)) {
        setEnergy(prevEnergy => prevEnergy.minus(totalCost))

        setEnergyCondensers(prev => {
          const newEnergyCondensers = [...prev]
          const newCondenser = newEnergyCondensers[index]
          const pow = condenser.purchased.add(buyAmount).divideBy(10).floor()

          newCondenser.amount = newCondenser.amount.plus(buyAmount)
          newCondenser.purchased = newCondenser.purchased.plus(buyAmount)
          newCondenser.cost = newCondenser.baseCost.times(newCondenser.costMultiplier.pow(pow))
          newCondenser.purchasedMultiplier = new Decimal(2).pow(pow)

          return newEnergyCondensers
        })
      }
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
