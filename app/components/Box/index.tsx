import React, { Children, FC, useContext, useEffect, useState } from 'react'
import { LayoutChangeEvent, YellowBox } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  system,
  variant,
} from 'styled-system'
import { useBreakPointProps } from '../../utils'
import { Spacer } from '../Spacer'
import { BorderWidthOptions, ColorOptions, OpacityOptions, RadiiOptions, SpaceOptions } from '../theme/UiThemeProvider'

YellowBox.ignoreWarnings(['Expected style "shadowOpacity', 'Node of type'])

const extraConfig = {
  shadowColor: {
    property: 'shadowColor',
    scale: 'colors',
  },
  shadowOpacity: {
    property: 'shadowOpacity',
    scale: 'opacities',
  },
  shadowRadius: {
    property: 'shadowRadius',
    scale: 'radii',
  },
  shadowOffset: true,
  elevation: true,
  paddingHorizontal: {
    property: 'paddingHorizontal',
    scale: 'spaces',
  },
  paddingVertical: {
    property: 'paddingVertical',
    scale: 'spaces',
  },
  marginHorizontal: {
    property: 'marginHorizontal',
    scale: 'spaces',
  },
  marginVertical: {
    property: 'marginVertical',
    scale: 'spaces',
  },
  borderTopStartRadius: {
    property: 'borderTopStartRadius',
    scale: 'radii',
  },
  borderTopEndRadius: {
    property: 'borderTopEndRadius',
    scale: 'radii',
  },
}

const StyledSafeAreaView = styled.SafeAreaView<
  ColorProps | SpaceProps | FlexboxProps | BorderProps | LayoutProps | PositionProps
>`
  ${color}
  ${space}
${flexbox}
${layout}
${position}
${variant({
    prop: 'customBorderStyle',
    variants: {
      borderPrimary: {
        borderWidth: 'NORMAL',
        borderColor: 'BLACK',
        borderRadius: 'MEDIUM',
      },
      borderSecondary: {
        borderWidth: 'THICK',
        borderColor: 'BLACK',
        borderRadius: 'BIG',
        borderStyle: 'dashed',
      },
    },
  })}
${border}
${variant({
    prop: 'customShadowStyle',
    variants: {
      shadowPrimary: {
        shadowColor: (props: any) => props.colors.PRIMARY,
        shadowRadius: (props: any) => props.radii.MEDIUM,
        shadowOffset: (props: any) => ({ width: props.sizes.ZERO, height: props.sizes.ONE }),
        shadowOpacity: (props: any) => props.opacities.MEDIUM,
      },
      shadowSecondary: {
        shadowColor: (props: any) => props.colors.RED,
        shadowRadius: (props: any) => props.radii.MEDIUM,
        shadowOpacity: (props: any) => props.opacities.MEDIUM,
        shadowOffset: (props: any) => ({ width: props.sizes.ZERO, height: props.sizes.ONE }),
      },
    },
  })}
${system(extraConfig as any)}
`

const StyledTouchable = styled.TouchableHighlight<
  ColorProps | SpaceProps | FlexboxProps | BorderProps | LayoutProps | PositionProps
