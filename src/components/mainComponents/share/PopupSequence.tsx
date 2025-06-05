'use client'

import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material'
import { Backdrop, Box, Paper, styled, Typography } from '@mui/material'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { PopupSequenceType } from '@/types/popupSequence'

import ColorButton from './ColorButton'

// Styled Components
const StyledBackdrop = styled(Backdrop)`
  backdrop-filter: blur(2px);
`

const StylePopup = styled(Paper)`
  min-width: 300px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
  border-radius: 16px;

  position: relative;
`

const HeaderContainer = styled(Box)<ContentProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 8px 24px;

  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`

const ContentContainer = styled(Box)``

const PopupTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
`

const SkipButton = styled(ColorButton)`
  border: none;
`

const ContentSection = styled(Box)<ContentProps>`
  padding: 24px;
  min-height: 120px;

  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`

const ProgressContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 16px;
  gap: 8px;
`

const ProgressDotContainer = styled(Box)`
  display: flex;
  gap: 4px;
`

const ProgressDot = styled(Box)<ProgressDotProps>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props =>
    props.active ? props.theme.palette.primary.main : props.theme.palette.grey[300]};
  transition: background-color 300ms ease;
`

const ProgressWord = styled(Typography)`
  font-size: 12px;
`

const FooterContainer = styled(Box)<ContentProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px 16px 24px;

  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`

const NextButton = styled(ColorButton)``

const PopupSequence: React.FC<PopupSystemProps> = ({
  popups,
  autoAdvance = false,
  onAllComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const onAllCompleteRef = useRef(onAllComplete)

  // Update ref when callback changes
  useEffect(() => {
    onAllCompleteRef.current = onAllComplete
  }, [onAllComplete])

  const currentPopup = popups[currentIndex]
  const hasMorePopups = currentIndex < popups.length - 1

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const transitionToNext = useCallback(() => {
    clearTimers()

    if (hasMorePopups) {
      setShowContent(false)

      // Wait for fade out, then change content and fade back in
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
        setTimeout(() => {
          setShowContent(true)
        }, 50)
      }, 200)
    } else {
      // Close the entire dialog sequence
      setIsOpen(false)
      setTimeout(() => {
        setCurrentIndex(0)
        setShowContent(true)
        if (onAllCompleteRef.current) {
          onAllCompleteRef.current()
        }
      }, 300)
    }
  }, [hasMorePopups, clearTimers])

  const closeCurrentPopup = useCallback(() => {
    // Call the popup's onClose callback if provided
    if (currentPopup?.onClose) {
      currentPopup.onClose()
    }

    transitionToNext()
  }, [currentPopup, transitionToNext])

  const skipToEnd = useCallback(() => {
    clearTimers()
    setIsOpen(false)
    setTimeout(() => {
      setCurrentIndex(0)
      setShowContent(true)
      if (onAllCompleteRef.current) {
        onAllCompleteRef.current()
      }
    }, 300)
  }, [clearTimers])

  // Open dialog when component mounts
  useEffect(() => {
    if (popups.length > 0) {
      setIsOpen(true)
      setCurrentIndex(0)
      setShowContent(true)
    }
  }, [popups.length])

  // Handle auto-close timing when popup content changes
  useEffect(() => {
    clearTimers()

    // Set up timer if duration is specified, content is visible, and auto-advance is NOT disabled
    if (showContent && currentPopup?.duration && currentPopup.duration > 0 && !!autoAdvance) {
      // Main timeout for auto-advance
      timeoutRef.current = setTimeout(() => {
        closeCurrentPopup()
      }, currentPopup.duration)
    }

    // Cleanup timers
    return () => {
      clearTimers()
    }
  }, [
    currentIndex,
    showContent,
    currentPopup?.duration,
    autoAdvance,
    closeCurrentPopup,
    clearTimers
  ])

  // Don't render if no popups
  if (!popups.length) {
    return null
  }

  const handleBackdropClick = () => {
    // Don't close on backdrop click - require explicit action
  }

  return (
    <StyledBackdrop open={isOpen} onClick={handleBackdropClick}>
      <StylePopup elevation={8}>
        {/* Title Section */}
        <HeaderContainer show={showContent}>
          <PopupTitle>{currentPopup.title}</PopupTitle>

          <SkipButton onClick={skipToEnd}>Skip All</SkipButton>
        </HeaderContainer>

        {/* Content Section */}
        <ContentSection show={showContent}>
          <ContentContainer>{currentPopup.content}</ContentContainer>

          {/* Progress indicator */}
          {popups.length > 1 && (
            <ProgressContainer>
              {/* Progress dots */}
              <ProgressDotContainer>
                {popups.map((_, index) => (
                  <ProgressDot key={index} active={index === currentIndex} />
                ))}
              </ProgressDotContainer>
              <ProgressWord>
                {currentIndex + 1} of {popups.length}
              </ProgressWord>
            </ProgressContainer>
          )}
        </ContentSection>

        {/* Footer with Actions */}
        <FooterContainer show={showContent}>
          <NextButton
            onClick={closeCurrentPopup}
            endIcon={hasMorePopups ? <ArrowForwardIcon /> : undefined}
          >
            {hasMorePopups ? 'Next' : 'Close'}
          </NextButton>
        </FooterContainer>
      </StylePopup>
    </StyledBackdrop>
  )
}

type PopupSystemProps = {
  popups: PopupSequenceType[]
  autoAdvance?: boolean
  onAllComplete: () => void
}

type ContentProps = {
  show: boolean
}

type ProgressDotProps = {
  active: boolean
}

export default PopupSequence
