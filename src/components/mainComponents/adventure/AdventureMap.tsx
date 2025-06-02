import { Box, styled } from '@mui/material'
import ImageHuangLongMap from '@public/image/map/huang_long.png'
import ImageHuangLongMapDemo from '@public/image/map/huang_long_border.png'
import L, { LatLngBounds } from 'leaflet'
import { useRef } from 'react'
import { ImageOverlay, MapContainer } from 'react-leaflet'

import { HuangLongMap } from '@/constants/map/huangLong'
import MapNavbar from '@/layout/Navbar/thirdNavbar/mapThirdNavbar'

import SectionTitle from '../share/SectionTitle'

const MainContainer = styled(Box)`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const MapOuterContainer = styled(Box)`
  width: 100%;
  height: 560px;

  position: relative;
`

const AdventureMap = () => {
  const mapRef = useRef(null)

  const bounds = new LatLngBounds([0, 0], [100, 100])

  const center = bounds.getCenter()

  return (
    <MainContainer>
      <SectionTitle title='Adventure Map' />

      <MapNavbar />

      <MapOuterContainer>
        <MapContainer
          ref={mapRef}
          center={center}
          zoom={2.5}
          style={{ height: '100%', width: '100%' }}
          crs={L.CRS.Simple}
          minZoom={2.5}
          maxZoom={2.5}
          zoomControl={false}
          attributionControl={false}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          touchZoom={false}
        >
          <ImageOverlay url={ImageHuangLongMapDemo.src} bounds={bounds} crossOrigin='anonymous' />
        </MapContainer>
      </MapOuterContainer>
    </MainContainer>
  )
}

export default AdventureMap
