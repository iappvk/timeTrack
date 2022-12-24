import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, TextInput } from 'react-native'
import { Box, BoxProps } from '../../components/Box'
import { Icon, IconIdsOptionArray } from '../../components/Icon'
import { ModalDialog } from '../../components/Modal'
import { Spacer } from '../../components/Spacer'
import { Text } from '../../components/Text'
import { ColorOptions } from '../../components/theme/UiThemeProvider'
import { useStores } from '../../data/store'
import { ColorsArray } from './AddTask'

const EditTask = ({}: any) => {
  const { updateTaskDetails, transaction } = useStores((root) => ({
    updateTaskDetails: root.updateTaskDetails,
    transaction: root.transaction,
  }))

  const navigation = useNavigation()
  const [taskName, setTaskName] = useState(transaction?.name ?? '')
  const [tags, setTags] = useState(transaction?.tags ?? '')

  const numberOfSeconds = transaction?.numberOfSeconds ?? 0

  const seconds: any = Math.floor((numberOfSeconds / 1000) % 60)
  const minutes: any = Math.floor((numberOfSeconds / (1000 * 60)) % 60)
  const hours: any = Math.floor((numberOfSeconds / (1000 * 60 * 60)) % 24)

  const [hoursInput, setHoursInput] = useState(`${hours > 0 ? hours : ''}`)
  const [minutesInput, setMinutesInput] = useState(`${minutes > 0 ? minutes : ''}` ?? '')
  const [secondsInput, setSecondsInput] = useState(`${seconds > 0 ? seconds : ''}` ?? '')

  const [noOfDays, setNoOfDays] = useState(1)
  const [iconColor, setIconColor] = useState(transaction?.color ?? '#D49CFF')
  const [taskIcon, setTaskIcon] = useState(transaction?.icon ?? 'SMILE')
  const [showModal, setShowModal] = useState(false)

  const renderColor = ({ item }: any) => {
    return (
      <Box
        width={40}
        height={40}
        borderRadius={20}
        borderWidth={item === iconColor ? 2 : 0}
        borderColor="BRAND_PRIMARY_ACTION"
        bg={item as ColorOptions}
        onPress={() => {
          setIconColor(item)
        }}></Box>
    )
  }
  const timeString2ms = (a: any) => {
    let b
    return (
      (a = a.split('.')),
      (b = a[1] * 1 || 0),
      (a = a[0].split(':')),
      b + (a[2] ? a[0] * 3600 + a[1] * 60 + a[2] * 1 : a[1] ? a[0] * 60 + a[1] * 1 : a[0] * 1) * 1e3
    )
  }
  const renderItem = ({ item }: any) => {
    return (
      <Box
        flex={1}
        padding={16}
        margin={8}
        borderRadius={8}
        alignItems="center"
        bg="GREY_SEPARATOR"
        borderWidth={taskIcon === item ? 1 : 0}
        underlayColor="TRANSPARENT45"
        borderColor={iconColor as ColorOptions}
        onPress={() => {
          setTaskIcon(item)
          setShowModal(false)
        }}>
        <Icon id={item} size={22} color="BRAND_PRIMARY_ACTION" />
      </Box>
    )
  }
  return (
    <>
      <Box flex={1} margin={16}>
        <Box justifyContent="center" alignItems="center">
          <Box
            borderRadius={30}
            width={60}
            height={60}
            justifyContent="center"
            alignItems="center"
            backgroundColor={iconColor as ColorOptions}
            underlayColor="TRANSPARENT45"
            onPress={() => {
              setShowModal(true)
            }}>
            <Icon id={taskIcon ?? 'BALL'} size={30} color="WHITE" />
          </Box>
          <Spacer direction="vertical" size={8} />
          <Text value="Choose Icon" color="TEXT_PRIMARY" fontSize={16} />
          <Spacer direction="vertical" size={16} />
          <Text value={transaction?.date} color="TEXT_PRIMARY" fontSize={18} fontWeight="900" />
        </Box>
        <Text color="TEXT_PRIMARY" value="Task Name" fontSize={14} />
        <Spacer direction="vertical" size={8} />
        <TextInput
          placeholderTextColor="#959595"
          placeholder="Task Name"
          returnKeyType="done"
          onChangeText={setTaskName}
          value={taskName}
          style={styles.input}
        />
        <Spacer direction="vertical" size={16} />
        <Text color="TEXT_PRIMARY" value="Add Tags" fontSize={14} />
        <Spacer direction="vertical" size={8} />
        <TextInput
          placeholderTextColor="#959595"
          placeholder="Tags separated by comma"
          returnKeyType="done"
          onChangeText={setTags}
          value={tags}
          style={styles.input}
        />
        <Spacer direction="vertical" size={16} />
        <Box flexDirection="row">
          <Box flex={1}>
            <Text color="TEXT_PRIMARY" value="Hours" fontSize={14} />
            <Spacer direction="vertical" size={8} />
            <TextInput
              placeholderTextColor="#959595"
              placeholder="Hours"
              keyboardType="number-pad"
              returnKeyType="done"
              onChangeText={setHoursInput}
              value={hoursInput}
              style={styles.input}
            />
          </Box>
          <Spacer direction="horizontal" size={8} />
          <Box flex={1}>
            <Text color="TEXT_PRIMARY" value="Minutes" fontSize={14} />
            <Spacer direction="vertical" size={8} />
            <TextInput
              placeholderTextColor="#959595"
              placeholder="Minutes"
              keyboardType="number-pad"
              returnKeyType="done"
              onChangeText={setMinutesInput}
              value={minutesInput}
              style={styles.input}
            />
          </Box>
          <Spacer direction="horizontal" size={8} />
          <Box flex={1}>
            <Text color="TEXT_PRIMARY" value="Seconds" fontSize={14} />
            <Spacer direction="vertical" size={8} />
            <TextInput
              placeholderTextColor="#959595"
              placeholder="Seconds"
              keyboardType="number-pad"
              returnKeyType="done"
              onChangeText={setSecondsInput}
              value={secondsInput}
              style={styles.input}
            />
          </Box>
        </Box>
        <Spacer direction="vertical" size={32} />
        <Box
          bg={'BRAND_PRIMARY_BG'}
          opacity={taskName === '' ? 0.3 : 1}
          borderRadius={8}
          padding={16}
          disabled={taskName === ''}
          underlayColor="TRANSPARENT45"
          onPress={() => {
            const timeString = `${hoursInput === '' ? '00' : hoursInput}:${minutesInput === '' ? '00' : minutesInput}:${
              secondsInput === '' ? '00' : secondsInput
            }`

            console.log(timeString + ' THe tikeString' + timeString2ms(timeString))
            updateTaskDetails({
              timeString,
              numberOfSeconds: timeString2ms(timeString),
              noOfDays,
              icon: taskIcon,
              color: iconColor,
              tags,
            })
            navigation.goBack()
          }}>
          <Text value="UPDATE" textAlign="center" fontSize={16} fontWeight="900" color="WHITE" />
        </Box>
        <ModalDialog
          type="Bottom"
          show={showModal}
          title="Choose Icon & Color"
          isFullWidth={true}
          onDismiss={() => {
            setShowModal(false)
          }}>
          <Box padding={16} minHeight={130} bg="WHITE">
            <Box paddingLeft={16}>
              <FlatList
                keyExtractor={(item: any, index: number) => `color_${index}`}
                data={ColorsArray}
                horizontal
                renderItem={renderColor}
                ItemSeparatorComponent={() => <Spacer direction="horizontal" size={16} />}
              />
            </Box>
            <Spacer direction="vertical" size={32} />
            <Box maxHeight={300}>
              <FlatList
                keyExtractor={(item: any, index: number) => `icon__${index}`}
                data={[...IconIdsOptionArray]}
                numColumns={3}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <Spacer direction="horizontal" size={16} />}
              />
            </Box>
          </Box>
        </ModalDialog>
      </Box>
    </>
  )
}
const styles = {
  input: {
    backgroundColor: 'white',
    height: 40,
    // borderWidth: 1,
    color: '#000',
    borderRadius: 5,
    padding: 8,
  },
  iconBox: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    bg: 'BRAND_PRIMARY_BG',
    underlayColor: 'TRANSPARENT45',
  } as BoxProps,
}

export { EditTask }
