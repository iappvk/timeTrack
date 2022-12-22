import { Instance, types } from 'mobx-state-tree'

export type THEMES = {
  LIGHT: 'light'
  DARK: 'dark'
}

const Settings = types
  .model('Settings', {
    theme: types.optional(types.string, 'light'),
  })
  .actions((self) => ({
    updateTheme: (theme: string) => {
      self.theme = theme
    },
  }))

const settingsInitData = Settings.create({
  theme: 'light',
})

export { Settings, settingsInitData }
export type SettingsType = Instance<typeof Settings>
