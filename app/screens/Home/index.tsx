import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, TextInput } from 'react-native'
import { Box, BoxProps } from '../../components/Box'
import { Icon } from '../../components/Icon'
import { Image } from '../../components/Image'
import { Skeleton } from '../../components/Skeleton'
import { Spacer } from '../../components/Spacer'
import { Text, TextProps } from '../../components/Text'
import { ColorOptions } from '../../components/theme/UiThemeProvider'
import { useLazyApiData, useStores } from '../../data/store'
import { CUSTOM_FONT } from '../../utils'
import { ROUTES } from '../RootNav'
const Home = ({}: any) => {
  const { stationsList, listData, updateTxn } = useStores((root) => ({
    stationsList: root.stations,
    listData: root.listAPI,
    length: root.stations.length,
    updateTxn: root.updateTxn,
  }))
  const navigation = useNavigation()
  const [searchStr, setSearchStr] = useState('')

  const [listAPI, { state }] = useLazyApiData(listData)

  useEffect(() => {
    listAPI()
  }, [])

  const renderEmpty = () => {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text value="No Data found" fontSize={16} color="TEXT_PRIMARY" fontWeight="800" />
      </Box>
    )
  }
  const renderLoadingItem = ({ item }: any) => {
    return (
      <Box>
        <Skeleton>
          <Box height={77} width={Dimensions.get('window').width - 32}></Box>
        </Skeleton>
      </Box>
    )
  }
  const getNameString = (name: string) => {
    return name[0].toUpperCase() + name.substring(1)
  }

  const renderItem = ({ item }: any) => {
    return (
      <Box
        paddingVertical={14}
        borderRadius={8}
        flexDirection="row"
        underlayColor="TRANSPARENT"
        onPress={() => {
          updateTxn({ selectedId: item.id })
          navigation.navigate(ROUTES.DEATIL as never)
        }}>
        <Box width={40}>
          <Image source={require('../../assets/images/Icon.png')} width={35} height={40} />
        </Box>
        <Spacer direction="horizontal" size={25} />
        <Box flex={1}>
          <Text
            value={getNameString(item.name)}
            fontSize={18}
            color="TEXT_PRIMARY"
            fontWeight="600"
            {...CUSTOM_FONT.Bold}
          />
          <Spacer direction="vertical" size={4} />
          <Text
            value={item.pantone_value}
            fontSize={15}
            color={'#ADB7C6' as ColorOptions}
            fontWeight="600"
            {...CUSTOM_FONT.Bold}
          />
        </Box>
      </Box>
    )
  }

  return (
    <Box safeArea flex={1}>
      <Box top={-80} position="absolute" width={'100%'} height={428}>
        <Image source={require('../../assets/images/BG.png')} width="100%" height={426} />
      </Box>
      <Box alignItems="center" marginTop={100}>
        <Text value="Select Station" fontSize={21} color="TEXT_PRIMARY" fontWeight="700" />
      </Box>
      <Box {...style.listContainer}>
        <Box {...style.searchBox}>
          <Icon id="SEARCH" size={16} color={'#ADB7C6' as ColorOptions} />
          <Spacer direction="horizontal" size={16} />
          <TextInput
            placeholderTextColor="#959595"
            placeholder="Search by ID, Name, City"
            returnKeyType="done"
            onChangeText={(e) => setSearchStr(e)}
            value={searchStr}
            style={style.input}
            underlineColorAndroid="transparent"
          />
        </Box>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item: any, index: number) => `tstationList_${item.id}_${index}`}
          ListEmptyComponent={renderEmpty}
          data={state === 'pending' ? [{}, {}, {}] : stationsList}
          renderItem={state === 'pending' ? renderLoadingItem : renderItem}
          ItemSeparatorComponent={() => <Box {...style.separatorLine} />}
        />
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
    marginTop: 56,
    flex: 1,
    borderTopLeftRadius: 46,
    borderTopRightRadius: 46,
    paddingHorizontal: 34,
    paddingTop: 34,
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

  dateNav: {
    height: 50,
    flexDirection: 'row',
    bg: 'BRAND_PRIMARY_BG',
    alignItems: 'center',
    paddingHorizontal: 16,
  } as BoxProps,
  arrowBox: {
    width: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    underlayColor: 'TRANSPARENT45',
  } as BoxProps,
  dateTitle: {
    textAlign: 'center',
    color: 'WHITE',
    fontSize: 16,
    fontWeight: '800',
  } as TextProps,
  newBtn: {
    margin: 16,
    bg: 'BRAND_PRIMARY_BG',
    flexDirection: 'row',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
    underlayColor: 'TRANSPARENT45',
  } as BoxProps,
  btnText: {
    color: 'WHITE',
    fontWeight: '800',
  } as TextProps,
  editBox: {
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    underlayColor: 'TRANSPARENT45',
  } as BoxProps,
  timerBox: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    underlayColor: 'TRANSPARENT',
  } as BoxProps,
  timerTxt: { color: 'TEXT_PRIMARY', fontSize: 18, fontWeight: '700' } as TextProps,
}
export { Home }