>`
  ${color}
  ${space}
  ${flexbox}
  ${layout}
  ${position}
  ${variant({
    prop: 'customBorderStyle',
    variants: {
      borderPrimary: {
        borderWidth: 'NORMAL',
        borderColor: 'BLACK',
        borderRadius: 'MEDIUM',
      },
      borderSecondary: {
        borderWidth: 'THICK',
        borderColor: 'BLACK',
        borderRadius: 'BIG',
        borderStyle: 'dashed',
      },
    },
  })}
  ${border}
  ${variant({
    prop: 'customShadowStyle',
    variants: {
      shadowPrimary: {
        shadowColor: (props: any) => props.colors.PRIMARY,
        shadowRadius: (props: any) => props.radii.MEDIUM,
        shadowOffset: (props: any) => ({ width: props.sizes.ZERO, height: props.sizes.ONE }),
        shadowOpacity: (props: any) => props.opacities.MEDIUM,
        elevation: 10,
      },
      shadowSecondary: {
        shadowColor: (props: any) => props.colors.RED,
        shadowRadius: (props: any) => props.radii.MEDIUM,
        shadowOpacity: (props: any) => props.opacities.MEDIUM,
        shadowOffset: (props: any) => ({ width: props.sizes.ZERO, height: props.sizes.ONE }),
        elevation: 10,
      },
    },
  })}
  ${system(extraConfig as any)}
`
const StyledView = styled.View<ColorProps | SpaceProps | FlexboxProps | BorderProps | LayoutProps | PositionProps>`
  ${color}
  ${space}
  ${flexbox}
  ${layout}
  ${position}
  ${variant({
    prop: 'customBorderStyle',
    variants: {
      borderPrimary: {
        borderWidth: 'NORMAL',
        borderColor: 'BLACK',
        borderRadius: 'MEDIUM',
      },
      borderSecondary: {
        borderWidth: 'THICK',
        borderColor: 'BLACK',
        borderRadius: 'BIG',
        borderStyle: 'dashed',
      },
    },
  })}
  ${border}
  ${variant({
    prop: 'customShadowStyle',
    variants: {
      shadowPrimary: {
        shadowColor: (props: any) => props.colors.PRIMARY,
        shadowRadius: (props: any) => props.radii.MEDIUM,
        shadowOffset: (props: any) => ({ width: props.sizes.ZERO, height: props.sizes.ONE }),
        shadowOpacity: (props: any) => props.opacities.MEDIUM,
        elevation: 10,
      },
      shadowSecondary: {
        shadowColor: (props: any) => props.colors.RED,
        shadowRadius: (props: any) => props.radii.MEDIUM,
        shadowOpacity: (props: any) => props.opacities.MEDIUM,
        shadowOffset: (props: any) => ({ width: props.sizes.ZERO, height: props.sizes.ONE }),
        elevation: 10,
      },
    },
  })}
  ${system(extraConfig as any)}
`
export const customBorderTypes = {
  borderPrimary: 'borderPrimary',
  borderSecondary: 'borderSecondary',
}

export const customShadowTypes = {
  shadowPrimary: 'shadowPrimary',
  shadowSecondary: 'shadowSecondary',
}

interface Aliases {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  f?: number
  ph?: SpaceOptions | number
  pv?: SpaceOptions | number
  w?: string | number
  h?: string | number
}

const AliasMap = {
  justify: 'justifyContent',
  align: 'alignItems',
  direction: 'flexDirection',
  f: 'flex',
  pv: 'paddingVertical',
  ph: 'paddingHorizontal',
  w: 'width',
  h: 'height',
}

type FlexAlignType = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'

