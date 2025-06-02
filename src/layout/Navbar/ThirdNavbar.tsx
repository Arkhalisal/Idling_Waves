import { Container, styled, Tab, Tabs } from '@mui/material'
import * as R from 'ramda'

import { ThirdNavbarType } from '@/types/navbar'

const TabsContainer = styled(Container)`
  width: 100%;

  display: flex;
  justify-content: center;
`

const StyledTabs = styled(Tabs)`
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  .MuiTabs-scrollButtons {
    color: black;
    background-color: lightgray;
  }
`

const StyledTab = styled(Tab)`
  border-right: 1px solid #e0e0e0;

  &:last-of-type {
    border-right: none;
  }

  &.Mui-selected {
    color: #1976d2; /* Main theme color for active tab text */
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

  return (
    <TabsContainer>
      <StyledTabs
        value={index}
        onChange={handleTabChange}
        variant='scrollable'
        orientation={'horizontal'}
      >
        {R.map(item => {
          if (!item.unlocked) return null

          return <StyledTab key={item.value} value={item.value} label={item.name} />
        }, navItems)}
      </StyledTabs>
    </TabsContainer>
  )
}

type SharedThirdNavbarProps = {
  navItems: ThirdNavbarType[]
  index: number
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
}

export default SharedThirdNavbar
