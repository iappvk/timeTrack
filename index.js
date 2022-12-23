/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import { name as appName } from './app.json'
import App from './app/App'

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs()
AppRegistry.registerComponent(appName, () => App)
