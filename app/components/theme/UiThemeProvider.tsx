import React, { FC, useState } from 'react'
import { ThemeProvider } from 'styled-components/native'
import { BorderRadiusProps, ColorProps, FontSizeProps, FontWeightProps, SpaceProps } from 'styled-system'
import { dark } from './DarkTheme'
import {
  defaultBorderWidths,
  defaultColors,
  defaultFonts,
  defaultFontSizes,
  defaultFontWeights,
  defaultOpacities,
  defaultRadii,
  defaultSizes,
  defaultSpace,
  defaultTheme,
} from './DefaultTheme'

export type ColorOptions = keyof typeof defaultColors
export const ColorOptionsArray = Object.keys(defaultColors)
export type FontSizeOptions = keyof typeof defaultFontSizes
export const FontSizeOptionsArray = Object.keys(defaultFontSizes)
export type FontWeightOptions = keyof typeof defaultFontWeights
export const FontWeightOptionsArray = Object.keys(defaultFontWeights)
export type SpaceOptions = keyof typeof defaultSpace
export const SpaceOptionsArray = Object.keys(defaultSpace)
export type SizeOptions = keyof typeof defaultSizes
export const SizeOptionsArray = Object.keys(defaultSizes)
export type BorderWidthOptions = keyof typeof defaultBorderWidths
export const BorderWidthOptionsArray = Object.keys(defaultBorderWidths)
export type RadiiOptions = keyof typeof defaultRadii
export const RadiiOptionsArray = Object.keys(defaultRadii)
export type OpacityOptions = keyof typeof defaultOpacities
export const OpacityOptionsArray = Object.keys(defaultOpacities)
export type Theme = typeof defaultTheme
export type FontOptions = keyof typeof defaultFonts
export const FontOptionsArray = Object.keys(defaultFonts)

type ColorType = {
  [colorKeys in keyof ColorProps]?: keyof typeof defaultColors
}

type FontSizeType = {
  [fontSizeProps in keyof FontSizeProps]?: keyof typeof defaultFontSizes | number
}

type FontWeightType = {
  [fontWeighProps in keyof FontWeightProps]?: keyof typeof defaultFontWeights
}

type SpacePropsType = {
  [spaceProps in keyof SpaceProps]?: keyof typeof defaultSpace | number
}

type RadiiPropsType = {
  [radiiProps in keyof BorderRadiusProps]?: keyof typeof defaultRadii | number
}

export interface ThemeProps extends ColorType, FontSizeType, FontWeightType, SpacePropsType, RadiiPropsType {}

export let themes = {
  light: {
    name: 'light',
    ...defaultTheme,
  } as Theme,
  dark: {
    name: 'dark',
    ...defaultTheme,
    colors: { ...defaultTheme.colors, ...dark.colors },
  } as Theme,
}

interface CustomTheme {
  extends: string
  extraTheme: any
  name: string
}

interface UiThemeProviderProps {
  initialThemeName?: string
  customTheme?: CustomTheme
  children?: any
}

export const UiThemeProvider: FC<UiThemeProviderProps> = ({ children, initialThemeName = 'light', customTheme }) => {
  const [themeName, setTheme] = useState(initialThemeName)
  if (customTheme) {
    const { extraTheme, name } = customTheme
    if (name !== themeName) {
      let currentTheme = { ...(themes[customTheme.extends as keyof typeof themes] ?? themes.light) }
      if (!Object.keys(themes).includes(name)) {
        Object.keys(extraTheme).forEach((key) => {
          currentTheme = {
            ...currentTheme,
            [key]: { ...(currentTheme[key as keyof typeof currentTheme] ?? {}), ...extraTheme[key] },
          }
        })
        themes = { ...themes, [name]: { ...currentTheme, name } }
      }
      setTheme(name)
    }
  }
  return (
    <ThemeProvider theme={{ ...themes[themeName as keyof typeof themes], setTheme, themeName }}>
      {children}
    </ThemeProvider>
  )
}
