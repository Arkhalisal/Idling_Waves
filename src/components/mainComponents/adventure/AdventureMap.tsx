import { Box, styled } from '@mui/material'
import { useCallback, useState } from 'react'
import { useMapEvent } from 'react-leaflet'

import { useAdventureMapContext } from '@/components/context/AdventureMapContext'
import { useNavbarContext } from '@/components/context/NavbarContext'
import { MapNavbarId } from '@/constants/navbar'
import MapNavbar from '@/layout/Navbar/thirdNavbar/mapThirdNavbar'

import SectionTitle from '../share/SectionTitle'
import HuangLongAdventureMap from './MapComponents/HuangLongAdventureMap'
import MapScale from './MapScale'

const MainContainer = styled(Box)`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const MapOuterContainer = styled(Box)`
  width: 560px;
  height: 560px;

  margin-top: 10px;

  border: 1px solid aquamarine;

  position: relative;

  .leaflet-tooltip {
    color: black;
    background-color: white;
    border: 1px solid #1976d2;
  }

  .leaflet-interactive:focus {
    outline: none !important;
  }
`

const AdventureMap = () => {
  const { currentMapNavbar } = useNavbarContext()

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
      // Convert to our coordinate system (0-100)
      const x = Math.round(Math.max(0, Math.min(100, lng)))
      const y = Math.round(Math.max(0, Math.min(100, lat))) // Flip Y coordinate
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

      <MapOuterContainer>
        <MapScale hoverCoordinates={hoverCoordinates} scaleMarks={scaleMarks} active={false}>
          {renderMap()}
        </MapScale>
      </MapOuterContainer>
    </MainContainer>
  )
}

type Coordinates = {
  x: number
  y: number
}

export default AdventureMap
