import { Menu } from '../types/api'
import request from '../utils/request'

const api = {
  getMenuSelect() {
    return request.get<Menu.MenuSelectItem[]>('/menu/selectlist')
  }
}

export default api
