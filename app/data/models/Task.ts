import { Instance, types } from 'mobx-state-tree'

const Task = types.model('Task', {
  id: types.optional(types.number, 0),
  groupId: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
  icon: types.optional(types.string, 'SMILE'),
  color: types.optional(types.string, ''),
  date: types.optional(types.string, ''),
  timeString: types.optional(types.string, ''),
  numberOfSeconds: types.optional(types.number, 0),
  tags: types.optional(types.string, ''),
  tagsArray: types.optional(types.string, ''),
})

export { Task }
export type TaskType = Instance<typeof Task>