export interface BoxProps extends SpaceProps, BorderProps, LayoutProps, Aliases {
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | Array<'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around'>
  alignItems?: FlexAlignType | Array<FlexAlignType>
  alignSelf?: 'auto' | FlexAlignType | Array<'auto' | FlexAlignType>
  aspectRatio?: number | Array<number>
  borderEndWidth?: number | string | Array<number | string>
  borderStartWidth?: number | string | Array<number | string>
  bottom?: number | string | Array<number | string>
  display?: 'none' | 'flex' | Array<'none' | 'flex'>
  end?: number | string | Array<number | string>
  flex?: number | Array<number>
  flexBasis?: number | string | Array<number | string>
  flexDirection?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | Array<'row' | 'column' | 'row-reverse' | 'column-reverse'>
  flexGrow?: number | Array<number>
  flexShrink?: number | Array<number>
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | Array<'wrap' | 'nowrap' | 'wrap-reverse'>
  height?: number | string | Array<number | string>
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | Array<'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'>
  left?: number | string | Array<number | string>
  margin?: number | string | Array<number | string>
  marginBottom?: number | string | Array<number | string>
  marginEnd?: number | string | Array<number | string>
  marginHorizontal?: number | string | Array<number | string>
  marginLeft?: number | string | Array<number | string>
  marginRight?: number | string | Array<number | string>
  marginStart?: number | string | Array<number | string>
  marginTop?: number | string | Array<number | string>
  marginVertical?: number | string | Array<number | string>
  maxHeight?: number | string | Array<number | string>
  maxWidth?: number | string | Array<number | string>
  minHeight?: number | string | Array<number | string>
  minWidth?: number | string | Array<number | string>
  overflow?: 'visible' | 'hidden' | 'scroll' | Array<'visible' | 'hidden' | 'scroll'>
  position?: 'absolute' | 'relative' | Array<'absolute' | 'relative'>
  right?: number | string | Array<number | string>
  start?: number | string | Array<number | string>
  top?: number | string | Array<number | string>
  zIndex?: number | Array<number>
  ID?: string
  width?: number | string | Array<number | string>
  opacity?: OpacityOptions | number | Array<number | OpacityOptions>
  bg?: ColorOptions | Array<ColorOptions>
  backgroundColor?: ColorOptions | Array<ColorOptions>
  underlayColor?: ColorOptions | Array<ColorOptions>
  borderWidth?: BorderWidthOptions | number | Array<BorderWidthOptions | number>
  borderTopWidth?: BorderWidthOptions | number | Array<BorderWidthOptions | number>
  borderBottomWidth?: BorderWidthOptions | number | Array<BorderWidthOptions | number>
  borderLeftWidth?: BorderWidthOptions | number | Array<BorderWidthOptions | number>
  borderRightWidth?: BorderWidthOptions | number | Array<BorderWidthOptions | number>
  borderRadius?: RadiiOptions | number | Array<RadiiOptions | number>
  borderTopLeftRadius?: RadiiOptions | number | Array<RadiiOptions | number>
  borderTopRightRadius?: RadiiOptions | number | Array<RadiiOptions | number>
  borderBottomLeftRadius?: RadiiOptions | number | Array<RadiiOptions | number>
  borderBottomRightRadius?: RadiiOptions | number | Array<RadiiOptions | number>
  borderColor?: ColorOptions | Array<ColorOptions>
  borderTopColor?: ColorOptions | Array<ColorOptions>
  borderBottomColor?: ColorOptions | Array<ColorOptions>
  borderLeftColor?: ColorOptions | Array<ColorOptions>
  borderRightColor?: ColorOptions | Array<ColorOptions>
  borderStyle?: 'solid' | 'dotted' | 'dashed' | Array<'solid' | 'dotted' | 'dashed'>
  shadowColor?: ColorOptions | Array<ColorOptions>
  shadowOpacity?: OpacityOptions | number | Array<OpacityOptions | number>
  shadowRadius?: RadiiOptions | number | Array<RadiiOptions | number>
  padding?: SpaceOptions | number | Array<SpaceOptions | number>
  paddingBottom?: number | SpaceOptions | Array<SpaceOptions | number>
  paddingEnd?: number | SpaceOptions | Array<SpaceOptions | number>
  paddingHorizontal?: number | SpaceOptions | Array<SpaceOptions | number>
  paddingLeft?: number | SpaceOptions | Array<SpaceOptions | number>
  paddingRight?: number | SpaceOptions | Array<SpaceOptions | number>
  paddingStart?: number | SpaceOptions | Array<SpaceOptions | number>
  paddingTop?: number | SpaceOptions | Array<SpaceOptions | number>
  paddingVertical?: number | SpaceOptions | Array<SpaceOptions | number>
  p?: SpaceOptions | number | Array<SpaceOptions | number>
  pl?: SpaceOptions | number | Array<SpaceOptions | number>
  pr?: SpaceOptions | number | Array<SpaceOptions | number>
  pt?: SpaceOptions | number | Array<SpaceOptions | number>
  pb?: SpaceOptions | number | Array<SpaceOptions | number>
  gap?: SpaceOptions | number | Array<SpaceOptions | number>
  customBorderStyle?: keyof typeof customBorderTypes
  customShadowStyle?: keyof typeof customShadowTypes
  disabled?: boolean | Array<boolean>
  onPress?: () => any
  onPressIn?: () => void
  onPressOut?: () => void
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | Array<'box-none' | 'none' | 'box-only' | 'auto'>
  safeArea?: boolean | Array<boolean>
  onHover?: (isHovering: boolean) => void
  hoverColor?: ColorOptions | Array<ColorOptions>
  nativeID?: string
  testID?: string
  onLayout?: (event: LayoutChangeEvent) => void
  accessibilityLabel?: string
  children?: any
}

