import { styled, Tab, Tabs } from '@mui/material'
import * as R from 'ramda'
import { useMemo } from 'react'
import { Tooltip } from 'react-tooltip'

import { useNavbarContext } from '@/components/context/NavbarContext'
import { NavigationMenuType } from '@/types/navbar'

const StyledTabs = styled(Tabs)``

const StyledTab = styled(Tab)`
  min-width: 48px;

  padding: 0;

  transition: all 0.3s ease;

  :hover {
    background-color: #e3f2fd;
  }
`

const StyledTooltip = styled(Tooltip)`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: aliceblue;
  color: black;
`

const SecondNavbar = ({ menu }: SecondNavbarProps) => {
  const { CurrentTab, CurrentSecondNavbar, handleSecondNavbarChange } = useNavbarContext()

  const currentMenu = useMemo(() => {
    return CurrentTab === menu.value ? CurrentSecondNavbar : false
  }, [CurrentTab, menu.value, CurrentSecondNavbar])

  return (
    <StyledTabs value={currentMenu} onChange={handleSecondNavbarChange}>
      <StyledTab value={menu.value} label={menu.value} data-tooltip-id={menu.navIcon} />
      {R.map(item => {
        if (!item.unlocked) return

        return (
          <StyledTab
            key={item.value}
            value={item.value}
            label={item.value}
            data-tooltip-id={item.navIcon}
          />
        )
      }, menu.submenu)}
    </StyledTabs>
  )
}

type SecondNavbarProps = {
  menu: NavigationMenuType
}

export default SecondNavbar
