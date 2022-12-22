import { useObserver } from 'mobx-react'
import { fromPromise } from 'mobx-utils'
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { RootStore, RootType } from './Root'

const StoreContext = createContext<RootType | null>(null)

function useStores<T>(mapStateToProps: (store: RootType) => T): ReturnType<typeof mapStateToProps> {
  const store = useContext(StoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return useObserver(() => mapStateToProps(store))
}

const useAPIData = (fn: (...args: any) => Promise<unknown>, ...args: []) => {
  const argsRef = useRef<any>(args)
  const callAPI = useMemo(() => fromPromise(fn(...argsRef.current)), [fn])

  return useObserver(() => ({
    data: callAPI?.value,
    state: callAPI?.state,
  }))
}

const useLazyApiData = (
  fn: (...args: any) => Promise<unknown>,
  ...args: []
): [(...args: any[]) => void, { data: any; state: 'pending' | 'fulfilled' | 'rejected' | undefined }] => {
  const [running, setRunning] = useState(0)
  const argsRef = useRef<any>(args)
  const callAPI = useMemo(() => (running > 0 ? fromPromise(fn(...argsRef.current)) : undefined), [fn, running])
  const runFunc = useCallback((...args: any[]) => {
    if (args.length > 0) {
      argsRef.current = [...args]
    }
    setRunning((run) => run + 1)
  }, [])
  return [
    runFunc,
    useObserver(() => ({
      data: callAPI?.value,
      state: callAPI?.state,
    })),
  ]
}

const StoreProvider = StoreContext.Provider

export const useStoreData = <Selection, ContextData, Store>(
  context: React.Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection,
) => {
  const value = useContext(context)
  if (!value) {
    throw new Error()
  }
  const store = storeSelector(value)
  return useObserver(() => {
    return dataSelector(store)
  })
}

export function useRootData<Selection>(dataSelector: (store: RootType) => Selection) {
  return useStoreData(StoreContext, (contextData) => contextData!, dataSelector)
}

export { useStores, StoreProvider, RootStore, useAPIData, useLazyApiData }
