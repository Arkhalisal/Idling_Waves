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
  const { energyCondensers, buyEnergyCondenser } = useEnergyCondenserContext()

  return (
    <MainContainer>
      <SectionTitle>Tethys System</SectionTitle>

      <CurrentEnergy>{''}</CurrentEnergy>

      <EnergyCondenserContainer>
        {RA.mapIndexed(item => {
          return (
            <EnergyCondensers key={item.name}>
              <EnergyCondenserTitle>{item.name}</EnergyCondenserTitle>
              <EnergyCondenserAmount>{item.amount}</EnergyCondenserAmount>
              <EnergyCondenserUpgrade
                onClick={() => buyEnergyCondenser(item.name)}
              >
                Buy
              </EnergyCondenserUpgrade>
            </EnergyCondensers>
          )
        }, energyCondensers)}
      </EnergyCondenserContainer>
    </MainContainer>
  )
}

export default TethysSystem
