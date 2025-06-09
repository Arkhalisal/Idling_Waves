import { styled, Tab, Tabs } from '@mui/material'
import * as R from 'ramda'
import { useMemo } from 'react'
import { Tooltip } from 'react-tooltip'

import { useNavbarContext } from '@/components/context/NavbarContext'
import { useThemeSettingContext } from '@/components/context/ThemeSettingContext'
import NextImage from '@/components/mainComponents/share/NextImage'
import { NavigationMenuType } from '@/types/navbar'

const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    height: 4px;
  }
`

const StyledTab = styled(Tab)`
  min-width: 48px;

  padding: 0;

  transition: all 0.3s ease;
`

const StyledTooltip = styled(Tooltip)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled(NextImage)``

const SecondNavbar = ({ menu }: SecondNavbarProps) => {
  const { currentTab, currentSecondNavbar, handleSecondNavbarChange } = useNavbarContext()

  const { theme } = useThemeSettingContext()

  const currentMenu = useMemo(() => {
    return currentTab === menu.value ? currentSecondNavbar : false
  }, [currentTab, menu.value, currentSecondNavbar])

  return (
    <>
      <StyledTabs value={currentMenu} onChange={handleSecondNavbarChange}>
        <StyledTab
          value={menu.value}
          label={<Image src={menu.navIcon} alt={menu.name} />}
          data-tooltip-id={menu.secondNavbarId}
        />
        {R.map(item => {
          if (!item.unlocked) return

          return (
            <StyledTab
              key={item.value}
              value={item.value}
              label={<Image src={menu.navIcon} alt={menu.name} />}
              data-tooltip-id={item.secondNavbarId}
            />
          )
        }, menu.submenu)}
      </StyledTabs>
      <StyledTooltip
        id={menu.secondNavbarId}
        place='top'
        content={menu.name}
        border={`1px solid ${theme.palette.primary.main}`}
        style={{ backgroundColor: 'black' }}
      />
      {R.map(item => {
        if (!item.unlocked) return

        return (
          <StyledTooltip
            key={item.value}
            id={item.secondNavbarId}
            place='top'
            content={item.name}
            border={`1px solid ${theme.palette.primary.main}`}
            style={{ backgroundColor: 'black' }}
          />
        )
      }, menu.submenu)}
    </>
  )
}

type SecondNavbarProps = {
  menu: NavigationMenuType
}

export default SecondNavbar
