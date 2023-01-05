import React, { FC, useEffect, useRef } from 'react'
import { Animated, Easing, Platform, StyleSheet, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { withTheme } from 'styled-components/native'
import { getColourFromTheme } from '../../utils'
import { Box } from '../Box'
import { ColorOptions, Theme } from '../theme/UiThemeProvider'

interface SkeletonPropsInternal extends SkeletonProps {
  theme?: Theme
}

interface SkeletonProps {
  /**
   * Determines component's children.
   */
  children: JSX.Element | JSX.Element[]
  /**
   * Determines the color of placeholder. By default is #E1E9EE
   */
  backgroundColor?: ColorOptions
  /**
   * Determines the highlight color of placeholder. By default is #F2F8FC
   */
  highlightColor?: ColorOptions
  /**
   * Determines the animation speed in milliseconds. By default is 800
   */
  speed?: number
  hide?: boolean
  borderRadius?: number
}

const SkeletonInternal: FC<SkeletonPropsInternal> = ({
  children,
  backgroundColor = 'LADING_BG',
  speed = 800,
  highlightColor = 'LADING_HIGHTLIGHT',
  hide,
  theme,
  borderRadius = 10,
}) => {
  const bg = getColourFromTheme(backgroundColor as ColorOptions, theme)
  const hl = getColourFromTheme(highlightColor as ColorOptions, theme)

  const animatedValue = useRef(new Animated.Value(0))
  useEffect(() => {
    animatedValue.current.stopAnimation()
    if (!hide) {
      Animated.loop(
        Animated.timing(animatedValue.current, {
          toValue: 1,
          duration: speed,
          easing: Easing.ease,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ).start()
    }
  }, [animatedValue, speed, hide])

  if (hide) {
    return null
  }

  const getChildren = (element: JSX.Element | JSX.Element[]) => {
    return React.Children.map(element, (child: JSX.Element, index: number) => {
      const { children: skeletonChildren, ...style } = child.props
      if (skeletonChildren) {
        return (
          <Box key={index} {...style}>
            {getChildren(skeletonChildren)}
          </Box>
        )
      } else {
        const width = typeof style?.width === 'number' ? style?.width : theme?.sizes[style?.width] ?? 0
        const translateX = animatedValue.current.interpolate({
          inputRange: [0, 1],
          outputRange: [width * -1.5, width * 1.5],
        })
        return (
          <Box key={index}>
            <Box borderRadius={borderRadius} {...style} {...{ backgroundColor, overflow: 'hidden' }}>
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    transform: [{ translateX }],
                  },
                ]}>
                <LinearGradient
                  colors={[bg, hl, bg] as string[]}
                  useAngle={true}
                  locations={[0.3, 0.5, 0.7]}
                  angle={100}
                  style={styles.linearGradient}
                />
              </Animated.View>
            </Box>
          </Box>
        )
      }
    })
  }

  return <React.Fragment>{getChildren(children)}</React.Fragment>
}

const styles = {
  linearGradient: { flex: 1 } as ViewStyle,
}

export const Skeleton: FC<SkeletonProps> = withTheme(SkeletonInternal)
