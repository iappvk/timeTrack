import React, { useState } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { Box } from '../../components/Box'
import { Icon } from '../../components/Icon'
import { Spacer } from '../../components/Spacer'
import { Text } from '../../components/Text'
import { ColorOptions } from '../../components/theme/UiThemeProvider'
import { useStores } from '../../data/store'
import { getFormattedTime, getRandomColor } from '../../utils'

const Report = ({}: any) => {
  const { getReport } = useStores((root) => ({
    getReport: root.getReport,
  }))

  const [currentFilter, setCurrentFilter] = useState(7)
  const listData = getReport(currentFilter)
  const filterData = [
    { id: 7, title: '7 Days' },
    { id: 15, title: '15 Days' },
    { id: 30, title: '30 Days' },
  ]

  const renderEmpty = () => {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text value="No Task yet created" fontSize={16} color="TEXT_PRIMARY" fontWeight="800" />
      </Box>
    )
  }

  const renderItem = ({ item }: any) => {
    return (
      <Box backgroundColor="WHITE" borderRadius={8}>
        <Box padding={16} flexDirection="row">
          <Box flexDirection="row">
            <Box borderRadius={8} bg={item.color} width={60} height={60} justifyContent="center" alignItems="center">
              <Icon id={item.icon} size={30} color="WHITE" />
            </Box>
            <Spacer direction="horizontal" size={16} />
            <Box>
              <Text value={item.name} fontSize={19} color="TEXT_PRIMARY" fontWeight="800" />
              <Spacer direction="vertical" size={4} />
              <Box flexDirection="row" alignItems="center">
                <Text value={`Total Time : `} fontSize={16} fontWeight="400" color="TEXT_PRIMARY"></Text>
                <Text
                  value={`${getFormattedTime(item.numberOfSeconds)}`}
                  fontSize={16}
                  fontWeight="600"
                  color="TEXT_PRIMARY"
                />
              </Box>
              <Spacer direction="vertical" size={4} />
              {item.tags.length > 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: Dimensions.get('window').width - 100,
                    paddingRight: 8,
                  }}>
                  {item.tags.map((item: any) => {
                    return (
                      <Box borderRadius={4} margin={4} padding={4} bg={getRandomColor() as ColorOptions}>
                        <Text value={item} color="WHITE" fontWeight={'600'} />
                      </Box>
                    )
                  })}
                </View>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box safeArea flex={1} margin={16}>
      <Box
        flexDirection="row"
        borderRadius={4}
        overflow="hidden"
        justifyContent="space-evenly"
        borderColor="BLACK"
        borderWidth={0}>
        {filterData.map((item: any) => {
          return (
            <Box
              padding={8}
              bg={currentFilter === item.id ? 'BRAND_PRIMARY_BG' : 'WHITE'}
              f={1}
              underlayColor="TRANSPARENT45"
              onPress={() => {
                setCurrentFilter(item.id)
              }}>
              <Text textAlign="center" value={item.title} color={currentFilter === item.id ? 'WHITE' : 'BLACK'} />
            </Box>
          )
        })}
      </Box>
      <Spacer direction="vertical" size={16} />
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        keyExtractor={(item: any, index: number) => `Report_${index}`}
        ListEmptyComponent={renderEmpty}
        data={listData}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Spacer direction="vertical" size={16} />}
      />
    </Box>
  )
}

export { Report }
