import axios from 'axios'

export function request (config) {
  const instance = new axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 60000
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => Promise.reject(err))

  instance.interceptors.response.use(res => {
    return res.data
  }, err => Promise.reject(err))

  return instance(config)
}