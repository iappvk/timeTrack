import React, { FC } from 'react'
import { TextStyle } from 'react-native'
import styled from 'styled-components/native'
import { color, system, typography } from 'styled-system'
import { CUSTOM_FONT, useBreakPointProps } from '../../utils'
import { ColorOptions, FontSizeOptions, FontWeightOptions } from '../theme/UiThemeProvider'
import styles from './styles'

// YellowBox.ignoreWarnings(['Expected style "lineHeight'])

const extraConfig = {
  textDecorationLine: true,
  textDecorationStyle: true,
  textDecorationColor: {
    property: 'textDecorationColor',
    scale: 'colors',
  },
  includeFontPadding: true,
}

const StyledText = styled.Text`
  ${color}
  ${typography}
  ${system(extraConfig as any)}
`
export type TextTypesOptions = keyof typeof styles
export const TextTypesOptionArray = Object.keys(styles)
type FontWeightValues = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export interface TextProps extends Pick<TextStyle, 'textAlign' | 'textDecorationLine' | 'textDecorationStyle'> {
  type?: TextTypesOptions | Array<TextTypesOptions>
  fontSize?: FontSizeOptions | number | Array<FontSizeOptions | number>
  fontWeight?: FontWeightOptions | FontWeightValues | Array<FontWeightOptions | FontWeightValues>
  color?: ColorOptions | Array<ColorOptions>
  textDecorationColor?: ColorOptions | Array<ColorOptions>
  fontFamily?: string
  title?: string
  value?: string
  includeFontPadding?: boolean
  weight?: 'normal' | 'dense' | Array<'normal' | 'dense'>
  numberOfLines?: number | Array<number>
  letterSpacing?: number | Array<number>
  lineHeight?: number | Array<number>
  opacity?: number | Array<number>
  testID?: string
  hide?: boolean
  fontStyle?: 'normal' | 'italic'
  onPress?: () => void
  selectable?: boolean
  children?: any
}

const Text: FC<TextProps> = (props) => {
  const { children, hide = false, fontStyle, onPress } = props
  const modifiedProps = useBreakPointProps<TextProps>(props)
  const { type = 'h3', weight = 'normal', title, value, ...restProps } = modifiedProps

  if (hide) {
    return null
  }

  return (
    <StyledText
      {...CUSTOM_FONT.Regular}
      onPress={onPress}
      fontStyle={fontStyle}
      {...styles[type as TextTypesOptions][weight as 'normal' | 'dense']}
      {...restProps}>
      {children || title || value}
    </StyledText>
  )
}

Text.defaultProps = {
  selectable: true,
}

export { Text }
