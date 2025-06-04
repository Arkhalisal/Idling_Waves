import { styled, TextField, Typography } from '@mui/material'
import * as R from 'ramda'
import { useCallback, useState } from 'react'

import { useSaveLoadContext } from '@/components/context/SaveLoadContext'

import ColorButton from '../../share/ColorButton'
import InfoPopup from '../../share/InfoPopup'

const StyledButton = styled(ColorButton)``

const Popup = styled(InfoPopup)`
  /* width: 500px;
  height: 400px; */
  display: flex;
  flex-direction: column;

  border: 2px solid #1976d2;
  gap: 10px;
`

const LoadText = styled(Typography)``

const StyledTextField = styled(TextField)`
  .TextField {
    color: white;
  }
`

const ConfirmButton = styled(ColorButton)`
  width: 100px;
  align-self: center;
`

const LoadGameButton = () => {
  const { loadGame } = useSaveLoadContext()

  const [openLoadGamePopup, setOpenLoadGamePopup] = useState(false)

  const [saveFile, setSaveFile] = useState('')

  const handleOpenLoadGamePopup = useCallback(() => {
    setOpenLoadGamePopup(true)
  }, [])

  const handleCloseLoadGamePopup = useCallback(() => {
    setOpenLoadGamePopup(false)
    setSaveFile('')
  }, [])

  const HandleConfirm = useCallback(() => {
    if (R.isEmpty(saveFile.trim())) {
      console.error('Save file cannot be empty')
      return
    }

    loadGame(saveFile)
    handleCloseLoadGamePopup()
  }, [handleCloseLoadGamePopup, loadGame, saveFile])

  return (
    <>
      <StyledButton onClick={handleOpenLoadGamePopup}>Load Game</StyledButton>
      <Popup open={openLoadGamePopup} onClose={handleCloseLoadGamePopup}>
        <LoadText>Please Enter Your Save File Below: </LoadText>
        <StyledTextField
          id='TextField'
          label='Save'
          variant='filled'
          onChange={e => setSaveFile(e.target.value)}
        />
        <ConfirmButton onClick={HandleConfirm}>Confirm</ConfirmButton>
      </Popup>
    </>
  )
}

export default LoadGameButton
