import { Instance, types } from 'mobx-state-tree'

const Error = types.model('Error', {
  code: types.maybeNull(types.optional(types.string, '')),
  message: types.maybeNull(types.optional(types.string, '')),
})

export type ErrorType = Instance<typeof Error>
export { Error }
