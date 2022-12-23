import { ReactElement } from 'react'

export const ModalTypes = {
  Bottom: 'Bottom',
  Centered: 'Centered',
  CenteredWrap: 'CenteredWrap',
  TopMenu: 'TopMenu',
  Right: 'Right',
  CenteredWrapBottom: 'CenteredWrapBottom',
}

export const ModalHeaderTypes = {
  Default: 'Default',
  White_Bg: 'White_Bg',
}

export interface ModalDialogProps {
  ID?: string
  show?: boolean
  title?: string
  headerType?: keyof typeof ModalHeaderTypes
  type?: keyof typeof ModalTypes
  scrollHorizontal?: boolean
  isFullWidth?: boolean
  onClose?: () => void
  onDismiss?: () => void
  children?: ReactElement | ((showDialog: (show: boolean) => void) => ReactElement)
  isFromDropDown?: boolean
  containerTopPadding?: any
  theme?: any
  testID?: string
}

export interface ModalDialogHeaderProps {
  title?: string
  onDismiss?: () => void
  center?: boolean
  type?: keyof typeof ModalHeaderTypes
}
