import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { Stopwatch } from 'react-native-stopwatch-timer'
import { Box, BoxProps } from '../../components/Box'
import { Icon } from '../../components/Icon'
import { Spacer } from '../../components/Spacer'
import { Text } from '../../components/Text'
import { ColorOptions } from '../../components/theme/UiThemeProvider'
import { useStores } from '../../data/store'

const Timer = ({}: any) => {
  const { clearData, transaction, updateTask } = useStores((root) => ({
    updateTask: root.updateTask,
    transaction: root.transaction,
    clearData: root.transaction.clearData,
  }))
  const navigation = useNavigation()

  const [currentTime, setCurrentTime] = useState(0)
  const [currentMsec, setCurrentMsec] = useState(0)
  const [stopwatchStart, setStopwatchStart] = useState(true)
  const [stopwatchReset, setStopwatchReset] = useState(false)

  const getFormattedTime = (time: any) => {
    setCurrentTime(time)
  }

  const getFormattedMsecs = (duration: any) => {
    // console.log(' The Time :' + duration / 1000)
    /*
    var seconds: any = Math.floor((duration / 1000) % 60),
      minutes: any = Math.floor((duration / (1000 * 60)) % 60),
      hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    console.log(hours + ':' + minutes + ':' + seconds)
    */
    setCurrentMsec(duration)
  }

  const closeAlert = () => {
    Alert.alert(
      'Close screen!',
      'Are you sure, do you want close withour save this session?',
      [
        {
          text: 'Yes',
          onPress: () => {
            clearData()
            navigation.goBack()
          },
        },
        { text: 'No', onPress: () => console.log('No button clicked'), style: 'destructive' },
      ],
      {
        cancelable: true,
      },
    )
  }

  const closeWithSaveAlert = () => {
    Alert.alert(
      'Ebd Timer',
      '',
      [
        { text: 'Cancel', onPress: () => console.log('Yes button clicked'), style: 'destructive' },
        {
          text: 'End',
          onPress: () => {
            updateTask(currentTime, currentMsec)
            clearData()
            navigation.goBack()
          },
        },
      ],
      {
        cancelable: true,
      },
    )
  }

  return (
    <Box safeArea flex={1} bg="BRAND_PRIMARY_BG">
      <Box flex={1} justifyContent="center" alignContent="center">
        <Box alignItems="center" padding={8}>
          <Icon id={(transaction?.icon as any) ?? 'TIMER'} size={84} color={transaction.color as ColorOptions} />
          <Spacer direction="vertical" size={16} />
          <Text value={transaction?.name} color="WHITE" fontWeight="800" fontSize={25} />
        </Box>
        <Stopwatch
          startTime={transaction.numberOfSeconds}
          start={stopwatchStart}
          reset={stopwatchReset}
          options={options}
          getTime={getFormattedTime}
          getMsecs={getFormattedMsecs}
        />
        <Spacer direction="vertical" size={32} />
        <Box alignItems="center" justifyContent="center" flexDirection="row" paddingHorizontal={32}>
          {!stopwatchStart && (
            <Box
              borderColor="WHITE"
              borderWidth={2}
              width={50}
              height={50}
              borderRadius={25}
              alignItems="center"
              justifyContent="center"
              underlayColor="TRANSPARENT45"
              onPress={closeAlert}>
              <Icon id="CLOSE" color="WHITE" size={22} />
            </Box>
          )}
          <Spacer direction="horizontal" size={16} />
          <Box
            width={100}
            height={100}
            borderRadius={50}
            onPress={() => {
              setStopwatchStart(!stopwatchStart)
            }}
            padding={16}
            alignItems="center"
            underlayColor="TRANSPARENT45"
            borderColor="WHITE"
            borderWidth={2}
            justifyContent="center">
            <Icon id={!stopwatchStart ? 'PLAY' : 'PAUSE'} color="WHITE" size={45} />
          </Box>
          <Spacer direction="horizontal" size={16} />
          {!stopwatchStart && (
            <Box
              borderColor="WHITE"
              borderWidth={2}
              borderRadius={25}
              width={50}
              height={50}
              alignItems="center"
              justifyContent="center"
              underlayColor="TRANSPARENT45"
              onPress={closeWithSaveAlert}>
              <Icon id="STOP" color="WHITE" size={22} />
            </Box>
          )}
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
    fontSize: 60,
    // fontWeight: '900',
    fontFamily: 'SFProText-Semibold',
    color: 'white',
  },
}

export { Timer }
