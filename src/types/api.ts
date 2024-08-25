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
  export interface TypeList {
    date: string
    order_money: number
    order_sum: number
  }
  export interface Types {
    num: number
    state: string
  }
  export interface User {
    ip: string
    permission: string
    user_img: string
    user_name: string
  }

  export interface UserInfo {
    typeList: TypeList[]
    types: Types[]
    user: User
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

//陪护师
export namespace Staff {
  export interface Params extends CreateParams {
    create_time: number
  }
  export interface CreateParams {
    id: string
    name: string
    mobile: string
    avatar: string
    sex: string
    age: number
    active: number
  }
  //陪护师照片
  export interface PhotoList {
    name: string
    url: string
  }
}

export namespace Order {
  export interface OrderDetail {
    companion_id: number
    demand: string
    hospital_id: number
    hospital_name: string
    order_start_time: number
    out_trade_no: string
    paidPrice: string
    price: string
    receiveAddress: string
    serviceImg: string
    service_name: string
    service_state: string
    starttime: string
    tel: string
    time_end: string
    trade_state: string
    transaction_id: string
    user_id: string
    code_url: string
    client: {
      id: number
      mobile: string
      name: string
    }
  }
  export interface Params extends OrderDetail {
    companion: {
      age: number
      avatar: string
      id: number
      mobile: string
      name: string
      sex: string
    }
  }
  export interface OrderSearch extends Pagination {
    out_trade_no?: string
  }
}
