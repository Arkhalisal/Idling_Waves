import { Container, styled, Tab, Tabs } from '@mui/material'
import * as R from 'ramda'

import { useThemeSettingContext } from '@/components/context/ThemeSettingContext'
import { ThirdNavbarType } from '@/types/navbar'
import { noForwardProps } from '@/util/function/style'

const TabsContainer = styled(Container)`
  width: 100%;

  display: flex;
  justify-content: center;
`

const StyledTabs = styled(Tabs, noForwardProps)<BorderedTabProps>`
  border: 1px solid ${props => props.__borderColor};
  border-radius: 4px;
`

const StyledTab = styled(Tab, noForwardProps)<BorderedTabProps>`
  border-right: 1px solid ${props => props.__borderColor};

  &:last-of-type {
    border-right: none;
  }

  &.Mui-selected {
    font-weight: bold;
  }

  /* General tab styling */
  color: #616161; /* Neutral gray for inactive tabs */
  font-size: 16px; /* Adjust font size */
  padding: 12px 24px; /* Comfortable padding */
`
const SharedThirdNavbar = ({ navItems, index, handleChange }: SharedThirdNavbarProps) => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    handleChange(event, newValue)
  }

  const { theme } = useThemeSettingContext()

  return (
    <TabsContainer>
      <StyledTabs
        value={index}
        onChange={handleTabChange}
        variant='scrollable'
        orientation={'horizontal'}
        __borderColor={theme.palette.primary.main}
      >
        {R.map(item => {
          if (!item.unlocked) return null

          return (
            <StyledTab
              key={item.value}
              value={item.value}
              label={item.name}
              __borderColor={theme.palette.primary.main}
            />
          )
        }, navItems)}
      </StyledTabs>
    </TabsContainer>
  )
}

type BorderedTabProps = {
  __borderColor: string
}

type SharedThirdNavbarProps = {
  navItems: ThirdNavbarType[]
  index: number
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
}

export default SharedThirdNavbar
