import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Box } from '../../components/Box'
import { Icon } from '../../components/Icon'
import { Spacer } from '../../components/Spacer'
import { Text } from '../../components/Text'
import { useStores } from '../../data/store'

const Settings = ({}: any) => {
  const { clearData } = useStores((root) => ({
    clearData: root.clearData,
  }))
  const navigation = useNavigation()

  return (
    <Box safeArea flex={1} justifyContent="center" alignItems="center">
      <Box
        width="80%"
        flexDirection="row"
        borderRadius={8}
        bg="BRAND_PRIMARY_BG"
        padding={16}
        justifyContent="center"
        alignItems="center"
        underlayColor="TRANSPARENT45"
        onPress={async () => {
          AsyncStorage.clear()
          clearData()
          navigation.goBack()
        }}>
        <Icon id="DELETE" size={22} color="WHITE" />
        <Spacer direction="horizontal" size={8} />
        <Text value="Clear All Task " color="WHITE" fontWeight="800" />
      </Box>
    </Box>
  )
}

export { Settings }
