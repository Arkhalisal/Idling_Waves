import { Button, ButtonProps, styled } from '@mui/material'

const CustomButton = styled(Button)`
  border: 1px solid #1976d2;

  :hover {
    background-color: #e3f2fd;
  }
`

const ColorButton = ({ className, ...rest }: ColorButtonProps) => {
  return <CustomButton className={className} {...rest} />
}

type ColorButtonProps = {
  className?: string
} & ButtonProps

export default ColorButton
