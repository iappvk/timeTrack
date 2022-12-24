import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { Box } from '../../components/Box'
import { Icon } from '../../components/Icon'
import { Spacer } from '../../components/Spacer'
import { Text } from '../../components/Text'
import { useStores } from '../../data/store'
import { getStoreData, STORE_KEY_ALL_TASK } from '../../utils'
import { ROUTES } from '../RootNav'

import { styles } from './styles'
const Splash = ({}: any) => {
  const navigation = useNavigation()
  const { addTaskFromAsync } = useStores((root) => ({
    addTaskFromAsync: root.addTaskFromAsync,
  }))

  const getData = useCallback(async () => {
    const taskList = (await getStoreData(STORE_KEY_ALL_TASK)) as any
    console.log(STORE_KEY_ALL_TASK + ' The keyts ' + JSON.stringify(taskList))
    addTaskFromAsync(taskList)
  }, [])

  useEffect(() => {
    getData()
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.HOME }],
      })
    }, 1000)
  }, [navigation])
  return (
    <Box {...styles.container} padding={16}>
      <Icon id="TIMER2" size={150} color="WHITE" />
      <Spacer direction="vertical" size={24} />
      <Box width="100%" alignItems="center">
        <Text textAlign="center" value="Time Tracker " color="WHITE" fontSize={28} fontWeight="800" />
      </Box>
    </Box>
  )
}

export { Splash }
