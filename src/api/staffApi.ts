import { Order, Pagination, Result, Results, Staff } from '../types/api'
import request from '../utils/request'

const api = {
  //陪护师列表
  getStaffList(params: Pagination) {
    return request.get<Results<Staff.Params>>('/companion/list', params)
  },
  //获取陪护师头像
  getPhotoList() {
    return request.get<Staff.PhotoList[]>('/photo/list')
  },
  //创建陪护师
  addCompanion(params: Staff.CreateParams) {
    return request.post('/companion', params)
  },
  //陪护师删除
  deleteCompanion(params: Staff.Params[]) {
    return request.post('/delete/companion', { id: params })
  },
  //订单列表获取
  getOrderList(params: Order.OrderSearch) {
    return request.get<Results<Order.Params>>('/admin/order', params)
  },
  //更新订单状态
  updateOrder(id: string) {
    return request.post('/update/order', { id })
  }
}
export default api
