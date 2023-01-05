import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Dimensions, Platform, ScaledSize } from 'react-native'
import { ThemeContext } from 'styled-components'
import { ColorOptions } from '../components/theme/UiThemeProvider'
const STORE_KEY_LOGIN_TOKEN = 'authToken'
const STORE_KEY_ACCEPT_DISCLAIMER = 'acceptDisclaimer'
const STORE_KEY_ALL_TASK = 'all_task'
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

export const storeData = async (value: any, key: string) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log('e: ', e)
  }
}

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log('e: ', e)
  }
}
export const getStoreData = async (key: string) => {
  try {
    // const keys = await AsyncStorage.getAllKeys()

    // const result = await AsyncStorage.multiGet(keys)
    // console.log(' The keyts ' + JSON.stringify(result))

    const jsonValue = await AsyncStorage.getItem(key)

    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log('*****  error : ', e)
  }
}

const getFormattedTime = (duration: any) => {
  var seconds: any = Math.floor((duration / 1000) % 60),
    minutes: any = Math.floor((duration / (1000 * 60)) % 60),
    hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24)

  // hours = hours < 10 ? '0' + hours : hours
  // minutes = minutes < 10 ? '0' + minutes : minutes
  // seconds = seconds < 10 ? '0' + seconds : seconds

  if (hours > 0) {
    if (minutes > 0) {
      return hours + 'h ' + minutes + 'm'
    }
    return hours + 'h '
  }

  if (minutes > 0) {
    return minutes + 'm'
  }

  return hours + 'h ' + minutes + 'm' + seconds + 's'
}

const getFormattedTime1 = (duration: any) => {
  var seconds: any = Math.floor((duration / 1000) % 60),
    minutes: any = Math.floor((duration / (1000 * 60)) % 60),
    hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return hours + ':' + minutes + ':' + seconds
}

const getRandomColor = () => {
  let maxVal = 0xffffff // 16777215
  let randomNumber = Math.random() * maxVal
  randomNumber = Math.floor(randomNumber)
  const retData = randomNumber.toString(16)
  console.log(' The colour : ' + retData)
  return `#${retData}`
}

const getColourFromTheme = (color: ColorOptions, systemTheme: any) => {
  return systemTheme?.colors[color]
}

export {
  CUSTOM_FONT,
  STORE_KEY_LOGIN_TOKEN,
  STORE_KEY_ACCEPT_DISCLAIMER,
  STORE_KEY_ALL_TASK,
  getColourFromTheme,
  getFormattedTime,
  getFormattedTime1,
  getRandomColor,
}
