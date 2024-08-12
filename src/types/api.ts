//返回结果
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

//分页类型
export interface Pagination {
  pageNum: number
  pageSize: number
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
  export interface PermissionParams {
    children?: PermissionParams[]
    component?: string
    meta: MetaParams
    name: string
    path: string
  }
  export interface MetaParams {
    describe?: string
    icon: string
    id?: string
    name: string
    path: string
  }
}

//账号管理
export namespace User {
  export interface Params {
    active: number
    create_time: number
    id: number
    mobile: string
    name: string
    permissions_id: number
  }
  export interface UserSelect {
    id: string
    name: string
  }
  export interface updateParams {
    permissions_id: number
    name: string
  }
}
