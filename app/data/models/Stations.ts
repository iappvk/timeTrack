import { Instance, types } from 'mobx-state-tree'

const Station = types.model('Station', {
  id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
  year: types.optional(types.number, 0),
  color: types.optional(types.string, ''),
  counter: types.optional(types.number, 0),
  pantone_value: types.optional(types.string, ''),
})

export { Station }
export type TaskType = Instance<typeof Station>
