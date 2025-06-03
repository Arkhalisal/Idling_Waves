import { Box, styled } from '@mui/material'
import { useCallback } from 'react'

import { useNavbarContext } from '@/components/context/NavbarContext'
import { MapNavbarId } from '@/constants/navbar'
import MapNavbar from '@/layout/Navbar/thirdNavbar/mapThirdNavbar'

import SectionTitle from '../share/SectionTitle'
import HuangLongAdventureMap from './MapComponents/HuangLongAdventureMap'

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

  .leaflet-interactive:focus {
    outline: none !important;
  }
  .leaflet-interactive {
    outline: none !important;
  }
  .leaflet-container {
    outline: none !important;
  }
  .leaflet-container:focus {
    outline: none !important;
  }
`

const LeftScale = styled(Box)`
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 100%;

  color: black;
`

const BottomScale = styled(Box)`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 20px;

  color: black;
`

const AdventureMap = () => {
  const { currentMapNavbar } = useNavbarContext()

  const renderMap = useCallback(() => {
    switch (currentMapNavbar) {
      case MapNavbarId.HuangLong: // HuangLong
        return <HuangLongAdventureMap />
      case MapNavbarId.Rinacita: // Rinacita
        return <div>Rinacita Adventure Map is not implemented yet.</div>
      default:
        return <HuangLongAdventureMap />
    }
  }, [currentMapNavbar])

  const generateBottomScaleMarks = () => {
    const marks = []
    for (let i = 0; i <= 100; i += 5) {
      // Every 10 units
      marks.push(i)
    }
    return marks
  }

  const scaleMarks = generateBottomScaleMarks()

  return (
    <MainContainer>
      {/* <SectionTitle title='Adventure Map' />

      <MapNavbar /> */}

      <MapOuterContainer>
        <LeftScale>
          {scaleMarks.map(mark => (
            <Box
              key={mark}
              sx={{ position: 'absolute', bottom: `${mark}%`, left: 0, width: '100%' }}
            >
              <Box sx={{ height: '1px', backgroundColor: 'black' }} />
              <Box sx={{ position: 'absolute', left: '-20px', top: '-5px', fontSize: '12px' }}>
                {mark}
              </Box>
            </Box>
          ))}
        </LeftScale>
        {renderMap()}
        <BottomScale>
          {scaleMarks.map(mark => (
            <Box
              key={mark}
              sx={{ position: 'absolute', left: `${mark}%`, bottom: 0, width: '1px' }}
            >
              <Box sx={{ height: '20px', backgroundColor: 'black' }} />
              <Box sx={{ position: 'absolute', bottom: '-20px', left: '-5px', fontSize: '12px' }}>
                {mark}
              </Box>
            </Box>
          ))}
        </BottomScale>
      </MapOuterContainer>
    </MainContainer>
  )
}

export default AdventureMap
