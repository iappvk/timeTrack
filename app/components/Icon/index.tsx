import React, { FC } from 'react'
import { Text } from '../Text'
import { ColorOptions, FontSizeOptions } from '../theme/UiThemeProvider'

export const IconIds = {
  BALL: '\uf1e3',
  BIKE: '\uf206',
  CYCLE: '\uf21c',
  HEAD_PHONE: '\ue824',
  SHOPPING: '\ue825',
  PAINT: '\ue81d',
  EDIT: '\ue81e',
  DRINK: '\ue81f',
  MUSIC: '\ue821',
  LAPTOP: '\uf109',
  MOVIE: '\ue826',
  SMILE: '\uf118',
  ARROW_RIGHT: '\ue80a',
  ARROW_UP: '\ue80b',
  ARROW_DOWN: '\ue808',
  ARROW_LEFT: '\ue809',
  ARROW_TAIL_RIGHT: '\ue819',
  ARROW_TAIL_UP: '\ue81a',
  ARROW_TAIL_DOWN: '\ue816',
  ARROW_TAIL_LEFT: '\ue817',
  ARROW_CIRCLE_RIGHT: '\uf138',
  DELETE: '\ue820',
  TICK: '\ue801',
  TICK_FILL: '\ue802',
  CLOCK: '\ue803',
  HEART: '\ue804',
  HOME: '\ue80c',
  PLAY: '\ue80d',
  PLAY_CIRCLE: '\ue80e',
  TIMER: '\ue811',
  TIMER2: '\ue812',
  PROFILE: '\ue818',
  SHARE: '\ue815',
  FORWARD: '\uf081',
  CALENDER: '\uf133',
  SETTING: '\ue814',
  SEARCH: '\ue807',
  LIST: '\uf0ca',
  CHART: '\ue810',
  CLOSE: '\ue800',
  STOP: '\ue81b',
  PAUSE: '\ue81c',
  PLUS: '\ue828',
  MINUS: '\ue82a',
  PLUS_CIRCLE: '\ue829',
  MENU_VERTICAL: '\ue82c',
  REPORT: '\ue82d',
}

export type IconOptions = keyof typeof IconIds
export const IconIdsOptionArray = Object.keys(IconIds)

interface IconProps {
  id: IconOptions
  size?: FontSizeOptions | number
  color?: ColorOptions
  hide?: boolean
}

export const Icon: FC<IconProps> = ({ id, size = 'FONT_SIZE_MEDIUM', color = 'PRIMARY', hide = false }) => {
  if (hide) {
    return null
  }

  return (
    <Text fontSize={size} color={color} fontFamily="timer">
      {IconIds[id]}
    </Text>
  )
}
