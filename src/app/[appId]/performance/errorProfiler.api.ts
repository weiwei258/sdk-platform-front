import { LogsParams, getLogs, getLogsWithServeSide } from '@/service/commonApi';

import { TransportStructure, TransportCategory, IErrorLog } from '@eagle-tracker/types';
import { PerformanceLog } from './types';


export const getPerformanceLogsWithServerSide = (token: string, appId: LogsParams['appId']) => {
  return getLogsWithServeSide<PerformanceLog[]>(
    token,
    {
      appId,
      category: TransportCategory.RS,
    }
  )
}

