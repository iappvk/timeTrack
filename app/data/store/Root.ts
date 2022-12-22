import { Instance, onSnapshot, types } from 'mobx-state-tree'
import { Error } from '../models/Error'
import { Groups } from '../models/Groups'
import { Settings, settingsInitData } from '../models/Settings'
const Root = types
  .model('Root', {
    goups: types.optional(types.array(Groups), []),
    error: Error,
    settings: Settings,
  })
  .actions((self) => ({
    addGroup(params: any): any {},
  }))
  .views((self) => ({
    getGroupList: () => {
      return self.goups
    },
  }))

const RootStore = Root.create({
  goups: [],
  error: { message: '' },
  settings: settingsInitData,
})

onSnapshot(RootStore, (snapshot) => {
  console.log('%c%s', 'color: green; background: yellow; font-size: 14px;', 'SnapShot!:', snapshot)
})

export type RootType = Instance<typeof Root>
export { Root, RootStore }
