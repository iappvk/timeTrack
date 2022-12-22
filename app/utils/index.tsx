import { useContext, useEffect, useMemo, useState } from 'react'
import { Dimensions, Platform, ScaledSize } from 'react-native'
import { ThemeContext } from 'styled-components'

const useBreakPoint = (isEnabled: boolean) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'))

  useEffect(() => {
    let onDimensionsChange: any
    if (isEnabled) {
      onDimensionsChange = ({ window }: { window: ScaledSize }) => {
        setDimensions(window)
      }

      Dimensions.addEventListener('change', onDimensionsChange)
    }

    return () => {
      if (isEnabled) {
        onDimensionsChange?.remove()
        // Dimensions.removeEventListener('change', onDimensionsChange)
      }
    }
  }, [isEnabled])
  const theme = useContext(ThemeContext)
  if (isEnabled) {
    const breakpoints: Array<number> = theme?.breakpoints ?? []
    let selectValue = 0
    for (let i = 0; i < breakpoints.length; i++) {
      if (dimensions.width < breakpoints[i]) {
        break
      }
      selectValue++
    }
    return selectValue
  }
  return 0
}

export function useBreakPointProps<T>(props: any): T {
  const isEnabled = useMemo(() => {
    return Object.keys(props)
      .filter((item) => {
        item !== 'children'
      })
      .some((item) => Array.isArray(item))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const breakpoint = useBreakPoint(isEnabled)
  const modifiedProps = !isEnabled
    ? props
    : Object.keys(props)
        .filter((item) => item !== 'children')
        .reduce((acc, item) => {
          let originalValue = props[item as keyof typeof props]
          if (Array.isArray(originalValue)) {
            originalValue =
              breakpoint < originalValue.length ? originalValue[breakpoint] : originalValue[originalValue.length - 1]
          }
          return { ...acc, [item]: originalValue }
        }, {})
  return modifiedProps as T
}

const CUSTOM_FONT = {
  Regular: Platform.select({
    ios: { fontFamily: 'SFProDisplay-Regular' },
    android: { fontFamily: 'Roboto-Regular' },
  }),
  Medium: Platform.select({
    ios: { fontFamily: 'SFProDisplay-Medium' },
    android: { fontFamily: 'Roboto-Medium' },
  }),
  SemiBold: Platform.select({
    ios: { fontFamily: 'SFProText-Semibold' },
    android: { fontFamily: 'Roboto-Medium' },
  }),
  Bold: Platform.select({
    ios: { fontFamily: 'SFProText-Bold' },
    android: { fontFamily: 'Roboto-Bold' },
  }),
}

export { CUSTOM_FONT }
