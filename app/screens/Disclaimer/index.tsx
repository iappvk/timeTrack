import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Box, BoxProps } from '../../components/Box'
import { Image } from '../../components/Image'
import { Spacer } from '../../components/Spacer'
import { Text, TextProps } from '../../components/Text'
import { ColorOptions } from '../../components/theme/UiThemeProvider'
import { useStores } from '../../data/store'
import { ROUTES } from '../RootNav'
const Disclaimer = ({}: any) => {
  const navigation = useNavigation()

  const { setAccetDisclaimer } = useStores((root) => ({
    setAccetDisclaimer: root.setAccetDisclaimer,
  }))

  const desText = `The information provided by the Zdaly Fuel Network Optimizer app is based on historical data. Data on Zdaly Light is updated once daily at 8:00 a.m. eastern time. Any prospective information is based on that data and should not be relied on as a estimation of future performance. Any future product prices are the manufacturer's suggested retail price (MSRP) only. Sites are independent operators free to set their retail
  price.`

  return (
    <Box safeArea flex={1}>
      <Box top={-80} position="absolute" width={'100%'} height={428}>
        <Image source={require('../../assets/images/BG.png')} width="100%" height={426} />
      </Box>
      <Box marginTop={80} alignItems="center" justifyContent="center">
        <Image source={require('../../assets/images/logo.png')} height={87} width={87} />
      </Box>
      <Box {...style.listContainer}>
        <Text color={'#000000' as ColorOptions} textAlign="center" value="Disclaimer" fontWeight="700" fontSize={16} />
        <Spacer direction="vertical" size={13} />
        <Text
          color={'#000000' as ColorOptions}
          lineHeight={30}
          textAlign="justify"
          value={desText}
          fontWeight="400"
          fontSize={14}
        />
        <Spacer direction="vertical" size={13} />

        <Box alignItems="center">
          <Box
            {...style.btnContainer}
            onPress={() => {
              setAccetDisclaimer()
              navigation.reset({
                index: 0,
                routes: [{ name: ROUTES.HOME as never }],
              })
            }}>
            <Text {...style.btnTxt} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
const shadow = {
  backgroundColor: '#FFF',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  elevation: 2,
}

const style = {
  listContainer: {
    marginTop: 43,
    flex: 1,
    borderTopLeftRadius: 46,
    borderTopRightRadius: 46,
    paddingHorizontal: 34,
    paddingTop: 34,
    ...shadow,
  } as BoxProps,
  btnContainer: {
    width: 129,
    borderRadius: 30,
    bg: 'BRAND_PRIMARY_BG',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    underlayColor: 'TRANSPARENT45',
  } as BoxProps,
  btnTxt: { value: 'I Accept', color: 'WHITE', fontSize: 16, fontWeight: '800' } as TextProps,
}
export { Disclaimer }
