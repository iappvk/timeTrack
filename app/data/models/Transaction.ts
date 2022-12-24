import { Instance, types } from 'mobx-state-tree'

const Transaction = types
  .model('Transaction', {
    id: types.optional(types.number, 0),
    name: types.optional(types.string, ''),
    icon: types.optional(types.string, ''),
    color: types.optional(types.string, ''),
    date: types.optional(types.string, ''),
    timeString: types.optional(types.string, ''),
    numberOfSeconds: types.optional(types.number, 0),
    tags: types.optional(types.string, ''),
  })
  .actions((self) => ({
    clearData: () => {
      const own = self
      own.id = 0
      own.name = ''
      own.icon = ''
      own.color = ''
      own.date = ''
      own.timeString = ''
      own.numberOfSeconds = 0
      own.tags = ''
    },
    updateTxn: (params: any) => {
      const own = self
      if (params.id) {
        own.id = params.id
      }
      if (params.numberOfSeconds) {
        own.numberOfSeconds = params.numberOfSeconds
      }

      if (params.timeString) {
        own.timeString = params.timeString
      }

      if (params.name) {
        own.name = params.name
      }

      if (params.icon) {
        own.icon = params.icon
      }

      if (params.date) {
        own.date = params.date
      }

      if (params.color) {
        own.color = params.color
      }

      if (params.tags) {
        own.tags = params.tags
      }
    },
  }))

export { Transaction }
export type TransactionType = Instance<typeof Transaction>
