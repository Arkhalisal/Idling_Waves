import { Alert, Box, styled } from '@mui/material'
import * as R from 'ramda'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { AlertItemType } from '@/types/alertPopup'
import { noForwardProps } from '@/util/function/style'

const AlertContainer = styled(Box)`
  position: fixed;
  top: 20px;
  right: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`

const AlertItemContainer = styled(Box, noForwardProps)<Visible>`
  transform: ${props => (props.__isVisible ? 'translateX(0)' : 'translateX(100%)')};
  opacity: ${props => (props.__isVisible ? 1 : 0)};
  transition: all 0.3s ease-in-out;

  position: relative;
`

const StyledAlert = styled(Alert)`
  border-radius: 8px;
  min-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  & .MuiAlert-icon {
    font-size: 24px;
  }

  & .MuiAlert-message {
    font-size: 16px;
    font-weight: 500;
    width: 100%;
  }
`

const ProgressBarContainer = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  height: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0 0 16px 16px;
  overflow: hidden;
`

const ProgressBar = styled(Box, noForwardProps)<ProgressBarProps>`
  height: 100%;
  width: ${props => props.__percentage}%;
  background-color: ${props => props.__variant};
  transition: ${props => (props.__isPaused ? 'none' : 'width 0.1s linear')};
`

const AlertItem = ({ alert, onClose }: AlertItemProps) => {
  const { timeout = 5000, variant = 'success', content } = alert

  const [isVisible, setIsVisible] = useState(false)
  const [remainingTime, setRemainingTime] = useState(timeout)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (timeout > 0) {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setRemainingTime(prev => {
            if (prev <= 100) {
              setIsVisible(false)
              setTimeout(onClose, 300)
              return 0
            }
            return prev - 100
          })
        }
      }, 100)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [timeout, isPaused, onClose])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }, [onClose])

  const handleMouseEnter = useCallback(() => {
    if (timeout > 0) {
      setIsPaused(true)
    }
  }, [timeout])

  const handleMouseLeave = useCallback(() => {
    if (timeout > 0) {
      setIsPaused(false)
    }
  }, [timeout])

  const progressPercentage = useMemo(
    () => (timeout > 0 ? (remainingTime / timeout) * 100 : 100),
    [remainingTime, timeout]
  )

  const getVariant = () => {
    switch (variant) {
      case 'success':
        return '#4caf50'
      case 'error':
        return '#f44336'
      case 'warning':
        return '#ff9800'
      case 'info':
        return '#2196f3'
      default:
        return '#4caf50'
    }
  }

  return (
    <AlertItemContainer
      __isVisible={isVisible}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledAlert severity={variant} onClose={() => handleClose()}>
        {content}
      </StyledAlert>

      <ProgressBarContainer>
        <ProgressBar
          __percentage={progressPercentage}
          __variant={getVariant()}
          __isPaused={isPaused}
        />
      </ProgressBarContainer>
    </AlertItemContainer>
  )
}

const AlertPopup = ({ alerts, closeAlert }: AlertPopupProps) => {
  return (
    <AlertContainer>
      {R.map(alert => {
        return <AlertItem key={alert.id} alert={alert} onClose={() => closeAlert(alert.id)} />
      }, alerts)}
    </AlertContainer>
  )
}

type AlertItemProps = {
  alert: AlertItemType
  onClose: () => void
}

type AlertPopupProps = {
  alerts: AlertItemType[]
  closeAlert: (id: string) => void
}

type Visible = {
  __isVisible: boolean
}

type ProgressBarProps = {
  __percentage: number
  __variant: string
  __isPaused: boolean
}

export default AlertPopup
