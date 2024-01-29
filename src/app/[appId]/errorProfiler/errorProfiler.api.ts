import { LogsParams, getLogs, getLogsWithServeSide } from '@/service/commonApi';

import { TransportStructure, TransportCategory, IErrorLog } from '@eagle-tracker/types';
import { ErrorProfilerLog } from './types';


export const getErrorProfilerLogsWithServerSide = (token: string, appId: LogsParams['appId']) => {
  return getLogsWithServeSide<ErrorProfilerLog[]>(
    token,
    {
      appId,
      category: TransportCategory.ERROR,
    }
  )
}

