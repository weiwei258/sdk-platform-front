import { serverRequestCommon } from "./request"
import { TransportCategory } from '@eagle-tracker/types';

export const ckeckTokenRequest = (token: string | undefined) => {
  return serverRequestCommon<boolean>({
    url: `/user/checkToken`,
    method: 'POST',
    data: {
      token
    }
  })
}

export interface LogsParams {
  category:  TransportCategory;
  appId: string;
}
export const getLogs = <T = any>(token: string, logsParams: LogsParams) => {
  return serverRequestCommon<T>({
    url: '/logs',
    params: logsParams,
    headers: {
      Authorization: token
    }
  })
}
