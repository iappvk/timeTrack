import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { Box } from '../../components/Box'
import { Icon } from '../../components/Icon'
import { Spacer } from '../../components/Spacer'
import { Text } from '../../components/Text'
import { useStores } from '../../data/store'
import { CUSTOM_FONT, getFormattedTime1 } from '../../utils'
import { ROUTES } from '../RootNav'
const TaskList = ({}: any) => {
  const navigation = useNavigation()
  const { getTaskList, updateTxn, clearData } = useStores((root) => ({
    getTaskList: root.getTaskList,
    length: root.tasks.length,
    updateTxn: root.transaction.updateTxn,
    clearData: root.transaction.clearData,
  }))

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [disableOtherDate, setDisableOtherDate] = useState(false)

  let listData = getTaskList(selectedDate)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      listData = getTaskList(selectedDate)
    }
  }, [isFocused])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Task Tracker',
      headerLeft: () => (
        <Box
          padding={8}
          underlayColor="TRANSPARENT"
          onPress={() => {
            navigation.navigate(ROUTES.SETTING as never)
          }}>
          <Icon id="SETTING" size={22} color="WHITE" />
        </Box>
      ),
      headerRight: () => (
        <Box
          padding={8}
          underlayColor="TRANSPARENT"
          onPress={() => {
            navigation.navigate(ROUTES.REPORT as never)
          }}>
          <Icon id="REPORT" size={22} color="WHITE" />
        </Box>
      ),
    })
  }, [navigation])

  const renderEmpty = () => {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text value="Stay Productive" fontSize={16} color="TEXT_PRIMARY" fontWeight="800" />
        <Spacer direction="vertical" size={8} />
        <Text
          value="Create a new task and get focused"
          fontSize={14}
          color="TEXT_TERTIARY"
          fontWeight="400"
          {...CUSTOM_FONT.SemiBold}
        />
        <Spacer direction="vertical" size={16} />

        <Box
          borderRadius={5}
          onPress={() => {
            navigation.navigate(ROUTES.ADD_TASK as never)
          }}
          padding={8}
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          underlayColor="TRANSPARENT45"
          bg="BRAND_PRIMARY_BG">
          <Icon id="PLUS" size={16} color="WHITE" />
          <Spacer direction="horizontal" size={8} />
          <Text value="New Task " color="WHITE" fontWeight="800" />
        </Box>
      </Box>
    )
  }

  const renderItem = ({ item }: any) => {
    return (
      <Box backgroundColor="WHITE" borderRadius={8}>
        <Box padding={16} flexDirection="row" justifyContent="space-between">
          <Box flexDirection="row" alignItems="center">
            <Box borderRadius={8} bg={item.color} width={30} height={30} justifyContent="center" alignItems="center">
              <Icon id={item.icon} size={16} color="WHITE" />
            </Box>
            <Spacer direction="horizontal" size={16} />
            <Text value={item.name} fontSize={16} fontWeight="600" color="TEXT_PRIMARY" />
          </Box>
          <Box
            borderRadius={15}
            width={30}
            height={30}
            justifyContent="center"
            alignItems="center"
            underlayColor="TRANSPARENT45"
            onPress={() => {
              clearData()
              updateTxn({ ...item })
              navigation.navigate(ROUTES.EDIT_TASK as never)
            }}>
            <Icon id="EDIT" size={22} color="BLACK" />
          </Box>
        </Box>
        <Box height={1} bg="GREY_SEPARATOR" />
        <Box
          flexDirection="row"
          padding={16}
          alignItems="center"
          justifyContent="center"
          underlayColor="TRANSPARENT"
          // disabled={disableOtherDate}
          onPress={() => {
            updateTxn({ ...item })
            navigation.navigate(ROUTES.TIMER as never)
          }}>
          <Text
            value={item.numberOfSeconds > 0 ? getFormattedTime1(item.numberOfSeconds) : 'Start'}
            fontSize={18}
            fontWeight="700"
          />
          <Spacer direction="horizontal" size={8} />
          <Icon id="ARROW_CIRCLE_RIGHT" size={22} color="BLACK" />
        </Box>
      </Box>
    )
  }

  const dateString = () => {
    var today = new Date()
    var diffDays = today.getDate() - selectedDate.getDate()

    return diffDays === 0
      ? 'Today'
      : selectedDate.toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  return (
    <Box safeArea flex={1}>
      <Box height={50} flexDirection="row" bg="BRAND_PRIMARY_BG" alignItems="center" paddingHorizontal={16}>
        <Box
          width={30}
          height={50}
          alignItems="center"
          justifyContent="center"
          underlayColor="TRANSPARENT45"
          onPress={() => {
            const yesterDay = new Date(selectedDate)
            yesterDay.setDate(yesterDay.getDate() - 1)
            var today = new Date()

            var diffDays = today.getDate() - yesterDay.getDate()
            setDisableOtherDate(diffDays !== 0)

            setSelectedDate(yesterDay)
          }}>
          <Icon id="ARROW_LEFT" size={16} color="WHITE" />
        </Box>
        <Box flex={1}>
          <Text textAlign="center" value={dateString()} color="WHITE" fontSize={16} fontWeight="800" />
        </Box>
        <Box
          width={30}
          height={50}
          alignItems="center"
          justifyContent="center"
          underlayColor="TRANSPARENT45"
          onPress={() => {
            const tommorow = new Date(selectedDate)
            tommorow.setDate(tommorow.getDate() + 1)
            setSelectedDate(tommorow)
          }}>
          <Icon id="ARROW_RIGHT" size={16} color="WHITE" />
        </Box>
      </Box>
      <FlatList
        contentContainerStyle={{ flex: 1, margin: 16 }}
        keyExtractor={(item: any, index: number) => `profileTab_${item.id}_${index}`}
        ListEmptyComponent={renderEmpty}
        data={listData}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Spacer direction="vertical" size={16} />}
      />
      {listData.length !== 0 && (
        <Box
          margin={16}
          bg={'BRAND_PRIMARY_BG'}
          flexDirection="row"
          borderRadius={8}
          padding={16}
          justifyContent="center"
          alignContent="center"
          underlayColor="TRANSPARENT45"
          onPress={() => {
            navigation.navigate(ROUTES.ADD_TASK as never)
          }}>
          <Icon id="PLUS" size={16} color="WHITE" />
          <Spacer direction="horizontal" size={8} />
          <Text value="New Task " color="WHITE" fontWeight="800" />
        </Box>
      )}
    </Box>
  )
}

export { TaskList }
