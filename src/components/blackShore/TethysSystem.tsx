'use client'

import { Box, Button, styled, Typography } from '@mui/material'
import * as RA from 'ramda-adjunct'

import { useEnergyCondenserContext } from '../context/EnergyCondenserContext'

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`

const SectionTitle = styled(Typography)`
  font-size: 32px;
  text-align: center;
`

const CurrentEnergy = styled(Typography)`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`

const EnergyCondenserContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`

const EnergyCondensers = styled(Box)`
  display: flex;
  align-items: center;

  gap: 20px;
`

const EnergyCondenserTitle = styled(Typography)``

const EnergyCondenserAmount = styled(Typography)``

const EnergyCondenserUpgrade = styled(Button)``

const TethysSystem = () => {
  const { energy, energyCondensers, buyEnergyCondenser } = useEnergyCondenserContext()

  return (
    <MainContainer>
      <SectionTitle>Tethys System</SectionTitle>

      <CurrentEnergy>{energy.toFixed(1)}</CurrentEnergy>

      <EnergyCondenserContainer>
        {RA.mapIndexed((item, index) => {
          if (!item.unlocked) return null

          return (
            <EnergyCondensers key={item.name}>
              <EnergyCondenserTitle>{item.name}</EnergyCondenserTitle>
              <EnergyCondenserAmount>mult: {item.multiplier.toFixed(0)}</EnergyCondenserAmount>
              <EnergyCondenserAmount>{item.amount.toFixed(0)}</EnergyCondenserAmount>
              <EnergyCondenserUpgrade onClick={() => buyEnergyCondenser(index)}>
                Buy {item.cost.toFixed(0)}
              </EnergyCondenserUpgrade>
            </EnergyCondensers>
          )
        }, energyCondensers)}
      </EnergyCondenserContainer>
    </MainContainer>
  )
}

export default TethysSystem
