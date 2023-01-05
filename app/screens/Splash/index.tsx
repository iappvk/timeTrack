import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { Box } from '../../components/Box'
import { Image } from '../../components/Image'
import { Spacer } from '../../components/Spacer'
import { Text } from '../../components/Text'
import { useStores } from '../../data/store'
import { getStoreData, STORE_KEY_ACCEPT_DISCLAIMER, STORE_KEY_LOGIN_TOKEN } from '../../utils'
import { ROUTES } from '../RootNav'

import { styles } from './styles'
const Splash = ({}: any) => {
  const navigation = useNavigation()

  const { setDataFromAsync, token, disclaimer } = useStores((root) => ({
    setDataFromAsync: root.setDataFromAsync,
    token: root.token,
    disclaimer: root.accetDisclaimer,
  }))

  const getData = useCallback(async () => {
    console.log(' testing ')
    const token = (await getStoreData(STORE_KEY_LOGIN_TOKEN)) as any
    const accetDisclaimer = (await getStoreData(STORE_KEY_ACCEPT_DISCLAIMER)) as any
    console.log(token + ' testing ' + accetDisclaimer)
    setDataFromAsync({ token: token ?? '', accetDisclaimer: accetDisclaimer ?? '' })

    let name = token === null ? ROUTES.LOGIN : ROUTES.HOME

    if (token !== null && accetDisclaimer === null) {
      name = ROUTES.DISCLAIMER
    }
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: name as never }],
      })
    }, 1000)
  }, [])

  useEffect(() => {
    getData()
  }, [navigation])
  return (
    <Box {...styles.container} padding={16}>
      <Image source={require('../../assets/images/logo.png')} height={300} width={300} />
      <Spacer direction="vertical" size={24} />
      <Box width="100%" alignItems="center">
        <Text textAlign="center" value="Test Task" color="BRAND_PRIMARY_BG" fontSize={28} fontWeight="800" />
      </Box>
    </Box>
  )
}

export { Splash }
