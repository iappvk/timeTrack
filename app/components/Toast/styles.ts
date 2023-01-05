import { BoxProps } from '../Box'
import { TextProps } from '../Text'

const defaultTypeStyle = {
  titleText: {
    fontSize: 14,
    color: 'TEXT_PRIMARY',
    fontWeight: '800',
    textAlign: 'center',
  } as TextProps,
}

const defaultPositionStyle = {
  position: 'absolute',
  zIndex: 1000,
  paddingHorizontal: 16,
  paddingVertical: 16,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

export const styles = {
  TOP: { containerView: { ...defaultPositionStyle, top: 0 } as BoxProps },
  BOTTOM: {
    containerView: {
      ...defaultPositionStyle,
      bottom: 16,
      right: 8,
      flexWrap: 'wrap',
      borderRadius: 8,
      justifyContent: 'flex-end',
    } as BoxProps,
  },
}

export const TypeStyle = {
  NEGATIVE: {
    titleText: {
      ...defaultTypeStyle.titleText,
      color: 'WHITE',
    } as TextProps,
    tostColor: {
      backgroundColor: 'RED',
    } as BoxProps,
  },
  POSITIVE: {
    titleText: {
      // ...defaultTypeStyle.titleText,
      color: 'WHITE',
    } as TextProps,
    tostColor: {
      backgroundColor: 'GREEN',
    } as BoxProps,
  },
}
