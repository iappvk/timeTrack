import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { ImageResizeMode, ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'
import { layout } from 'styled-system'
import { useBreakPointProps } from '../../utils'
import { Box, BoxProps } from '../Box'
import { Icon, IconOptions } from '../Icon'
import { Skeleton } from '../Skeleton'
import { ColorOptions, FontSizeOptions } from '../theme/UiThemeProvider'

const StyledImage = styled.Image`
  ${layout}
` as any

const Avatar = styled.Image`
  width: ${({ size }: any) => (size ? size : '40px')};
  height: ${({ size }: any) => (size ? size : '40px')};
  background: black;
  border-radius: ${({ size }: any) => (size ? size / 2 : '20px')};
  resize-mode: cover;
` as any

const calculateHeight = (width: number) => {
  const singleUnit = width / 16
  const height = singleUnit * 9
  return { height: `${height}px` }
}

const imageTypes = {
  card: {
    resizeMode: 'contain',
  },
  cardSmall: {
    width: '72px',
    height: '72px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    resizeMode: 'cover',
    borderRadius: '20px',
  },
  carousel: {
    marginTop: 30,
    resizeMode: 'center',
    height: 130,
  },
}

export interface ImageProps {
  type?: keyof typeof imageTypes | Array<keyof typeof imageTypes>
  source: string | any
  resizeMode?: ImageResizeMode | Array<ImageResizeMode>
  width?: string | number | Array<string | number>
  height?: string | number | Array<string | number>
  borderRadius?: string | number | Array<string | number>
  fallbackImage?: number
  defaultIcon?: IconOptions
  bgColor?: ColorOptions
  border?: string
  iconSize?: FontSizeOptions | number
  iconColor?: ColorOptions
  onError?: () => void
  isCircleImage?: boolean
}

export const Image: FC<ImageProps> = (props) => {
  const modifiedProps = useBreakPointProps<ImageProps>(props)
  const {
    source: propSource,
    onError,
    fallbackImage,
    type,
    width = undefined,
    defaultIcon,
    iconSize = 32,
    iconColor = 'PRIMARY',
    bgColor = 'WHITE',
    border = 'solid 0.5px',
    borderRadius = 25,
    isCircleImage = false,
    ...restProps
  } = modifiedProps

  const [loading, setLoading] = useState(typeof propSource === 'string')
  const source: ImageSourcePropType = useMemo(() => {
    const modifiedPropSource = propSource?.default ? propSource?.default : propSource
    return typeof modifiedPropSource !== 'string'
      ? modifiedPropSource
      : {
          uri: modifiedPropSource,
        }
  }, [propSource])
  const [errorOccured, setErrorOccured] = useState(false)

  useEffect(() => {
    if (typeof propSource === 'string' && propSource) {
      setErrorOccured(false)
    }
  }, [propSource])

  const onLoadStart = useCallback(() => {
    setLoading(true)
  }, [])

  const onLoadEnd = useCallback(() => {
    setLoading(false)
  }, [])

  const onErrorImg = useCallback(() => {
    if (onError) {
      onError()
    }
    setErrorOccured(true)
  }, [onError])

  if (type === 'card') {
    if (!width) {
      throw new Error('Width is required')
    }
  }

  if (type === 'avatar') {
    return (
      <Avatar
        size={width as any}
        source={source}
        onError={onError}
        defaultSource={fallbackImage}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        {...restProps}
      />
    )
  }

  if (defaultIcon && errorOccured) {
    return <Icon id={defaultIcon} size={iconSize} color={iconColor} />
  }

  return (
    <Box {...(isCircleImage && styles.circleLogo(bgColor, border, borderRadius))}>
      <StyledImage
        {...imageTypes[type as keyof typeof imageTypes]}
        {...(width && { width: width })}
        {...(width && calculateHeight(parseFloat(width as string)))}
        source={source}
        onError={onErrorImg}
        defaultSource={fallbackImage}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        {...restProps}
      />
      <Box position="absolute">
        <Skeleton hide={!loading}>
          <Box {...restProps} />
        </Skeleton>
      </Box>
    </Box>
  )
}
const styles = {
  circleLogo: (bgColor: ColorOptions, border: string, borderRadius: string | number | Array<string | number>) =>
    ({
      backgroundColor: bgColor as ColorOptions,
      border: border as ColorOptions,
      overflow: 'hidden',
      borderRadius: borderRadius,
    } as BoxProps),
}
