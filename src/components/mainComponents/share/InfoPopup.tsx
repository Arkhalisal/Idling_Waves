import { Box, Fade, Modal as MuiModal, ModalProps, styled } from '@mui/material'
import { FC, ReactNode } from 'react'

const StyledMuiModal = styled(MuiModal)`
  .MuiBox-root {
    outline: none;
  }
`

const ModalBox: FC<CustomModalProps> = (props: CustomModalProps) => {
  const { children, className, open, ...rest } = props

  return (
    <StyledMuiModal closeAfterTransition open={open} {...rest}>
      <Fade in={open}>
        <Box className={className}>{children}</Box>
      </Fade>
    </StyledMuiModal>
  )
}

type CustomModalProps = Omit<ModalProps, 'children'> & {
  children?: ReactNode
  className?: string
}

const Modal = styled(ModalBox)`
  background: white;
  border-radius: 0px;

  // ? use inline-block with fit-content to support safari
  display: inline-block;

  // ? make sure it is always in the center without using transform which cause blur text
  height: fit-content;
  width: fit-content;
  position: absolute;
  inset: 0;
  margin: auto;

  border-radius: 10px;
  padding: 20px;
`

const InfoPopup = (props: Props) => {
  const { open, onClose, children, className, ...rest } = props

  return (
    <Modal open={open} onClose={onClose} className={className} {...rest}>
      {children}
    </Modal>
  )
}

type Props = Omit<CustomModalProps, 'children' | 'onClose'> & {
  children: ReactNode
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default InfoPopup
