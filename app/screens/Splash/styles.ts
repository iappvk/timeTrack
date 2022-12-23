import { TextStyle } from 'react-native'
import { BoxProps } from '../../components/Box'
import { TextProps } from '../../components/Text'

export const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'PRIMARY',
  } as BoxProps,
  splashTitle: {
    fontSize: 23,
    color: 'WHITE',
    textAlign: 'center',
  } as TextProps,
  superscript: { fontSize: 8 } as TextStyle,
  strong: { fontSize: 13 } as TextStyle,
}
