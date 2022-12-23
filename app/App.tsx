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

import { UiThemeProvider } from './components/theme/UiThemeProvider'
import { RootStore, StoreProvider } from './data/store'
import { AppStack } from './screens/RootNav'

const App = () => {
  const isDarkTheme = Appearance.getColorScheme() === 'dark'

  return (
    <StoreProvider value={RootStore}>
      <UiThemeProvider initialThemeName={isDarkTheme ? 'dark' : 'light'}>
        <AppStack />
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
