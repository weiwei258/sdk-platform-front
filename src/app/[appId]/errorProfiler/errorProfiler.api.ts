import { LogsParams, getLogs } from '@/service/commonApi';

import { TransportStructure, TransportCategory, ResourceItem } from '@eagle-tracker/types';


export interface ErrorProfilerLog extends Omit<TransportStructure, 'context' | 'category'> {
  category: TransportCategory.ERROR;
  content: ResourceItem[]
}

export const getErrorProfilerLogs = (token: string, appId: LogsParams['appId']) => {
  return getLogs<ErrorProfilerLog[]>(
    token,
    {
      appId,
      category: TransportCategory.ERROR
    }
  )
}
