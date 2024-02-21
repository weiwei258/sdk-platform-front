import { LogsParams, getLogs, getLogsWithServeSide } from '@/service/commonApi';

import { TransportCategory } from '@eagle-tracker/types';
import { ResourceErrLog, ResourceItemLog } from './types';


export const getResourceLogsWithServerSide = (token: string, appId: LogsParams['appId']) => {
  return getLogsWithServeSide<ResourceItemLog[]>(
    token,
    {
      appId,
      category: TransportCategory.RS,
    }
  )
}

export const getResourceErrLogsWithServerSide = (token: string, appId: LogsParams['appId']) => {
  return getLogsWithServeSide<ResourceErrLog[]>(
    token,
    {
      appId,
      category: TransportCategory.RSERROR,
    }
  )
}


export const getResourceLogs = (data: Omit<LogsParams, 'category'>) => {
  return getLogs<ResourceItemLog[]>(
    {
      ...data,
      category: TransportCategory.RS,
    }
  )
}

export const getResourceErrLogs = (data: Omit<LogsParams, 'category'>) => {
  return getLogs<ResourceErrLog[]>(
    {
      ...data,
      category: TransportCategory.RSERROR
    }
  )
}
