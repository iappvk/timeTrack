import { Instance, onSnapshot, types } from 'mobx-state-tree'
import { storeData, STORE_KEY_ALL_TASK } from '../../utils'
import { Error } from '../models/Error'
import { Settings } from '../models/Settings'
import { Task } from '../models/Task'
import { Transaction } from '../models/Transaction'
const Root = types
  .model('Root', {
    tasks: types.optional(types.array(Task), []),
    error: Error,
    settings: Settings,
    transaction: Transaction,
  })
  .actions((self) => ({
    clearData: () => {
      const own = self
      own.tasks = [] as any
    },
    addTaskFromAsync: (taskList: any) => {
      const own = self
      own.tasks = taskList
    },
    addTask: (params: any) => {
      const insertTask = []
      const { noOfDays } = params
      let itreation = 0
      var today = new Date()
      while (noOfDays > itreation) {
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + itreation)
        const strDate = tomorrow.toISOString().slice(0, 10)
        insertTask.push({
          ...params,
          id: 'id' + new Date().getTime(),
          date: strDate,
        })
        itreation = itreation + 1
      }

      const own = self
      own.tasks = [...own.tasks, ...insertTask] as any
      storeData(own.tasks, STORE_KEY_ALL_TASK)
    },
    updateTask: (timeString: any, msec: any) => {
      const own = self
      const currentTask = own.tasks.filter((item: any) => item.id === own.transaction.id)[0]
      currentTask.numberOfSeconds = msec
      currentTask.timeString = timeString

      const exceptTask = own.tasks.filter((item: any) => item.id !== own.transaction.id)
      own.tasks = [...exceptTask, currentTask] as any
    },
  }))
  .views((self) => ({
    getTaskList: (filerDate: any) => {
      const strDate = filerDate.toISOString().slice(0, 10)
      const retData = self.tasks.filter((item: any) => item.date === strDate)
      return retData
    },
  }))

const RootStore = Root.create({
  tasks: [],
  error: { message: '' },
  settings: {},
  transaction: {},
})

onSnapshot(RootStore, (snapshot) => {
  console.log('%c%s', 'color: green; background: yellow; font-size: 14px;', 'SnapShot!:', snapshot)
})

export type RootType = Instance<typeof Root>
export { Root, RootStore }