export const Box: FC<BoxProps> = (props) => {
  const { children } = props
  let modifiedProps = useBreakPointProps<BoxProps>(props)
  modifiedProps = Object.keys(modifiedProps).reduce((acc, item) => {
    let originalValue = modifiedProps[item as keyof typeof modifiedProps]
    if (Object.keys(AliasMap).includes(item)) {
      const originalProp = AliasMap[item as keyof typeof AliasMap]
      return { ...acc, [originalProp]: originalValue }
    } else {
      return { ...acc, [item]: originalValue }
    }
  }, {})
  const {
    gap,
    flexDirection,
    underlayColor: propUnderlayColor,
    safeArea,
    disabled = !props.onPress,
    backgroundColor,
    bg,
    hoverColor,
    onHover,
  } = modifiedProps
  const [currentBg, setCurrentBg] = useState(backgroundColor ?? bg)
  const [isHovering, setIsHovering] = useState(false)
  useEffect(() => {
    if (!isHovering || !hoverColor) {
      setCurrentBg(backgroundColor ?? bg)
    } else if (isHovering && hoverColor) {
      setCurrentBg(hoverColor)
    }
  }, [backgroundColor, bg, hoverColor, isHovering])
  const theme = useContext(ThemeContext)
  let underlayColor = propUnderlayColor
  if (propUnderlayColor && theme?.colors[propUnderlayColor as ColorOptions]) {
    underlayColor = theme?.colors[propUnderlayColor as ColorOptions]
  }
  let contents = children
  let firstIndex: number | undefined
  if (gap) {
    let spacerDirection: 'vertical' | 'horizontal' = 'vertical'
    if (flexDirection && flexDirection.toString().startsWith('row')) {
      spacerDirection = 'horizontal'
    }
    const tempContent = [] as Array<React.ReactNode>
    Children.forEach(children, (child, index) => {
      if (child) {
        if (firstIndex === undefined) {
          firstIndex = index
        } else {
          let currentGap: SpaceOptions | number = gap as SpaceOptions | number
          if (Array.isArray(gap)) {
            currentGap = gap[index - 1]
          }
          tempContent.push(<Spacer key={`gap-${index}`} direction={spacerDirection} size={currentGap} />)
        }
      }
      tempContent.push(child)
    })
    contents = tempContent
  }
  const onMouseEnter = () => {
    // TODO: Need discussion.
    // To stop background color change on hover
    if (disabled) {
      return
    }
    if (hoverColor) {
      setIsHovering(true)
    }
    if (onHover) {
      onHover(true)
    }
  }

  const onMouseLeave = () => {
    // To stop background color change on hover
    if (disabled) {
      return
    }
    if (hoverColor) {
      setIsHovering(false)
    }
    if (onHover) {
      onHover(false)
    }
  }
  const Container: FC<any> = safeArea ? StyledSafeAreaView : modifiedProps.onPress ? StyledTouchable : StyledView
  return (
    <Container
      {...modifiedProps}
      disabled={disabled}
      underlayColor={underlayColor}
      bg={currentBg}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <>{contents}</>
    </Container>
  )
}
