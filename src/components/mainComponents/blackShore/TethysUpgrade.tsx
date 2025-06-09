import { Box, styled } from '@mui/material'
import * as R from 'ramda'
import { useCallback } from 'react'
import { Tooltip } from 'react-tooltip'

import { useEnergyContext } from '@/components/context/EnergyContext'
import { useTethysUpgradeContext } from '@/components/context/TethysUpgradeContext'
import { useThemeSettingContext } from '@/components/context/ThemeSettingContext'
import { TethysUpgradeType } from '@/types/blackShore/tethysUpgrade'
import { formatDecimal } from '@/util/function/format'
import { noForwardProps } from '@/util/function/style'

import ColorButton from '../share/ColorButton'
import SectionTitle from '../share/SectionTitle'

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`

const UpgradesContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  gap: 20px;

  margin-top: 20px;
`

const StyledButton = styled(ColorButton, noForwardProps)<ButtonProps>`
  width: 200px;
  height: 80px;

  white-space: break-spaces;

  background-color: ${props => props.__unlocked && props.__backgroundColor} !important;
  color: ${props => props.__unlocked && props.__color} !important;
`

const StyledTooltip = styled(Tooltip)`
  text-align: center;
  max-width: 300px;
`

const TethysUpgrade = () => {
  const { energy, totalGeneratedEnergy } = useEnergyContext()

  const { tethysUpgrade, unlockTethysUpgrade } = useTethysUpgradeContext()

  const { theme } = useThemeSettingContext()

  const renderContent = useCallback(
    (upgrade: TethysUpgradeType) => {
      if (totalGeneratedEnergy.times(10).lt(upgrade.cost)) {
        return `???\n${formatDecimal(upgrade.cost)} Energy`
      }

      return `${upgrade.name}\n${formatDecimal(upgrade.cost)} Energy`
    },
    [totalGeneratedEnergy]
  )

  return (
    <MainContainer>
      <SectionTitle title='Tethys Upgrade' />

      <UpgradesContainer>
        {R.map(upgrade => {
          const tooLessEnergy = totalGeneratedEnergy.times(10).lt(upgrade.cost)

          return (
            <Box key={upgrade.id}>
              <Box data-tooltip-id={tooLessEnergy ? 'NotUnlocked' : `Tethys-upgrade-${upgrade.id}`}>
                <StyledButton
                  __unlocked={upgrade.unlocked}
                  __backgroundColor={theme.palette.primary.main}
                  __color={theme.palette.primary.contrastText}
                  disabled={energy.lt(upgrade.cost) || tooLessEnergy || upgrade.unlocked}
                  onClick={() => unlockTethysUpgrade(upgrade.id)}
                >
                  {renderContent(upgrade)}
                </StyledButton>
              </Box>
              <StyledTooltip
                id={`Tethys-upgrade-${upgrade.id}`}
                place='top'
                content={upgrade.description}
              />
            </Box>
          )
        }, tethysUpgrade)}
        <StyledTooltip
          id='NotUnlocked'
          place='top'
          content='You need to generate more energy to unlock this upgrade.'
        />
      </UpgradesContainer>
    </MainContainer>
  )
}

type ButtonProps = {
  __unlocked: boolean
  __backgroundColor: string
  __color: string
}

export default TethysUpgrade
