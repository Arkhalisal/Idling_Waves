import { Box, styled } from '@mui/material'

import { noForwardProps } from '@/util/function/style'

const LeftScaleContainer = styled(Box)`
  position: absolute;
  left: -32px;
  top: 0;
  width: 32px;
  height: 560px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: flex-end;
  padding-right: 4px;
  font-size: 12px;
  color: #666;
  background-color: #f5f5f5;
  border-right: 1px solid #ccc;
`

const ScaleMark = styled(Box, noForwardProps)<ScaleCSSProps>`
  position: absolute;
  display: flex;
  align-items: center;
  transition: opacity 0.15s ease;
  opacity: ${props => (props.__highlighted ? 1 : 0)};

  span {
    margin-right: 4px;
    font-weight: ${props => (props.__highlighted ? 'bold' : 'normal')};
    color: ${props => (props.__highlighted ? '#d32f2f' : '#666')};
  }

  &::after {
    content: '';
    width: 8px;
    height: 1px;
    background-color: ${props => (props.__highlighted ? '#d32f2f' : '#999')};
  }
`

const BottomScaleContainer = styled(Box)`
  width: 560px;
  height: 32px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 4px;
  font-size: 12px;
  color: #666;
  background-color: #f5f5f5;
  border-top: 1px solid #ccc;
  position: relative;
`

const BottomScaleMark = styled(Box, noForwardProps)<ScaleCSSProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 0.15s ease;
  opacity: ${props => (props.__highlighted ? 1 : 0)};
  transform: translateX(-50%);

  &::before {
    content: '';
    width: 1px;
    height: 8px;
    margin-bottom: 4px;
    background-color: ${props => (props.__highlighted ? '#d32f2f' : '#999')};
  }

  span {
    font-weight: ${props => (props.__highlighted ? 'bold' : 'normal')};
    color: ${props => (props.__highlighted ? '#d32f2f' : '#666')};
  }
`

const CoordinateDisplay = styled(Box)`
  background-color: #e3f2fd;
  border: 1px solid #2196f3;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;

  color: black;
  text-align: center;
`

const LeftScale = ({ hoverCoordinates, scaleMarks }: MapScaleProps) => {
  return (
    <LeftScaleContainer>
      {scaleMarks.map(mark => {
        const ishighlighted = hoverCoordinates && hoverCoordinates.y === mark ? true : false

        return (
          <ScaleMark
            key={mark}
            __highlighted={ishighlighted}
            sx={{
              bottom: `${(mark / 100) * 560}px`,
              transform: 'translateY(50%)'
            }}
          >
            <span>{mark}</span>
          </ScaleMark>
        )
      })}
    </LeftScaleContainer>
  )
}

const BottomScale = ({ hoverCoordinates, scaleMarks }: MapScaleProps) => {
  return (
    <BottomScaleContainer>
      {scaleMarks.map(mark => {
        const ishighlighted = hoverCoordinates && hoverCoordinates.x === mark ? true : false

        return (
          <BottomScaleMark
            key={mark}
            __highlighted={ishighlighted}
            sx={{
              left: `${(mark / 100) * 560}px`
            }}
          >
            <span>{mark}</span>
          </BottomScaleMark>
        )
      })}
    </BottomScaleContainer>
  )
}

const MapScale = ({ children, hoverCoordinates, scaleMarks, active }: MapScaleChildrenProps) => {
  if (!active) {
    return children
  }

  return (
    <>
      <LeftScale hoverCoordinates={hoverCoordinates} scaleMarks={scaleMarks} />
      {children}
      <BottomScale hoverCoordinates={hoverCoordinates} scaleMarks={scaleMarks} />
      <CoordinateDisplay>
        Coordinates: Y: {hoverCoordinates.y}, X: {hoverCoordinates.x}
      </CoordinateDisplay>
    </>
  )
}

type ScaleCSSProps = {
  __highlighted: boolean
}

type MapScaleProps = {
  hoverCoordinates: { x: number; y: number }
  scaleMarks: number[]
}

type MapScaleChildrenProps = {
  children: React.ReactNode
  active: boolean
} & MapScaleProps

export default MapScale
