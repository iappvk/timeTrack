import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { StatusBar } from 'react-native'
import { Back } from '../components/Back'
import { Icon } from '../components/Icon'
import { ColorOptions } from '../components/theme/UiThemeProvider'
import { Settings } from './Settings'
import { Splash } from './Splash'
import { TaskList } from './TaskList'
import { AddTask } from './TaskList/AddTask'
import { Timer } from './Timer'
const PRIMERY_COLOR = '#AA0023'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
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
  HOME: 'Home',
  TIMER: 'Timer',
  SETTING: 'setting',
  SPLASH: 'splash',
  ProductList: 'ProductList',
  TABBAR: 'Tabbar',
  ADD_TASK: 'AddTask',
}

const TaskStack = () => {
  return (
    <Stack.Navigator initialRouteName="TaskList" screenOptions={baseHeaderOptions}>
      <Stack.Screen
        name="TaskList"
        component={TaskList}
        options={{
          title: 'TaskList',
        }}
      />
      <Stack.Screen
        name={ROUTES.ADD_TASK}
        component={AddTask}
        options={{
          title: ROUTES.ADD_TASK,
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  )
}

const TimerStack = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.TIMER} screenOptions={baseHeaderOptions}>
      <Stack.Screen
        name={ROUTES.TIMER}
        component={Timer}
        options={{
          title: ROUTES.TIMER,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

const SettingStack = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.SETTING} screenOptions={baseHeaderOptions}>
      <Stack.Screen
        name={ROUTES.SETTING}
        component={Settings}
        options={{
          title: 'Setting',
        }}
      />
    </Stack.Navigator>
  )
}

export const TabBar = () => {
  return (
    <Tab.Navigator initialRouteName={ROUTES.HOME} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={TaskStack}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size }) => <Icon id="LIST" color={color as ColorOptions} size={size} />,
        }}
      />
      <Tab.Screen
        name="Timer"
        component={TimerStack}
        options={{
          tabBarLabel: 'Timer',
          tabBarIcon: ({ color, size }) => <Icon id="TIMER2" color={color as ColorOptions} size={size} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTING}
        component={SettingStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => <Icon id="SETTING" color={color as ColorOptions} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}

const AppStack = () => {
  return (
    <>
      <StatusBar backgroundColor="#EC1C24" barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ROUTES.SPLASH}
          screenOptions={{
            ...baseHeaderOptions,
            headerShown: false,
          }}>
          <Stack.Screen name={ROUTES.SPLASH} component={Splash} />
          <Stack.Screen name={ROUTES.TABBAR} component={TabBar} />
          <Stack.Screen
            name={ROUTES.SETTING}
            component={Settings}
            options={{
              title: 'Setting',
              headerShown: true,
            }}
          />
          <Stack.Screen name={ROUTES.TIMER} component={TimerStack} />
          <Stack.Screen
            name={ROUTES.HOME}
            component={TaskList}
            options={{
              title: 'TaskList',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name={ROUTES.ADD_TASK}
            component={AddTask}
            options={{
              title: ROUTES.ADD_TASK,
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export { AppStack, ROUTES }