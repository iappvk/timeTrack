import { Instance, types } from 'mobx-state-tree'

const Groups = types.model('Groups', {
  name: types.optional(types.string, ''),
  icon: types.optional(types.string, ''),
})

export { Groups }
export type GroupsType = Instance<typeof Groups>
