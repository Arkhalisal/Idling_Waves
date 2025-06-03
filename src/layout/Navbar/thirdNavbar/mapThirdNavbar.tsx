import { useAdventureMapContext } from '@/components/context/AdventureMapContext'
import { useNavbarContext } from '@/components/context/NavbarContext'

import SharedThirdNavbar from '../ThirdNavbar'

const MapNavbar = () => {
  const { currentMapNavbar, setCurrentMapNavbar } = useNavbarContext()

  const { mapNavItems } = useAdventureMapContext()

  const handleMapNavbarChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentMapNavbar(newValue)
  }

  return (
    <SharedThirdNavbar
      navItems={mapNavItems}
      index={currentMapNavbar}
      handleChange={handleMapNavbarChange}
    />
  )
}

export default MapNavbar
