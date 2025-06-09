import { Box, Button, styled, Tab, Tabs } from '@mui/material'
import * as R from 'ramda'
import { Tooltip } from 'react-tooltip'

import { useNavbarContext } from '@/components/context/NavbarContext'
import { useThemeSettingContext } from '@/components/context/ThemeSettingContext'

import SecondNavbar from './SecondNavbar'

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`

const Info = styled(Button)`
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0;
`

const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    width: 4px;
  }
`

const StyledTab = styled(Tab)`
  transition: all 0.3s ease;
`

const StyledTooltip = styled(Tooltip)`
  .react-tooltip-arrow {
    width: 34px;
    height: 34px;

    clip-path: polygon(100% 50%, 100% 100%, 50% 100%, 75% 75%, 50% 100%);
  }

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;

  z-index: 1;
`

const MainNavbar = () => {
  const { navigationMenu, currentTab, handleNavbarCycle, handleNavbarChange } = useNavbarContext()

  const { theme } = useThemeSettingContext()

  return (
    <MainContainer>
      <Info>hi</Info>
      <StyledTabs orientation='vertical' value={currentTab} onChange={handleNavbarChange}>
        {R.map(item => {
          if (!item.unlocked) return

          return (
            <StyledTab
              key={item.value}
              label={item.navName}
              value={item.value}
              onClick={() => handleNavbarCycle(item.value)}
              data-tooltip-id={item.navName}
            />
          )
        }, navigationMenu)}
      </StyledTabs>
      {R.map(
        item => (
          <StyledTooltip
            key={item.value}
            id={item.navName}
            place='right-start'
            border={`1px solid ${theme.palette.primary.main}`}
            arrowColor={theme.palette.primary.main}
            clickable
            style={{
              backgroundColor: theme.palette.background.default,
              padding: '0'
            }}
          >
            <SecondNavbar menu={item} />
          </StyledTooltip>
        ),
        navigationMenu
      )}
    </MainContainer>
  )
}

export default MainNavbar
