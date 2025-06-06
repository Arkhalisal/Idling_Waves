import { Box, styled } from '@mui/material'

import { useAlertPopupContext } from '@/components/context/componentContext/AlertPopupContext'
import { usePopupContext } from '@/components/context/componentContext/PopupContext'

import ColorButton from '../share/ColorButton'

const MainContainer = styled(Box)``

const Testing = () => {
  const { createAlert } = useAlertPopupContext()

  const { showPopups } = usePopupContext()

  const handleAlertClick = () => {
    createAlert({
      content: 'This is a test alert',
      variant: 'info',
      timeout: 5000
    })
  }

  const handlePopupClick = () => {
    showPopups(
      [
        {
          id: 'test-popup-1',
          title: 'Test Popup 1',
          content: 'This is a test popup',
          duration: 0
        },
        {
          id: 'test-popup-2',
          title: 'Test Popup 2',
          content: 'This is another test popup',
          duration: 0
        }
      ],
      { autoAdvance: true }
    )
  }

  return (
    <MainContainer>
      <ColorButton onClick={handleAlertClick}>Show Alert</ColorButton>
      <ColorButton onClick={handlePopupClick}>Show Popup</ColorButton>
    </MainContainer>
  )
}

export default Testing
