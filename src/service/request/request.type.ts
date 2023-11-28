import { AxiosResponse } from "axios"

export const enum HttpStatus {
  Success = 200,
  Unauthorized = 401
}

export const enum codeStatus {
  Success = 200,
  Unauthorized = 401
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 定义公共返回类型
export interface Response<T> extends AxiosResponse {
  data: ApiResponse<T>
}

