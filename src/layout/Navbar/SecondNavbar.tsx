import { styled, Tab, Tabs } from '@mui/material'
import * as R from 'ramda'
import { useMemo } from 'react'

import { useNavbarContext } from '@/components/context/NavbarContext'
import { NavigationMenuType } from '@/types/navbar'

const StyledTab = styled(Tab)`
  padding: 0;

  min-width: 48px;
`

const SecondNavbar = ({ menu }: SecondNavbarProps) => {
  const { CurrentTab, CurrentSecondNavbar, handleSecondNavbarChange } =
    useNavbarContext()

  const currentMenu = useMemo(() => {
    return CurrentTab === menu.value ? CurrentSecondNavbar : false
  }, [CurrentTab, menu.value, CurrentSecondNavbar])

  return (
    <Tabs value={currentMenu} onChange={handleSecondNavbarChange}>
      <StyledTab value={menu.value} label={menu.value} />
      {R.map(item => {
        return (
          <StyledTab key={item.value} value={item.value} label={item.value} />
        )
      }, menu.submenu)}
    </Tabs>
  )
}

type SecondNavbarProps = {
  menu: NavigationMenuType
}

export default SecondNavbar
