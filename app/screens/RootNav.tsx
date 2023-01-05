import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { StatusBar } from 'react-native'
import { Back } from '../components/Back'
import { Toast } from '../components/Toast'
import { useStores } from '../data/store'
import { Disclaimer } from './Disclaimer'
import { Home } from './Home'
import { Detail } from './Home/detail'
import { Login } from './Login'
import { Splash } from './Splash'
const PRIMERY_COLOR = '#AA0023'
const Stack = createNativeStackNavigator()
const baseHeaderOptions = {
  headerStyle: {
    backgroundColor: PRIMERY_COLOR,
  },
  headerBackTitle: undefined,
  headerTitleStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  headerTintColor: 'white',
  headerBackTitleVisible: false,
  headerForceInset: { vertical: 'never' },
  headerBackImage: Back,
} as any

const ROUTES = {
  SPLASH: 'splash',
  HOME: 'Home',
  DISCLAIMER: 'Disclaimer',
  LOGIN: 'Login',
  DEATIL: 'Detail',
}

const AppStack = () => {
  const { errorMessage, resetMessage } = useStores((root) => ({
    errorMessage: root.error.getMessage(),
    resetMessage: root.error.resetMessage,
  }))

  return (
    <>
      <StatusBar backgroundColor={PRIMERY_COLOR} barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ROUTES.SPLASH}
          screenOptions={{
            ...baseHeaderOptions,
            headerShown: false,
          }}>
          <Stack.Screen name={ROUTES.SPLASH} component={Splash} />

          <Stack.Screen
            name={ROUTES.LOGIN}
            component={Login}
            options={{
              title: 'Login',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name={ROUTES.DEATIL}
            component={Detail}
            options={{
              title: 'Detail',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name={ROUTES.HOME}
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.DISCLAIMER}
            component={Disclaimer}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {errorMessage.message !== '' && (
        <Toast
          message={errorMessage.message}
          hide={errorMessage.message === ''}
          position={'BOTTOM'}
          type={errorMessage.type}
          onDismiss={() => {
            resetMessage()
          }}
        />
      )}
    </>
  )
}

export { AppStack, ROUTES }
