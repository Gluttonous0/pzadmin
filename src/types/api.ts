//返回结果
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}
//登录
export namespace Login {
  export interface Params {
    userName: string
    passWord: string
  }
  export interface Authentication extends Params {
    validCode: string
  }
}
