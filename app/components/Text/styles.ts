import { Platform } from 'react-native'
import { TextProps } from './'
import { sanFranciscoSpacing } from './sanFranciscoSpacing'
import { systemDenseWeights } from './systemDenseWeights'
import { systemWeights } from './systemWeights'

const stylesInternal = {
  h0Bold: {
    fontSize: 'FONT_SIZE_LARGE_3P',
    fontWeight: 'FONT_WEIGHT_BOLD',
  } as TextProps,
  h0: {
    fontSize: 'FONT_SIZE_LARGE_3P',
    fontWeight: 'FONT_WEIGHT_MEDIUM',
  } as TextProps,
  h0Light: {
    fontSize: 'FONT_SIZE_LARGE_3P',
    fontWeight: 'FONT_WEIGHT_LIGHT',
  } as TextProps,
  h1Bold: {
    fontSize: 'FONT_SIZE_LARGE_PLUS',
    fontWeight: 'FONT_WEIGHT_BOLD',
  } as TextProps,
  h1: {
    fontSize: 'FONT_SIZE_LARGE_PLUS',
    fontWeight: 'FONT_WEIGHT_MEDIUM',
  } as TextProps,
  h2Bold: {
    fontWeight: 'FONT_WEIGHT_BOLD',
    fontSize: 'FONT_SIZE_LARGE',
  } as TextProps,
  h2: {
    fontWeight: 'FONT_WEIGHT_MEDIUM',
    fontSize: 'FONT_SIZE_LARGE',
  } as TextProps,
  h2Light: {
    fontWeight: 'FONT_WEIGHT_LIGHT',
    fontSize: 'FONT_SIZE_LARGE',
  } as TextProps,
  h3: {
    fontWeight: 'FONT_WEIGHT_MEDIUM',
    fontSize: 'FONT_SIZE_MEDIUM',
  } as TextProps,
  h3Bold: {
    fontWeight: 'FONT_WEIGHT_BOLD',
    fontSize: 'FONT_SIZE_MEDIUM',
  } as TextProps,
  h3Light: {
    fontWeight: 'FONT_WEIGHT_LIGHT',
    fontSize: 'FONT_SIZE_MEDIUM',
  } as TextProps,
  h4Bold: {
    fontWeight: 'FONT_WEIGHT_BOLD',
    fontSize: 'FONT_SIZE_SMALL',
  } as TextProps,
  h4: {
    fontWeight: 'FONT_WEIGHT_MEDIUM',
    fontSize: 'FONT_SIZE_SMALL',
  } as TextProps,
  h4Light: {
    fontWeight: 'FONT_WEIGHT_LIGHT',
    fontSize: 'FONT_SIZE_SMALL',
  } as TextProps,
  h5: {
    fontWeight: 'FONT_WEIGHT_MEDIUM',
    fontSize: 'FONT_SIZE_SMALLER',
  } as TextProps,
  h5Light: {
    fontWeight: 'FONT_WEIGHT_LIGHT',
    fontSize: 'FONT_SIZE_SMALLER',
  } as TextProps,
  h6: {
    fontWeight: 'FONT_WEIGHT_MEDIUM',
    fontSize: 'FONT_SIZE_TINY',
  } as TextProps,
  h6Light: {
    fontWeight: 'FONT_WEIGHT_LIGHT',
    fontSize: 'FONT_SIZE_TINY',
  } as TextProps,
  display4: {
    fontSize: 112,
    lineHeight: 128,
    ...systemWeights.light,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(112) : undefined,
  } as TextProps,
  display3: {
    fontSize: 56,
    lineHeight: 64,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(56) : undefined,
  } as TextProps,
  display2: {
    fontSize: 45,
    lineHeight: 52,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(45) : undefined,
  } as TextProps,
  display1: {
    fontSize: 34,
    lineHeight: 40,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(34) : undefined,
  } as TextProps,
  headline: {
    fontSize: 24,
    lineHeight: 32,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(24) : undefined,
  } as TextProps,
  title: {
    fontSize: 20,
    lineHeight: 28,
    ...systemWeights.semibold,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(20) : undefined,
  },
  title18: {
    fontSize: 18,
    lineHeight: 26,
    ...systemWeights.semibold,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(20) : undefined,
  },
  subheading: {
    fontSize: 16,
    lineHeight: 24,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(16) : undefined,
  } as TextProps,
  body2: {
    fontSize: 14,
    lineHeight: 24,
    ...systemWeights.semibold,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(14) : undefined,
  } as TextProps,
  body1: {
    fontSize: 14,
    lineHeight: 20,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(14) : undefined,
  } as TextProps,
  caption: {
    fontSize: 12,
    lineHeight: 16,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(12) : undefined,
  } as TextProps,
  button: {
    fontSize: 14,
    lineHeight: 20,
    ...systemWeights.semibold,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(14) : undefined,
  },
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(34) : undefined,
  } as TextProps,
  title1: {
    fontSize: 28,
    lineHeight: 34,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(28) : undefined,
  } as TextProps,
  title2: {
    fontSize: 22,
    lineHeight: 28,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(22) : undefined,
  } as TextProps,
  title3: {
    fontSize: 20,
    lineHeight: 25,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(20) : undefined,
  } as TextProps,
  body: {
    fontSize: 17,
    lineHeight: 22,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(17) : undefined,
  } as TextProps,
  callout: {
    fontSize: 16,
    lineHeight: 21,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(16) : undefined,
  } as TextProps,
  subhead: {
    fontSize: 15,
    lineHeight: 20,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(15) : undefined,
  } as TextProps,
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(13) : undefined,
  } as TextProps,
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    ...systemWeights.regular,
    letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(11) : undefined,
  } as TextProps,
}

