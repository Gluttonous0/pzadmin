import { Pagination, Results, User } from '../types/api'
import request from '../utils/request'

const api = {
  //获取账号列表
  getAdminList(params: Pagination) {
    return request.get<Results<User.Params>>('/auth/admin', params)
  },
  //获取角色列表
  getSelectAdmin() {
    return request.get<User.UserSelect[]>('/menu/selectlist')
  },
  //账号修改
  updateAdmin(params: User.updateParams) {
    return request.post('/update/user', params)
  }
}
export default api
