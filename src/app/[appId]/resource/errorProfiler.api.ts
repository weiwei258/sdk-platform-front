import { LogsParams, getLogs, getLogsWithServeSide } from '@/service/commonApi';

import { TransportStructure, TransportCategory, IErrorLog } from '@eagle-tracker/types';
import { ResourceErrLog,ResourceItemLog } from './types';


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
