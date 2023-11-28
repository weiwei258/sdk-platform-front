import request from '@/service/request'

const prefix = '/user'

export type LoginType = {
  account: string;
  password: string;
};

export type ResgisterType = {
  nickname: string;
  account: string;
  password: string;
}

export const loginRequest = (data: LoginType) => {
  return request({
    url: `${prefix}/login`,
    method: 'POST',
    data
  })
}

export const registerRequest = (data: ResgisterType) => {
  return request({
    url: `${prefix}/register`,
    method: 'POST',
    data
  })
}

