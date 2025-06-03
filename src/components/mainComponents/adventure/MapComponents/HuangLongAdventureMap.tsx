import 'leaflet/dist/leaflet.css'

import { styled } from '@mui/material'
import ImageHuangLongMap from '@public/image/map/huang_long.png'
import ImageHuangLongMapDemo from '@public/image/map/huang_long_border.png'
import L, { LatLngExpression } from 'leaflet'
import { useRef } from 'react'
import { ImageOverlay, MapContainer, Polygon, Tooltip } from 'react-leaflet'

import { useAdventureMapContext } from '@/components/context/AdventureMapContext'
import { HuangLongMapId } from '@/types/map'

const StyledPolygon = styled(Polygon)`
  :hover {
    cursor: pointer;
    z-index: 1000; /* Bring to front on hover */
    fill-opacity: 0.4 !important; /* Override default fill opacity */
    opacity: 1 !important; /* Override default opacity */
  }
`

const MapController = () => {
  const { huangLongMap } = useAdventureMapContext()

  const handleZoneClick = (zoneId: string) => {}

  return (
    <>
      {huangLongMap.map(zone => {
        return (
          <StyledPolygon
            key={zone.id}
            positions={zone.coordinates as LatLngExpression[]}
            pathOptions={{
              color: zone.color,
              weight: 3,
              opacity: 0.8,
              fillColor: zone.color,
              fillOpacity: 0.2
            }}
            eventHandlers={{
              click: () => handleZoneClick(zone.id)
            }}
          >
            <Tooltip>{zone.name}</Tooltip>
          </StyledPolygon>
        )
      })}
    </>
  )
}

const HuangLongAdventureMap = () => {
  const mapRef = useRef(null)

  const bounds = L.latLngBounds([0, 0], [100, 100])

  const center = bounds.getCenter()

  return (
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
      <MapController />
    </MapContainer>
  )
}

export default HuangLongAdventureMap
