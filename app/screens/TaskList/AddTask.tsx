import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Box, BoxProps } from '../../components/Box'
import { Icon, IconIdsOptionArray } from '../../components/Icon'
import { ModalDialog } from '../../components/Modal'
import { Spacer } from '../../components/Spacer'
import { Text } from '../../components/Text'
import { ColorOptions } from '../../components/theme/UiThemeProvider'
import { useStores } from '../../data/store'

const ColorsArray = [
  '#D49CFF',
  '#553e66',
  '#eed7ff',
  '#7bbfff',
  '#314c66',
  '#cae5ff',
  '#ffc176',
  '#664d2f',
  '#ffe0bb',
  '#ff9494',
  '#a75a55',
  '#ffcaca',
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
]

const AddTask = ({}: any) => {
  const { addTask } = useStores((root) => ({
    addTask: root.addTask,
  }))

  const navigation = useNavigation()
  const [taskName, setTaskName] = useState('')
  const [noOfDays, setNoOfDays] = useState(1)
  const [iconColor, setIconColor] = useState('#D49CFF')
  const [taskIcon, setTaskIcon] = useState('SMILE')
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
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
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
            <Spacer direction="vertical" size={32} />
          </Box>
          <TextInput
            placeholder="Task Name"
            returnKeyType="done"
            onChangeText={setTaskName}
            value={taskName}
            style={styles.input}
            placeholderTextColor="#959595"
          />
          <Spacer direction="vertical" size={32} />
          <Box padding={16} borderRadius={8} backgroundColor="WHITE">
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
              <Box flex={1}>
                <Text
                  numberOfLines={2}
                  color="TEXT_PRIMARY"
                  value="No of days repeat from today?"
                  fontSize={16}
                  fontWeight="600"
                />
              </Box>
              <Spacer direction="horizontal" size={16} />
              <Box flexDirection="row" borderRadius={8} width={110} overflow="hidden" bg="BORDER_COLOR">
                <Box
                  {...styles.iconBox}
                  onPress={() => {
                    if (noOfDays !== 1) {
                      setNoOfDays(noOfDays - 1)
                    }
                  }}>
                  <Icon id="MINUS" color="WHITE" size={16} />
                </Box>
                <Box padding={8} flex={1}>
                  <Text
                    value={`${noOfDays}`}
                    textAlign="center"
                    fontSize={18}
                    fontWeight="900"
                    color="BRAND_PRIMARY_BG"
                  />
                </Box>
                <Box
                  {...styles.iconBox}
                  onPress={() => {
                    setNoOfDays(noOfDays + 1)
                  }}>
                  <Icon id="PLUS" color="WHITE" size={16} />
                </Box>
              </Box>
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
              addTask({ name: taskName, noOfDays, icon: taskIcon, color: iconColor })
              navigation.goBack()
            }}>
            <Text value="CREATE" textAlign="center" fontSize={16} fontWeight="900" color="WHITE" />
          </Box>
        </Box>
      </KeyboardAwareScrollView>
      <ModalDialog
        type="Bottom"
        show={showModal}
        title="Choose Icon & Color"
        isFullWidth={true}
        // headerType={'White_Bg'}
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

export { AddTask, ColorsArray }
