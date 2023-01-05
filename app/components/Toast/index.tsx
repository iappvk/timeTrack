import React, { useEffect } from 'react'
import { Box } from '../Box'
import { IconOptions } from '../Icon'
import { Text } from '../Text'
import { styles, TypeStyle } from './styles'
export enum TimeOut {
  NEVER = -1,
  NOW = 1,
  ONE_SECOND = 1000,
  THREE_SECONDS = 3000,
  FIVE_SECONDS = 5000,
  SIX_SECONDS = 6000,
  TEN_SECONDS = 10000,
  FIFTEEN_SECONDS = 15000,
  THIRTY_SECONDS = 30000,
}
const ToastPosition = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
}

const ToastType = {
  POSITIVE: 'POSITIVE',
  NEGATIVE: 'NEGATIVE',
}

type ToastProps = {
  testID?: string
  hide: boolean
  type?: keyof typeof ToastType
  position?: keyof typeof ToastPosition
  message?: string
  onDismiss?: () => void
  timeOut?: TimeOut
}

export const Toast = ({
  testID = 'toastMsg',
  type = 'NEGATIVE',
  hide = false,
  message = '',
  position = 'TOP',
  onDismiss,
  timeOut = TimeOut.FIVE_SECONDS,
}: ToastProps) => {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | any
    if (!hide) {
      timeout = setTimeout(onDismiss, timeOut)
    }
    return () => clearTimeout(timeout)
  }, [hide, onDismiss, timeOut])

  if (hide || message === '') {
    return null
  }
  const getIcon = () => {
    const Icons = {
      POSITIVE: 'TICK_FILL',
      NEUTRAL: 'SMILE',
      NEGATIVE: 'CLEAR',
      SESSION: 'TIMER',
    }
    return Icons[type] as IconOptions
  }

  return (
    <Box {...styles[position].containerView} {...TypeStyle[type].tostColor}>
      {/* <Icon id={getIcon()} color="WHITE" size="FONT_SIZE_2_EXTRA_LARGE" />
      <Spacer direction="horizontal" size={4} /> */}
      <Text testID={testID} {...TypeStyle[type].titleText}>
        {message}
      </Text>
    </Box>
  )
}
