import request from '../utils/request'
import { Login } from '../types/api'

const api = {
  //获取验证码
  getCode(params: string) {
    return request.post('/get/code', { tel: params })
  },
  //注册
  getAuthentication(params: Login.Authentication) {
    return request.post('/user/authentication', params)
  },
  //登录接口
  loginIn(params: Login.Params) {
    return request.post('/login', params)
  }
}

export default api
