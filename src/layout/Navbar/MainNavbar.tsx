import { Box, styled, Tab, Tabs, Typography } from '@mui/material'
import * as R from 'ramda'
import { Tooltip } from 'react-tooltip'

import { useNavbarContext } from '@/components/context/NavbarContext'

import SecondNavbar from './SecondNavbar'

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`

const Info = styled(Typography)`
  height: 60px;

  border: 1px solid #1976d2;

  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    width: 4px;
  }
`

const StyledTab = styled(Tab)`
  border-bottom: 1px solid #1976d2;
  border-right: 1px solid #1976d2;

  .Mui-selected {
    color: black;
  }

  transition: all 0.3s ease;

  :hover {
    background-color: #e3f2fd;
  }
`

const StyledTooltip = styled(Tooltip)`
  .react-tooltip-arrow {
    width: 34px;
    height: 34px;

    clip-path: polygon(100% 50%, 100% 100%, 50% 100%, 75% 75%, 50% 100%);

    background-color: #1976d2;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;

  z-index: 1;
`

const MainNavbar = () => {
  const { navigationMenu, currentTab, handleNavbarCycle, handleNavbarChange } = useNavbarContext()

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
            border='1px solid #1976d2'
            clickable
            style={{
              backgroundColor: 'white',
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
