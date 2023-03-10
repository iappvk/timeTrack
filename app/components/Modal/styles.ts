import { Dimensions, Platform, ViewStyle } from 'react-native'
import { BoxProps } from '../Box'
import { ColorOptions } from '../theme/UiThemeProvider'
import { TextProps } from './../Text'

const defaultHeader = {
  paddingHorizontal: 16,
  paddingVertical: 12,
  flexDirection: 'row',
  alignItems: 'center',
  borderTopEndRadius: 16,
  borderTopStartRadius: 16,
  backgroundColor: 'GREY_SEPARATOR',
  overflow: 'hidden',
  justifyContent: 'space-between',
}

const defaulBackground = {
  position: 'absolute',
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  height: Platform.OS === 'web' ? '100vh' : '100%',
  zIndex: -1,
  backgroundColor: 'MODAL_BG',
}

const defaultHeaderTitle = {
  type: 'h2Bold',
  color: 'BLACK_75',
} as TextProps

const styles: any = (theme: any) => {
  return {
    underlayColor: 'MODAL_UNDERLAY' as ColorOptions,
    background: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      zIndex: -1,
      backgroundColor: 'MODAL_BG',
    } as BoxProps,
    containerButton: {
      height: 24,
      width: 24,
      borderRadius: 36 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 32,
    } as BoxProps,

    Bottom: {
      contentContainer: {
        flex: 1,
        paddingTop: 200,
        justifyContent: 'flex-end',
      } as ViewStyle,
      innerContainer: (isFromDropDown: boolean) =>
        ({
          backgroundColor: 'white' as ColorOptions,
          borderTopEndRadius: 16,
          borderTopStartRadius: 16,
          maxHeight: Dimensions.get('window').height - 50,
          flex: undefined,
        } as BoxProps),
      background: {
        ...defaulBackground,
        bottom: 40,
      } as BoxProps,
      containerHeader: {
        ...defaultHeader,
        backgroundColor: theme ? (theme?.brandColor as ColorOptions) : 'GREY_SEPARATOR',
      } as BoxProps,
      headerTitle: {
        ...defaultHeaderTitle,
        color: theme ? (theme?.headingText as ColorOptions) : 'BLACK_21',
      } as TextProps,
    },
    Default: {
      containerHeader: {
        ...defaultHeader,
        backgroundColor: theme ? (theme?.brandColor as ColorOptions) : 'SI_CARD',
      } as BoxProps,
      headerTitle: {
        type: 'h0',
        fontSize: 16,
        // fontWeight: 'BOLD',
        color: theme ? (theme?.headingText as ColorOptions) : 'TEXT_PRIMARY',
      } as TextProps,
    },
  }
}

export default styles
