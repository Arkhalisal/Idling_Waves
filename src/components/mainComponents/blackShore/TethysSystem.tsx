'use client'

import { Box, Button, styled, Typography } from '@mui/material'
import Decimal from 'break_infinity.js'
import * as RA from 'ramda-adjunct'
import { useCallback, useEffect, useState } from 'react'

import { EnergyCondenser } from '@/constants/energyCondenser'
import { formatDecimal } from '@/util/function/format'
import { reminder } from '@/util/function/math'

import { useEnergyCondenserContext } from '../../context/EnergyCondenserContext'
import { useEnergyContext } from '../../context/EnergyContext'
import ColorButton from '../share/ColorButton'
import SectionTitle from '../share/SectionTitle'

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`

const CurrentEnergy = styled(Typography)`
  font-size: 24px;
`

const EnergyPerSecond = styled(Typography)`
  font-size: 14px;
  padding: 6px;
`

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: space-between;

  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
`

const EnergyCondenserContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EnergyCondensers = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 700px;

  gap: 20px;
`

const EnergyLeftContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: auto;
`

const EnergyRightContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: auto;
`

const EnergyCondenserTitle = styled(Box)``

const EnergyCondenserAmount = styled(Typography)`
  margin-left: 50px;
`

const EnergyCondenserUpgrade = styled(Button)`
  text-transform: none;
`

const Text = styled(Typography)``

const TethysSystem = () => {
  const { energy, maxEnergy } = useEnergyContext()

  const { energyCondensers, energyPerSecond, buyEnergyCondenser, buyMaxEnergyCondenser } =
    useEnergyCondenserContext()

  const [buy10, setBuy10] = useState(true)

  const handleBuy10Toggle = useCallback(() => {
    setBuy10(prev => !prev)
  }, [])

  const handleBuyAmount = useCallback(
    (item: EnergyCondenser) => {
      if (buy10) {
        return new Decimal(10).minus(reminder(item.purchased))
      }

      return new Decimal(1)
    },
    [buy10]
  )

  const handleCost = useCallback(
    (cost: Decimal, buyAmount: Decimal) => {
      if (buy10) {
        return formatDecimal(cost.times(buyAmount), 0)
      }

      return formatDecimal(cost, 0)
    },
    [buy10]
  )

  const handleButtonDisabled = useCallback(
    (item: EnergyCondenser, buyAmount: Decimal) => {
      if (buy10) {
        return energy.lt(item.cost.times(buyAmount))
      }

      return energy.lt(item.cost)
    },
    [buy10, energy]
  )

  // Add keydown listener for "M" key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'm') {
        buyMaxEnergyCondenser()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [buyMaxEnergyCondenser])

  return (
    <MainContainer>
      <SectionTitle title='Tethys System' />

      <CurrentEnergy>
        Energy: {formatDecimal(energy)}/ {formatDecimal(maxEnergy)}
      </CurrentEnergy>

      <EnergyPerSecond>EPS: {formatDecimal(energyPerSecond)}</EnergyPerSecond>

      <ButtonContainer>
        <ColorButton onClick={handleBuy10Toggle}>Buy {buy10 ? '10' : '1'}</ColorButton>
        <ColorButton onClick={buyMaxEnergyCondenser}>Max {`(M)`}</ColorButton>
      </ButtonContainer>

      <EnergyCondenserContainer>
        {RA.mapIndexed((item, index) => {
          if (!item.unlocked) return null

          const buyAmount = handleBuyAmount(item)

          return (
            <EnergyCondensers key={item.name}>
              <EnergyLeftContainer>
                <EnergyCondenserTitle>
                  <Text>{item.name}</Text>
                  <Text>x{formatDecimal(item.multiplier)}</Text>
                </EnergyCondenserTitle>

                <EnergyCondenserAmount>Amount: {formatDecimal(item.amount)}</EnergyCondenserAmount>
              </EnergyLeftContainer>

              <EnergyRightContainer>
                <EnergyCondenserUpgrade
                  onClick={() => buyEnergyCondenser(index, buyAmount)}
                  disabled={handleButtonDisabled(item, buyAmount)}
                >
                  {`Buy ${buyAmount} Cost: ${handleCost(item.cost, buyAmount)}`}
                </EnergyCondenserUpgrade>
              </EnergyRightContainer>
            </EnergyCondensers>
          )
        }, energyCondensers)}
      </EnergyCondenserContainer>
    </MainContainer>
  )
}

export default TethysSystem
