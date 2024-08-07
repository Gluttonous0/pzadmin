//返回结果
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

//分页类型
export interface Pagination {
  pageNum: string
  pageSize: string
}

//分页返回结果
export interface Results<T = any> {
  list: [T]
  total: number
}

//登录
export namespace Login {
  export interface CreateParams {
    userName: string
    passWord: string
  }
  export interface Authentication extends CreateParams {
    validCode: string
  }
}

//菜单管理
export namespace Menu {
  export interface MenuSelectItem {
    id: number
    label: string
    children?: MenuSelectItem[]
    disabled: boolean
  }

  export interface CreateParams {
    name: string
    permissions: string
    id: string
  }
  export interface MenuList {
    id: number
    name: string
    permission: []
    permissionName: string
  }
}
