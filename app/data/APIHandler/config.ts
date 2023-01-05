import axios from 'axios'

const REACT_APP_BASE_URL = 'https://reqres.in/api/'

const ApiEndPoints = {
  login: `login`,
  unknow: `unknow`,
}

const interceptorsFunc = async (config: any) => {
  return config
}

const errorHandler = (error: any) => {
  Promise.reject(error)
}

const axiosService = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 500000,
})

axiosService.interceptors.request.use(interceptorsFunc, errorHandler)

export { ApiEndPoints, axiosService }
