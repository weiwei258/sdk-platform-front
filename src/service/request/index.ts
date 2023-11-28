import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Response, HttpStatus, codeStatus, ApiResponse } from './request.type';
import Cookies from 'js-cookie';
import { Authorization } from '@/constants';
import { message } from 'antd';


const TIEMOUT = 50000

const clientRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: TIEMOUT
})

clientRequest.interceptors.request.use(
  (config) => {
    const token = Cookies.get(Authorization)
    if (token && config.headers) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

clientRequest.interceptors.response.use(
  (response: Response<any>) => {

    if (response.data.code === HttpStatus.Unauthorized) {
      const errText = '权限不足或者未登录'
      return Promise.reject(new Error(errText))
    }

    if (response.data.code !== codeStatus.Success) {
      const errText = response.data.message || 'Error'
      message.error(errText)
      return Promise.reject(new Error(errText))
    }

    return response
  },
  (error: AxiosError<ApiResponse>) => {
    const response = error.response

    if (!response) {
      return Promise.reject(error)
    }

    if (response.status === HttpStatus.Unauthorized) {
      const errText = '权限不足或者未登录'
      message.error(errText)
      return Promise.reject(new Error(errText))
    }

    if (response.data.code !== codeStatus.Success) {
      const errText = response.data.message || 'Error'
      message.error(errText)
      return Promise.reject(new Error(errText))
    }

    return Promise.reject(error)
  }
)

const requestCommon = async <T extends any = any>
  (config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const { data } = await clientRequest(config)
  return data
}

export default requestCommon

const serverRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: TIEMOUT
})

serverRequest.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

serverRequest.interceptors.response.use(
  (response: Response<any>) => {
    return response
  },
  (error: AxiosError<ApiResponse>) => {
    const response = error.response
    return response
  }
)

export const serverRequestCommon = async <T extends any = any>
  (config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const { data } = await serverRequest(config)
  return data
}


