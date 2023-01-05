import { ApiEndPoints, axiosService } from './config'

const login = async (params: any) => {
  return axiosService
    .post(`${ApiEndPoints.login}`, params)
    .then(function (response: any) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
}

const list = async () => {
  return axiosService
    .get(`${ApiEndPoints.unknow}`)
    .then(function (response: any) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
}

export { login, list }
