import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { StatusBar } from 'react-native'
import { Back } from '../components/Back'
import { Report } from './Report'
import { Settings } from './Settings'
import { Splash } from './Splash'
import { TaskList } from './TaskList'
import { AddTask } from './TaskList/AddTask'
import { EditTask } from './TaskList/EditTask'
import { Timer } from './Timer'
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
  HOME: 'Home',
  TIMER: 'Timer',
  SETTING: 'setting',
  SPLASH: 'splash',
  ProductList: 'ProductList',
  TABBAR: 'Tabbar',
  ADD_TASK: 'AddTask',
  REPORT: 'Report',
  EDIT_TASK: 'EditTask',
}

const AppStack = () => {
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
            name={ROUTES.SETTING}
            component={Settings}
            options={{
              title: 'Setting',
              headerShown: true,
            }}
          />
          <Stack.Screen name={ROUTES.TIMER} component={Timer} />
          <Stack.Screen
            name={ROUTES.HOME}
            component={TaskList}
            options={{
              title: 'Task List',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name={ROUTES.ADD_TASK}
            component={AddTask}
            options={{
              title: 'Add New Task',
              headerShown: true,
            }}
          />

          <Stack.Screen
            name={ROUTES.EDIT_TASK}
            component={EditTask}
            options={{
              title: 'Update Task',
              headerShown: true,
            }}
          />

          <Stack.Screen
            name={ROUTES.REPORT}
            component={Report}
            options={{
              title: ROUTES.REPORT,
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export { AppStack, ROUTES }
