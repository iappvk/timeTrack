import { Instance, onSnapshot, types } from 'mobx-state-tree'
import { storeData, STORE_KEY_ALL_TASK } from '../../utils'
import { Error } from '../models/Error'
import { Settings } from '../models/Settings'
import { Task } from '../models/Task'
import { Transaction } from '../models/Transaction'

let groupBy = (array: any, key: any) => {
  return array.reduce((result: any, obj: any) => {
    ;(result[obj[key]] = result[obj[key]] || []).push(obj)
    return result
  }, {})
}

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
        // const numberOfSeconds = 1200000
        insertTask.push({
          ...params,
          tags: '',
          numberOfSeconds: 0, //numberOfSeconds + 300 * itreation,
          groupId: today.getTime(),
          id: tomorrow.getTime(),
          date: strDate,
        })
        itreation = itreation + 1
      }

      console.log(' The array :' + JSON.stringify(insertTask))

      const own = self
      const retData = [...own.tasks, ...insertTask] as any
      own.tasks = retData
      storeData(retData, STORE_KEY_ALL_TASK)
    },
    updateTask: (timeString: any, msec: any) => {
      const own = self
      const currentTask = own.tasks.filter((item: any) => item.id === own.transaction.id)[0]
      currentTask.numberOfSeconds = msec
      currentTask.timeString = timeString

      const exceptTask = own.tasks.filter((item: any) => item.id !== own.transaction.id)
      const retData = [...exceptTask, currentTask] as any
      own.tasks = retData
      storeData(retData, STORE_KEY_ALL_TASK)
    },
    updateTaskDetails: (params: any) => {
      const own = self
      const currentTask = own.tasks.filter((item: any) => item.id === own.transaction.id)[0]
      currentTask.numberOfSeconds = params.numberOfSeconds
      currentTask.timeString = params.timeString
      currentTask.tags = params.tags
      // currentTask.icon = params.icon
      // currentTask.color = params.color

      const exceptTask = own.tasks.filter((item: any) => item.id !== own.transaction.id)
      own.tasks = [...exceptTask, currentTask] as any
      storeData(own.tasks, STORE_KEY_ALL_TASK)
    },
  }))
  .views((self) => ({
    getTaskList: (filerDate: any) => {
      const strDate = filerDate.toISOString().slice(0, 10)
      const retData = self.tasks.filter((item: any) => item.date === strDate)
      return retData.sort((a, b) => {
        return a.id - b.id
      })
    },
    getReport: (days: number) => {
      const own = self
      const endDate = new Date()

      const startDate = new Date(endDate)
      startDate.setDate(startDate.getDate() - days)

      const retDat = [...own.tasks].filter(
        (item: any) => item.id >= startDate.getTime() && item.id <= endDate.getTime(),
      )

      const retData = groupBy(retDat, 'groupId')
      const objArray = Object.keys(retData).map((item: any) => {
        let numberOfSeconds = 0
        let tags = [] as any
        retData[item].map((dataItem: any) => {
          numberOfSeconds = numberOfSeconds + dataItem.numberOfSeconds
          dataItem.tags !== undefined && dataItem.tags !== '' && tags.push(dataItem.tags)
        })

        return { ...retData[item][0], numberOfSeconds, tags }
      })

      console.log(' The log : ' + JSON.stringify(objArray))
      return objArray
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
