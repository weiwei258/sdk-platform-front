import { LogsParams, getLogs, getLogsWithServeSide } from '@/service/commonApi';
import { TransportCategory } from '@eagle-tracker/types';
import { PerformanceType } from './types';


export const getPerformanceLogsWithServerSide = (token: string, appId: LogsParams['appId']) => {
  return getLogsWithServeSide<PerformanceType[]>(
    token,
    {
      appId,
      category: TransportCategory.PERF,
    }
  )
}

export const getPerformanceLogs = (data: Omit<LogsParams, 'category'>) => {
  return getLogs<PerformanceType[]>(
    {
      category: TransportCategory.PERF,
      ...data,
    }
  )
}

