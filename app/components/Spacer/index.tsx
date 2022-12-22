import React, { FC } from 'react'
import { Box } from '../Box'
import { SpaceOptions } from '../theme/UiThemeProvider'

export interface SpacerProps {
  direction?: 'vertical' | 'horizontal'
  size?: SpaceOptions | number
  hide?: boolean
}

export const Spacer: FC<SpacerProps> = ({ direction = 'vertical', size = 0, hide = false }) => {
  const height = direction === 'vertical' ? size : 0
  const width = direction !== 'vertical' ? size : 0
  if (hide) {
    return null
  } else {
    return <Box paddingTop={height} paddingLeft={width} />
  }
}
