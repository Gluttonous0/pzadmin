import { Pagination, Results, Staff } from '../types/api'
import request from '../utils/request'

const api = {
  //陪护师列表
  getStaffList(params: Pagination) {
    return request.get<Results<Staff.Params>>('/companion/list', params)
  }
}
export default api
