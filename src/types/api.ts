//返回结果
export interface Result<T = any> {
  code: number
  data: T
  msg: string
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
    name: string
  }

  export interface CreateParams {
    userName: string
    passWord: string
  }
  export interface Authentication extends CreateParams {
    validCode: string
  }
}
