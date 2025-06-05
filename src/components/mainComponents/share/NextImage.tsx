import { styled } from '@mui/material'
import { Box } from '@mui/system'
import blankSvg from '@public/image/icon/icon-blank.svg'
import Image, { ImageProps } from 'next/image'
import { useCallback, useState } from 'react'

import { DEFAULT_ALT } from '@/constants/defaultSetting'

const MainContainer = styled(Box)`
  width: 100%;
  height: 100%;
`

const StyledImage = styled(Image)`
  aspect-ratio: 1;
  width: 100%;
`

const NextImage = (props: NextImageProps) => {
  const { src, alt = DEFAULT_ALT, className, ...rest } = props

  const [imageSrc, setImageSrc] = useState(src)

  const handleError = useCallback(() => {
    setImageSrc(blankSvg)
  }, [])

  return (
    <MainContainer className={className}>
      <StyledImage
        src={imageSrc || ''}
        alt={alt}
        fill={rest.width == null && rest.height == null}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
        onError={handleError}
        {...rest}
      />
    </MainContainer>
  )
}

type NextImageProps = {
  src: string
  alt?: string
  className?: string
} & Omit<ImageProps, 'alt' | 'src'>

export default NextImage
