import { Instance, types } from 'mobx-state-tree'

const Task = types.model('Task', {
  id: types.string,
  name: types.optional(types.string, ''),
  icon: types.optional(types.string, ''),
  color: types.optional(types.string, ''),
  date: types.optional(types.string, ''),
  timeString: types.optional(types.string, ''),
  numberOfSeconds: types.optional(types.number, 0),
})

export { Task }
export type TaskType = Instance<typeof Task>
