import { styled, Typography } from '@mui/material'

const Title = styled(Typography)`
  font-size: 32px;
`

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <Title>{title}</Title>
}

type SectionTitleProps = {
  title: string
}

export default SectionTitle
