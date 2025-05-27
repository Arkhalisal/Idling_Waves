'use client'

import { Box, Button, styled, Typography } from '@mui/material'
import Decimal from 'break_infinity.js'
import * as RA from 'ramda-adjunct'
import { useCallback, useState } from 'react'

import { EnergyCondenser } from '@/constants/energyCondenser'
import { reminder } from '@/util/function/math'

import { useEnergyCondenserContext } from '../context/EnergyCondenserContext'
import { useEnergyContext } from '../context/EnergyContext'
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
  margin-bottom: 20px;
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

const EnergyCondenserUpgrade = styled(Button)``

const Text = styled(Typography)``

const TethysSystem = () => {
  const { energy } = useEnergyContext()

  const { energyCondensers, buyEnergyCondenser, buyMaxEnergyCondenser } =
    useEnergyCondenserContext()

  const [buy10, setBuy10] = useState(false)

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
        return cost.mul(buyAmount).toFixed(0)
      }

      return cost.toFixed(0)
    },
    [buy10]
  )

  return (
    <MainContainer>
      <SectionTitle title='Tethys System' />

      <CurrentEnergy>
        Energy: {energy.gt(1000000000) ? energy.toExponential(1) : energy.toFixed(1)}
      </CurrentEnergy>

      <ButtonContainer>
        <ColorButton onClick={handleBuy10Toggle}>Buy {buy10 ? '10' : '1'}</ColorButton>
        <ColorButton onClick={buyMaxEnergyCondenser}>Max</ColorButton>
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
                  <Text>x{item.multiplier.toFixed(0)}</Text>
                </EnergyCondenserTitle>

                <EnergyCondenserAmount>Amount: {item.amount.toFixed(0)}</EnergyCondenserAmount>
              </EnergyLeftContainer>

              <EnergyRightContainer>
                <EnergyCondenserUpgrade
                  onClick={() => buyEnergyCondenser(index, buyAmount)}
                  disabled={energy.lt(item.cost.times(buyAmount))}
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
