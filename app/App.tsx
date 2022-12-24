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

import { UiThemeProvider } from './components/theme/UiThemeProvider'
import { RootStore, StoreProvider } from './data/store'
import { AppStack } from './screens/RootNav'

const App = () => {
  return (
    <StoreProvider value={RootStore}>
      <UiThemeProvider initialThemeName={'light'}>
        <AppStack />
      </UiThemeProvider>
    </StoreProvider>
  )
}

export default App
