import { useNavbarContext } from '@/components/context/NavbarContext'
import { MapNavbarId } from '@/constants/navbar'

import SharedThirdNavbar from '../ThirdNavbar'

const MapNavbar = () => {
  const { currentMapNavbar, setCurrentMapNavbar } = useNavbarContext()

  const navItems = [
    { name: 'HuangLong', value: MapNavbarId.HuangLong, unlocked: true },
    { name: 'Rinacita', value: MapNavbarId.Rinacita, unlocked: false }
  ]

  const handleMapNavbarChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentMapNavbar(newValue)
  }

  return (
    <SharedThirdNavbar
      navItems={navItems}
      index={currentMapNavbar}
      handleChange={handleMapNavbarChange}
    />
  )
}

export default MapNavbar
