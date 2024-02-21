import { LogsParams, getLogs, getLogsWithServeSide } from '@/service/commonApi';

import { TransportCategory } from '@eagle-tracker/types';
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

export const getErrorProfiler = (data: Omit<LogsParams, 'category'>) => {
  return getLogs<ErrorProfilerLog[]>({
    category: TransportCategory.ERROR,
    ...data
  })
}
