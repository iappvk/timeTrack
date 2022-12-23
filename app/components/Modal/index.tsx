import React, { useContext } from 'react'
import { Modal, SafeAreaView, View } from 'react-native'
import { ThemeContext } from 'styled-components/native'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { Text } from '../Text'
import { ColorOptions } from '../theme/UiThemeProvider'
import styles from './styles'
import { ModalDialogProps, ModalHeaderTypes, ModalTypes } from './types'

const ModalDialog = ({
  type = 'Centered',
  show = false,
  children,
  onDismiss,
  title,
  containerTopPadding,
  isFromDropDown = false,
  theme,
  testID,
}: ModalDialogProps) => {
  const systemTheme = useContext(ThemeContext) as any

  const modalStyle = styles(systemTheme)
  const container = modalStyle[type].contentContainer
  const innerContainer = modalStyle[type].innerContainer(isFromDropDown)
  const background = modalStyle[type].background
  if (containerTopPadding) {
    container.paddingTop = containerTopPadding
  }

  const childComp = (
    <>
      <View style={container} pointerEvents={'box-none'}>
        <SafeAreaView style={innerContainer}>
          <>
            {!!title && <ModalHeader title={title} onDismiss={onDismiss} center={type === 'Centered'} theme={theme} />}
            {children}
          </>
        </SafeAreaView>
      </View>
      <Box {...background} onPress={onDismiss} underlayColor={modalStyle.underlayColor}>
        <View />
      </Box>
    </>
  )

  return (
    <Modal testID={testID} animationType="fade" transparent visible={show} onDismiss={onDismiss} ariaHideApp={false}>
      {childComp}
    </Modal>
  )
}

const ModalHeader = ({ title = '', onDismiss = () => {}, center = false, theme, type = 'Default' }: any) => {
  const modalHeaderStyle = styles(theme)
  const titleStyle = modalHeaderStyle[type].headerTitle
  const headerStyle = modalHeaderStyle[type].containerHeader
  return (
    <Box {...headerStyle}>
      <Text {...titleStyle}>{title}</Text>
      {!center && (
        <Box
          backgroundColor="TEXT_PRIMARY"
          width={26}
          height={26}
          borderRadius={13}
          onPress={onDismiss}
          underlayColor={theme ? (theme?.headingText as ColorOptions) : 'TRANSPARENT'}
          {...modalHeaderStyle.containerButton}>
          <Icon id="CLOSE" size={13} color="WHITE" />
        </Box>
      )}
    </Box>
  )
}

export { ModalTypes, ModalHeaderTypes }
export { ModalDialog }
