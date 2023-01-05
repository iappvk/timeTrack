import { flow, Instance, onSnapshot, types } from 'mobx-state-tree'
import { storeData, STORE_KEY_ACCEPT_DISCLAIMER, STORE_KEY_LOGIN_TOKEN } from '../../utils'
import { list, login } from '../APIHandler'
import { Error } from '../models/Error'
import { Station } from '../models/Stations'
const defautCatchMessage = 'Oops! something sent wrong'

const Root = types
  .model('Root', {
    token: types.optional(types.string, ''),
    accetDisclaimer: types.optional(types.string, ''),
    stations: types.optional(types.array(Station), []),
    selectedId: types.optional(types.number, 0),
    error: Error,
  })
  .actions((self) => ({
    clearData: () => {
      const own = self
      own.stations = [] as any
      own.selectedId = 0
      own.accetDisclaimer = ''
      own.token = ''
    },
    setDataFromAsync: (params: any) => {
      const own = self
      own.token = params.token
      own.accetDisclaimer = params.accetDisclaimer
    },
    setAccetDisclaimer: () => {
      const own = self
      own.accetDisclaimer = 'yes'
      storeData('yes', STORE_KEY_ACCEPT_DISCLAIMER)
    },
    loginAPI: flow(function* loginAPI(parms) {
      try {
        const own = self
        const response = yield login(parms)
        own.token = response.token
        storeData(response.token, STORE_KEY_LOGIN_TOKEN)
      } catch (error: any) {
        const customError = {
          message: defautCatchMessage,
        }
        self.error.setMessage(customError.message, 'NEGATIVE')
        throw customError
      }
    }),
    listAPI: flow(function* listAPI() {
      try {
        const own = self
        const response = yield list()
        console.log(JSON.stringify(response))
        own.stations = response?.data
      } catch (error: any) {
        const customError = {
          message: defautCatchMessage,
        }
        self.error.setMessage(customError.message, 'NEGATIVE')
        throw customError
      }
    }),
    updateTxn: (params: any) => {
      const own = self
      if (params.selectedId) {
        own.selectedId = params.selectedId
      }
    },
    updateCounter: (params: any) => {
      const own = self
      const retData = own.stations.find((item: any) => item.id === own.selectedId)

      if (retData) {
        retData.counter = params.counter
        const restArr = own.stations.filter((item: any) => item.id !== own.selectedId)
        const stations = [...restArr, retData].sort((a, b) => {
          return a.id - b.id
        }) as any
        own.stations = stations
      }
    },
  }))
  .views((self) => ({
    getDetail: () => {
      const retData = self.stations.find((item: any) => item.id === self.selectedId)
      return retData
    },
  }))

const RootStore = Root.create({
  stations: [],
  error: { message: '', type: 'NEGATIVE' },
})

onSnapshot(RootStore, (snapshot) => {
  console.log('%c%s', 'color: green; background: yellow; font-size: 14px;', 'SnapShot!:', snapshot)
})

export type RootType = Instance<typeof Root>
export { Root, RootStore }
