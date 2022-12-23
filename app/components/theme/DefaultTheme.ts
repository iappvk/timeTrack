const defaultColors = {
  BRAND_PRIMARY_ACTION: '#EC1C24',
  BRAND_PRIMARY_BG: '#AA0023',

  PRIMARY: '#EC1C24',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GREEN: '#4FAF49',
  TEAL: '#00B6B6',
  SECONDARY_LIGHT: 'rgba(255,255,255,0.7)',
  GREY_SEPARATOR: '#F0F0F0',
  ORANGE: '#FF9E00',
  BLACK_75: 'rgba(0, 0, 0, 0.75)',
  BLACK_STRIKE: '#555555',
  SECONDARY_GREY: '#A8A8A8',
  PRIMARY_GREY: '#757575',
  LIGHT_GREY: '#959595',
  DARK_GREY: '#555555',
  BORDER_COLOR: '#DEDEDE',
  BLACK_LIGHT: '#00000050',
  TRANSPARENT: '#00000000',
  YELLOW: '#FFB900',
  TRANSPARENT45: 'rgba(0, 0, 0, 0.45)',
  RED: '#FF0000',
  TEXT_PRIMARY: 'rgba(33, 33, 33, 1)',
  TEXT_SECONDARY: 'rgba(117, 117, 117, 1)',
  TEXT_TERTIARY: 'rgba(158, 158, 158, 1)',
  TEXT_LINK: 'rgba(35, 105, 255, 1)',
  TEXT_LINK_HOVER: 'rgba(77, 133, 255, 1)',
  TEXT_LINK_CLICKED: 'rgba(33, 97, 235, 1)',
  TEXT_ERROR: 'rgba(201, 73, 73, 1)',
  TEXT_PENDING: 'rgba(230, 142, 0, 1)',
  TEXT_SUCCESS: 'rgba(75, 163, 69, 1)',
  TEXT_INVERSE_PRIMARY: 'rgba(255, 255, 255, 1)',
  TEXT_INVERSE_SECONDARY: 'rgba(255, 255, 255, 0.7)',
  TEXT_INVERSE_TERTIARY: 'rgba(255, 255, 255, 0.54)',
}

const defaultFontSizes = {
  FONT_SIZE_VERY_SMALL: 9,
  FONT_SIZE_SMALLER: 11,
  FONT_SIZE_TINY: 10,
  FONT_SIZE_SMALL: 12,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_LARGE_PLUS: 18,
  FONT_SIZE_DOUBLE_LARGE: 20,
  FONT_SIZE_LARGE_2P: 18,
  FONT_SIZE_LARGE_3P: 20,
  FONT_SIZE_EXTRA_LARGE: 24,
  FONT_SIZE_2_EXTRA_LARGE: 30,
  FONT_SIZE_EXTRA_LARGE_PLUS: 32,
  FONT_SIZE_EXTRA_LONG: 36,
}

const defaultFontWeights = {
  FONT_WEIGHT_LIGHT: 300,
  FONT_WEIGHT_MEDIUM: 'normal',
  FONT_WEIGHT_BOLD: 700,
}

const defaultSpace = {
  TINY: 4,
  SMALLEST: 8,
  SMALL: 12,
  MEDIUM: 16,
  MEDIUM_BIG: 20,
  LARGE: 16,
  BIG: 24,
  BIGGER: 28,
  HUGE: 32,
}

const defaultSizes = {
  ZERO: 0,
  ONE: 1,
  TINY: 8,
  SMALLEST: 16,
  SMALL: 24,
  MEDIUM: 36,
  MEDIUM_2: 48,
  MEDIUM_BIG: 56,
  BIG: 64,
  BIGGER: 128,
  HUGE: 196,
} as any

const defaultBorderWidths = {
  NORMAL: 1,
  THICK: 2,
}

const defaultRadii = {
  SMALL: 4,
  MEDIUM: 8,
  BIG: 16,
}

const defaultOpacities = {
  FAINT: 0.2,
  MEDIUM: 0.5,
  DARK: 0.8,
}

const defaultFonts = {
  AppFontRegular: 'Roboto-Regular',
}

const defaultTheme = {
  colors: defaultColors,
  fontSizes: defaultFontSizes,
  fontWeights: defaultFontWeights,
  space: defaultSpace,
  sizes: defaultSizes,
  borderWidths: defaultBorderWidths,
  radii: defaultRadii,
  opacities: defaultOpacities,
  fonts: defaultFonts,
  breakpoints: [480, 720, 1080],
}

export {
  defaultTheme,
  defaultColors,
  defaultFontSizes,
  defaultFontWeights,
  defaultSpace,
  defaultSizes,
  defaultBorderWidths,
  defaultRadii,
  defaultOpacities,
  defaultFonts,
}
