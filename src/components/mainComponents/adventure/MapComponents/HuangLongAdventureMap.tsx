import 'leaflet/dist/leaflet.css'

import { styled } from '@mui/material'
import ImageHuangLongMap from '@public/image/map/huang_long.png'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ImageHuangLongMapDemo from '@public/image/map/huang_long_border.png'
import L, { LatLngExpression } from 'leaflet'
import * as R from 'ramda'
import { useCallback, useRef } from 'react'
import { ImageOverlay, MapContainer, Polygon, Tooltip } from 'react-leaflet'

import { useAdventureMapContext } from '@/components/context/AdventureMapContext'
import { useNavbarContext } from '@/components/context/NavbarContext'
import { MapNavbarId } from '@/constants/navbar'
import { HuangLongMapId, HuangLongMapType } from '@/types/map'

const StyledPolygon = styled(Polygon)<{ __unlocked: boolean }>`
  :hover {
    fill-opacity: ${props => props.__unlocked && '0.4'};
    opacity: ${props => props.__unlocked && '1'};
  }
`

const MapController = () => {
  const { huangLongMap, setSelectedZone } = useAdventureMapContext()

  const { setCurrentMapNavbar } = useNavbarContext()

  const handleZoneClick = useCallback(
    (zone: HuangLongMapType) => {
      if (!zone.unlocked) {
        return
      }

      if (zone.id === HuangLongMapId.BlackShore) {
        setCurrentMapNavbar(MapNavbarId.BlackShore)
        return
      }

      setSelectedZone(zone.id)
    },
    [setCurrentMapNavbar, setSelectedZone]
  )

  const handlePathOptions = useCallback((zone: HuangLongMapType) => {
    if (!zone.unlocked) {
      return {
        color: 'lightgray',
        fillColor: 'lightgray',
        dashArray: '5, 5',
        opacity: 0.5,
        fillOpacity: 0.2
      }
    } else {
      return {
        color: zone.color,
        fillColor: zone.color,
        opacity: 0.8,
        fillOpacity: 0.2
      }
    }
  }, [])

  return (
    <>
      {R.map(zone => {
        return (
          <StyledPolygon
            key={zone.id}
            __unlocked={zone.unlocked}
            positions={zone.coordinates as LatLngExpression[]}
            pathOptions={handlePathOptions(zone)}
            eventHandlers={{
              click: () => handleZoneClick(zone)
            }}
          >
            <Tooltip direction='top'>{zone.name}</Tooltip>
          </StyledPolygon>
        )
      }, huangLongMap)}
    </>
  )
}

const HuangLongAdventureMap = ({ MapEvents }: MapEventsProps) => {
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
      <MapEvents />
      <ImageOverlay url={ImageHuangLongMap.src} bounds={bounds} crossOrigin='anonymous' />
      <MapController />
    </MapContainer>
  )
}

type MapEventsProps = {
  MapEvents: () => null
}

export default HuangLongAdventureMap
