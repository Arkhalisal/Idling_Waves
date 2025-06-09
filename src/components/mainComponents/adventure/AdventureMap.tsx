import { Box, styled } from '@mui/material'
import { useCallback, useState } from 'react'
import { useMapEvent } from 'react-leaflet'

import { useNavbarContext } from '@/components/context/NavbarContext'
import { useThemeSettingContext } from '@/components/context/ThemeSettingContext'
import { MapNavbarId } from '@/constants/navbar'
import MapNavbar from '@/layout/Navbar/thirdNavbar/mapThirdNavbar'
import { noForwardProps } from '@/util/function/style'

import SectionTitle from '../share/SectionTitle'
import HuangLongAdventureMap from './MapComponents/HuangLongAdventureMap'
import MapScale from './MapScale'

const MainContainer = styled(Box)`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const MapOuterContainer = styled(Box, noForwardProps)<MapOuterContainerProps>`
  min-width: 560px;
  min-height: 560px;

  margin-top: 10px;

  border: 1px solid ${props => props.__borderColor};

  position: relative;

  .leaflet-tooltip {
    padding: 6px 12px;
    font-size: 14px;
    color: ${props => props.__color};
    background-color: ${props => props.__backgroundColor};
    border: 1px solid ${props => props.__borderColor};
  }

  .leaflet-interactive:focus {
    outline: none !important;
  }
`

const AdventureMap = () => {
  const { currentMapNavbar } = useNavbarContext()

  const { theme } = useThemeSettingContext()

  const [hoverCoordinates, setHoverCoordinates] = useState<Coordinates>({ x: 0, y: 0 })

  const handleMapMouseMove = (coords: Coordinates) => {
    setHoverCoordinates(coords)
  }

  const handleMapMouseLeave = () => {
    setHoverCoordinates({ x: 0, y: 0 })
  }

  const MapEvents = () => {
    useMapEvent('mousemove', e => {
      const { lat, lng } = e.latlng
      const x = Math.round(Math.max(0, Math.min(100, lng)))
      const y = Math.round(Math.max(0, Math.min(100, lat)))
      handleMapMouseMove({ x, y })
    })

    useMapEvent('mouseout', () => {
      handleMapMouseLeave()
    })

    return null
  }

  const renderMap = useCallback(() => {
    switch (currentMapNavbar) {
      case MapNavbarId.HuangLong: // HuangLong
        return <HuangLongAdventureMap MapEvents={MapEvents} />
      case MapNavbarId.Rinacita: // Rinacita
        return <div>Rinacita Adventure Map is not implemented yet.</div>
      default:
        return <HuangLongAdventureMap MapEvents={MapEvents} />
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMapNavbar])

  const generateBottomScaleMarks = () => {
    const marks = []
    for (let i = 0; i <= 100; i += 1) {
      marks.push(i)
    }
    return marks
  }

  const scaleMarks = generateBottomScaleMarks()

  return (
    <MainContainer>
      <SectionTitle title='Adventure Map' />

      <MapNavbar />

      <MapOuterContainer
        __color={theme.palette.primary.main}
        __backgroundColor={theme.palette.background.default}
        __borderColor={theme.palette.primary.main}
      >
        <MapScale hoverCoordinates={hoverCoordinates} scaleMarks={scaleMarks} active={false}>
          {renderMap()}
        </MapScale>
      </MapOuterContainer>
    </MainContainer>
  )
}

type MapOuterContainerProps = {
  __color: string
  __backgroundColor: string
  __borderColor: string
}

type Coordinates = {
  x: number
  y: number
}

export default AdventureMap
