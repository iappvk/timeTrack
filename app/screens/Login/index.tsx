import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { Box, BoxProps } from '../../components/Box'
import { Icon } from '../../components/Icon'
import { Image } from '../../components/Image'
import { Spacer } from '../../components/Spacer'
import { Text, TextProps } from '../../components/Text'
import { useLazyApiData, useStores } from '../../data/store'
import { ROUTES } from '../RootNav'

const Login = ({}: any) => {
  const { login } = useStores((root) => ({
    login: root.loginAPI,
  }))

  const navigation = useNavigation()
  const [listAPI, { state }] = useLazyApiData(login)

  const [userName, setUserName] = useState('eve.holt@reqres.in')
  const [password, setPassword] = useState('cityslicka')
  useEffect(() => {
    if (state === 'fulfilled') {
      navigation.navigate(ROUTES.DISCLAIMER as never)
    }
  })
  return (
    <Box flex={1} bg="WHITE">
      <Box bottom={0} position="absolute" width={'100%'} height={426}>
        <Image source={require('../../assets/images/BG.png')} width="100%" height={426} />
      </Box>
      <Box safeArea>
        <Spacer direction="vertical" size={150} />
        <Box justifyContent="center" alignItems="center">
          <Image source={require('../../assets/images/logo.png')} width={88} height={82} />
          <Spacer direction="vertical" size={24} />
          <Text value="Login" fontSize={21} color="TEXT_PRIMARY" fontWeight="FONT_WEIGHT_BOLD" />
        </Box>
        <Spacer direction="vertical" size={16} />
        <Box {...styles.inputBox}>
          <Icon id="AT" size={16} color="BRAND_PRIMARY_BG" />
          <Spacer direction="horizontal" size={8} />
          <TextInput
            placeholderTextColor="#959595"
            placeholder="User Name"
            returnKeyType="next"
            onChangeText={(e) => setUserName(e)}
            value={userName}
            style={styles.input}
            underlineColorAndroid="transparent"
          />
        </Box>
        <Spacer direction="vertical" size={24} />
        <Box {...styles.inputBox}>
          <Icon id="PASSWORD" size={16} color="BRAND_PRIMARY_BG" />
          <Spacer direction="horizontal" size={8} />
          <TextInput
            placeholderTextColor="#959595"
            placeholder="Password"
            returnKeyType="next"
            onChangeText={(e) => setPassword(e)}
            value={password}
            style={styles.input}
            underlineColorAndroid="transparent"
            secureTextEntry={true}
          />
        </Box>

        <Spacer direction="vertical" size={32} />

        <Box alignItems="center">
          <Box
            {...styles.btnContainer}
            onPress={() => {
              listAPI({ email: userName, password: password })
            }}>
            <Text {...styles.btnTxt} />
            <Spacer direction="horizontal" size={8} />
            <Icon id="ARROW_TAIL_RIGHT" size={16} color="WHITE" />
          </Box>
          <Spacer direction="vertical" size={32} />
          <Text {...styles.forgotPwd} />
        </Box>
      </Box>
    </Box>
  )
}

export { Login }

const styles = {
  input: {
    backgroundColor: 'white',
    height: 40,
    // borderWidth: 1,
    color: '#000',
    borderRadius: 5,
    padding: 8,
  },
  btnContainer: {
    width: 129,
    borderRadius: 30,
    bg: 'BRAND_PRIMARY_BG',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  } as BoxProps,
  btnTxt: { value: 'Login', color: 'WHITE', fontSize: 16, fontWeight: '800' } as TextProps,
  forgotPwd: { value: 'Forgot Password?', color: 'TEXT_PRIMARY', fontSize: 16, fontWeight: '800' } as TextProps,
  inputBox: {
    marginHorizontal: 55,
    alignItems: 'center',
    borderBottomColor: 'TEXT_INPUT_UNDERLINE',
    borderBottomWidth: 2,
    flexDirection: 'row',
  } as BoxProps,
}
