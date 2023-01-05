import { Instance, types } from 'mobx-state-tree'

const Error = types
  .model('Error', {
    type: types.optional(types.string, ''),
    title: types.optional(types.string, ''),
    message: types.optional(types.string, ''),
  })
  .actions((self) => ({
    setMessage(message: string, type: string) {
      self.type = type
      self.message = message
    },
    resetMessage() {
      self.type = 'NEGATIVE'
      self.message = ''
    },
  }))
  .views((self) => ({
    getMessage(): any {
      return {
        title: self.title,
        type: self.type,
        message: self.message,
      }
    },
  }))

export type ErrorType = Instance<typeof Error>
export { Error }
