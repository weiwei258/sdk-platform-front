import requestCommon, { serverRequestCommon } from "./request"
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
  category: TransportCategory;
  appId: string;
  dateRange?: [string, string]
}

export const getLogsWithServeSide = <T = any>(token: string, logsParams: LogsParams) => {
  return serverRequestCommon<T>({
    url: '/getLogs',
    method: 'POST',
    data: logsParams,
    headers: {
      Authorization: token
    }
  })
}

export const getLogs = <T = any>(logsParams: LogsParams) => {
  return requestCommon<T>({
    url: '/getLogs',
    method: 'POST',
    data: logsParams,
  })
}
