import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Box, BoxProps } from '../../components/Box'
import { Icon } from '../../components/Icon'
import { Image } from '../../components/Image'
import { Spacer } from '../../components/Spacer'
import { Text } from '../../components/Text'
import { ColorOptions } from '../../components/theme/UiThemeProvider'
import { useStores } from '../../data/store'
import { CUSTOM_FONT } from '../../utils'
const Detail = ({}: any) => {
  const { getDetail, updateCounter, clearData } = useStores((root) => ({
    getDetail: root.getDetail,
    updateCounter: root.updateCounter,
    clearData: root.clearData,
  }))
  const data = getDetail()
  const resetData = false
  const [counter, setCounter] = useState(data?.counter ?? 0)
  const [counterStart, setCounterStart] = useState(true)

  useEffect(() => {
    counterStart && setTimeout(() => setCounter(counter + 1), 1000)
  }, [counter, counterStart])

  const navigation = useNavigation()

  const getString = () => {
    const retData = {
      counter: `${counter}`,
      title: 'seconds',
    }

    if (counter >= 60) {
      retData.counter = `${(counter / 60).toFixed(2)}`
      retData.title = 'minutes'
    }
    return retData
  }
  return (
    <Box safeArea flex={1}>
      <Box top={-80} position="absolute" width={'100%'} height={428}>
        <Image source={require('../../assets/images/BG.png')} width="100%" height={426} />
      </Box>
      <Box alignItems="center" justifyContent="center" marginTop={100} paddingHorizontal={16}>
        <Box
          position="absolute"
          left={32}
          underlayColor="TRANSPARENT"
          onPress={() => {
            updateCounter({ counter })

            if (resetData) {
              AsyncStorage.clear()
              clearData()
            }
            navigation.goBack()
          }}>
          <Icon id="ARROW_TAIL_LEFT" size={16} color="BLACK" />
        </Box>
        <Text value="Details" fontSize={21} color="TEXT_PRIMARY" fontWeight="700" />
      </Box>
      <Box {...style.listContainer}>
        <Text value="Station Subscribed" fontSize={21} color="TEXT_PRIMARY" fontWeight="700" />
        <Spacer direction="vertical" size={16} />
        <Box {...style.cardBox} bg="WHITE">
          <Text value="ACTIVE FROM" fontSize={16} color="TEXT_PRIMARY" fontWeight="600" />
          <Spacer direction="vertical" size={13} />
          <Box flexDirection="row">
            <Box flex={1}>
              <Box flexDirection="row">
                <Text value={getString().counter} fontSize={36} color="BLACK" fontWeight="700" {...CUSTOM_FONT.Bold} />
                <Text value={getString().title} fontSize={11} color="BLACK" fontWeight="600" {...CUSTOM_FONT.Bold} />
              </Box>
              <Spacer direction="vertical" size={8} />
              <Box flexDirection="row" alignItems="center">
                <Text value="MORE INFO" fontSize={11} color="TEXT_PRIMARY" fontWeight="600" />
                <Spacer direction="horizontal" size={11} />
                <Image source={require('../../assets/images/downArrow.png')} width={21} height={21} />
              </Box>
            </Box>
            <Box flex={1} alignItems="flex-end" justifyContent="flex-start">
              <Box
                width={110}
                borderRadius={15}
                bg={counterStart ? 'BRAND_PRIMARY_BG' : 'GREEN'}
                underlayColor="TRANSPARENT45"
                justifyContent="center"
                alignItems="center"
                padding={8}
                onPress={() => {
                  setCounterStart(!counterStart)
                }}>
                <Text value={counterStart ? 'Stop' : 'Start'} fontSize={12} color="WHITE" fontWeight="600" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const options = {
  container: {
    padding: 5,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  } as BoxProps,
  text: {
    fontSize: 15,
    // fontWeight: '900',
    fontFamily: 'SFProText-Semibold',
    color: 'black',
  },
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
    marginTop: 56,
    flex: 1,
    borderTopLeftRadius: 46,
    borderTopRightRadius: 46,
    paddingHorizontal: 34,
    paddingTop: 34,
    ...shadow,
  } as BoxProps,
  cardBox: {
    padding: 16,
    borderRadius: 16,
    ...shadow,
  } as BoxProps,
  searchBox: {
    padding: 16,
    backgroundColor: '#F0F4F5' as ColorOptions,
    borderRadius: 11,
    // height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  } as BoxProps,
  input: {
    flex: 1,
    // borderWidth: 1,
    color: '#000',
    borderRadius: 5,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#F0F4F5' as ColorOptions,
  } as BoxProps,
}
export { Detail }
