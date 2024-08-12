import { Menu, Pagination, Results } from '../types/api'
import request from '../utils/request'

const api = {
  //获取权限列表
  getMenuSelect() {
    return request.get<Menu.MenuSelectItem[]>('/user/getmenu')
  },
  //修改权限
  updatePermissions(params: Menu.CreateParams) {
    return request.post('/user/setmenu', params)
  },
  //获取菜单权限列表
  getMenuList(params: Pagination) {
    return request.get<Results<Menu.MenuList>>('/menu/list', params)
  },
  //用户菜单权限
  getPermissions() {
    return request.get('/menu/permissions')
  }
}
export default api
