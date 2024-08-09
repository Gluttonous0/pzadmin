import axios from 'axios'
import store from './stroage'
import { Result } from '../types/api'

const http = axios.create({
  baseURL: 'https:/v3pz.itndedu.com/v3pz',
  timeout: 10000
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = store.get('token')
    //不需要添加token的api
    const whiteUrl = ['/get/code', '/user/authentication', '/login']
    if (token && !whiteUrl.includes(config.url as string)) {
      config.headers['x-token'] = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    //接口异常数据需要给用户提示
    const data: Result = response.data
    if (data.code === -1) {
      ElMessage.error(response.data.message)
    }
    if (data.code === -2) {
      store.remove('token')
      store.remove('userInfo')
      window.location.href = window.location.origin + '/'
    }
    if (data.data.token) {
      return data
    }
    return data.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return http.get(url, { params })
  },
  post<T>(url: string, params?: object): Promise<T> {
    return http.post(url, params)
  }
}
