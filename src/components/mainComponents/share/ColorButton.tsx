import { Button, ButtonProps, styled } from '@mui/material'

const CustomButton = styled(Button)``

const ColorButton = ({ className, ...rest }: ColorButtonProps) => {
  return <CustomButton className={className} {...rest} />
}

type ColorButtonProps = {
  className?: string
} & ButtonProps

export default ColorButton
