import request, { serverRequestCommon } from '@/service/request'

const prefix = '/app'

export interface App extends AppInfo {
  permission: ('admin' | 'common')[]
}

export const getAppList = (token: string) => {
  return serverRequestCommon<App[]>({
    url: `${prefix}/list`,
    headers: {
      Authorization: token
    }
  })
}

export const requestTest = () => {
  return request<App[]>({
    url: `${prefix}/list`,
  });
}

export interface CreateAppData {
  name: string
}

export interface AppInfo {
  appId: string,
  appKey: string,
  name: string,
}
export const createApp = (data: CreateAppData) => {
  return request<AppInfo>({
    url: `${prefix}`,
    method: 'POST',
    data
  })
}

export const deleteApp = (appId: string) => {
  return request({
    url: `${prefix}`,
    method: 'DELETE',
    data: {
      appId
    }
  })
}