type TextTypesOptions = keyof typeof stylesInternal
export type WeightTypesOption = 'normal' | 'dense'

type stylesType = {
  [key in TextTypesOptions]: { [weightKey in WeightTypesOption]: any }
}

const styles: stylesType = {
  h0Bold: {
    normal: {
      ...stylesInternal.h0Bold,
    } as TextProps,
    dense: {
      ...stylesInternal.h0Bold,
    },
  },
  h0: {
    normal: {
      ...stylesInternal.h0,
    } as TextProps,
    dense: {
      ...stylesInternal.h0,
    },
  },
  h0Light: {
    normal: {
      ...stylesInternal.h0Light,
    } as TextProps,
    dense: {
      ...stylesInternal.h0Light,
    },
  },
  h1Bold: {
    normal: {
      ...stylesInternal.h1Bold,
    } as TextProps,
    dense: {
      ...stylesInternal.h1Bold,
    },
  },
  h1: {
    normal: {
      ...stylesInternal.h1,
    },
    dense: {
      ...stylesInternal.h1,
    },
  },
  h2Bold: {
    normal: {
      ...stylesInternal.h2Bold,
    },
    dense: {
      ...stylesInternal.h2Bold,
    },
  },
  h2: {
    normal: {
      ...stylesInternal.h2,
    },
    dense: {
      ...stylesInternal.h2,
    },
  },
  h2Light: {
    normal: {
      ...stylesInternal.h2Light,
    },
    dense: {
      ...stylesInternal.h2Light,
    },
  },
  h3: {
    normal: {
      ...stylesInternal.h3,
    },
    dense: {
      ...stylesInternal.h3,
    },
  },
  h3Bold: {
    normal: {
      ...stylesInternal.h3Bold,
    },
    dense: {
      ...stylesInternal.h3Bold,
    },
  },
  h3Light: {
    normal: {
      ...stylesInternal.h3Light,
    },
    dense: {
      ...stylesInternal.h3Light,
    },
  },
  h4Bold: {
    normal: {
      ...stylesInternal.h4Bold,
    },
    dense: {
      ...stylesInternal.h4Bold,
    },
  },
  h4: {
    normal: {
      ...stylesInternal.h4,
    },
    dense: {
      ...stylesInternal.h4,
    },
  },
  h4Light: {
    normal: {
      ...stylesInternal.h4Light,
    },
    dense: {
      ...stylesInternal.h4Light,
    },
  },
  h5: {
    normal: {
      ...stylesInternal.h5,
    },
    dense: {
      ...stylesInternal.h5,
    },
  },
  h5Light: {
    normal: {
      ...stylesInternal.h5Light,
    },
    dense: {
      ...stylesInternal.h5Light,
    },
  },
  h6: {
    normal: {
      ...stylesInternal.h6,
    },
    dense: {
      ...stylesInternal.h6,
    },
  },
  h6Light: {
    normal: {
      ...stylesInternal.h6Light,
    },
    dense: {
      ...stylesInternal.h6Light,
    },
  },
  display4: {
    normal: {
      ...stylesInternal.display4,
    },
    dense: {
      ...stylesInternal.display4,
      ...systemDenseWeights.bold,
      lineHeight: 164,
    },
  },
  display3: {
    normal: {
      ...stylesInternal.display3,
    },
    dense: {
      ...stylesInternal.display3,
      ...systemDenseWeights.bold,
    },
  },
  display2: {
    normal: {
      ...stylesInternal.display2,
    },
    dense: {
      ...stylesInternal.display2,
      ...systemDenseWeights.bold,
    },
  },
  display1: {
    normal: {
      ...stylesInternal.display1,
    },
    dense: {
      ...stylesInternal.display1,
      ...systemDenseWeights.bold,
    },
  },
  headline: {
    normal: {
      ...stylesInternal.headline,
    },
    dense: {
      ...stylesInternal.headline,
      ...systemDenseWeights.bold,
    },
  },
  title: {
    normal: {
      ...stylesInternal.title,
    },
    dense: {
      ...stylesInternal.title,
      ...systemDenseWeights.bold,
      fontSize: 21,
      lineHeight: 36,
      letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(21) : undefined,
    },
  },
  title18: {
    normal: {
      ...stylesInternal.title18,
    },
    dense: {
      ...stylesInternal.title18,
      ...systemDenseWeights.bold,
      fontSize: 21,
      lineHeight: 36,
      letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(21) : undefined,
    },
  },
  subheading: {
    normal: {
      ...stylesInternal.subheading,
    },
    dense: {
      ...stylesInternal.subheading,
      ...systemDenseWeights.bold,
      fontSize: 17,
      lineHeight: 30,
      letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(17) : undefined,
    },
  },
  body2: {
    normal: {
      ...stylesInternal.body2,
    },
    dense: {
      ...stylesInternal.body2,
      ...systemDenseWeights.bold,
      fontSize: 15,
      lineHeight: 30,
      letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(15) : undefined,
    },
  },
  body1: {
    normal: {
      ...stylesInternal.body1,
    },
    dense: {
      ...stylesInternal.body1,
      ...systemDenseWeights.bold,
      fontSize: 15,
      lineHeight: 26,
      letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(15) : undefined,
    },
  },
  caption: {
    normal: {
      ...stylesInternal.caption,
    },
    dense: {
      ...stylesInternal.caption,
      ...systemDenseWeights.bold,
      fontSize: 13,
      lineHeight: 20,
      letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(13) : undefined,
    },
  },
  button: {
    normal: {
      ...stylesInternal.button,
    },
    dense: {
      ...stylesInternal.button,
      ...systemDenseWeights.bold,
      fontSize: 15,
      lineHeight: 26,
      letterSpacing: Platform.OS === 'ios' ? sanFranciscoSpacing(15) : undefined,
    },
  },
  largeTitle: {
    normal: {
      ...stylesInternal.largeTitle,
    },
    dense: {
      ...stylesInternal.largeTitle,
      ...systemDenseWeights.bold,
      lineHeight: 52,
    },
  },
  title1: {
    normal: {
      ...stylesInternal.title1,
    },
    dense: {
      ...stylesInternal.title1,
      ...systemDenseWeights.bold,
      lineHeight: 52,
    },
  },
  title2: {
    normal: {
      ...stylesInternal.title2,
    },
    dense: {
      ...stylesInternal.title2,
      ...systemDenseWeights.bold,
      lineHeight: 43,
    },
  },
  title3: {
    normal: {
      ...stylesInternal.title3,
    },
    dense: {
      ...stylesInternal.title3,
      ...systemDenseWeights.bold,
      lineHeight: 32,
    },
  },
  body: {
    normal: {
      ...stylesInternal.body,
    },
    dense: {
      ...stylesInternal.body,
      ...systemDenseWeights.bold,
      lineHeight: 28,
    },
  },
  callout: {
    normal: {
      ...stylesInternal.callout,
    },
    dense: {
      ...stylesInternal.callout,
      ...systemDenseWeights.bold,
      lineHeight: 26,
    },
  },
  subhead: {
    normal: {
      ...stylesInternal.subhead,
    },
    dense: {
      ...stylesInternal.subhead,
      ...systemDenseWeights.bold,
      lineHeight: 25,
    },
  },
  footnote: {
    normal: {
      ...stylesInternal.footnote,
    },
    dense: {
      ...stylesInternal.footnote,
      ...systemDenseWeights.bold,
      lineHeight: 23,
    },
  },
  caption2: {
    normal: {
      ...stylesInternal.caption2,
    },
    dense: {
      ...stylesInternal.caption2,
      ...systemDenseWeights.bold,
      lineHeight: 16,
    },
  },
}

export default styles
