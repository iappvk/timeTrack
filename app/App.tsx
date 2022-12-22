/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { Appearance, StyleSheet } from 'react-native'

import { Box } from './components/Box'
import { Text } from './components/Text'
import { UiThemeProvider } from './components/theme/UiThemeProvider'
import { RootStore, StoreProvider } from './data/store'

const App = () => {
  const isDarkTheme = Appearance.getColorScheme() === 'dark'

  return (
    <StoreProvider value={RootStore}>
      <UiThemeProvider initialThemeName={isDarkTheme ? 'dark' : 'light'}>
        <Box bg="PRIMARY" flex={1}>
          <Text value="Testing" fontSize={30} color="YELLOW" />
        </Box>
      </UiThemeProvider>
    </StoreProvider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

export default App
