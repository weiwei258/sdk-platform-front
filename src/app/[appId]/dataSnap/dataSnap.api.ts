import { LogsParams, getLogs } from '@/service/commonApi';

import { TransportStructure, TransportCategory, ResourceItem } from '@eagle-tracker/types';


export interface ResourceLog extends Omit<TransportStructure, 'context' | 'category'> {
  category: TransportCategory.RS;
  content: ResourceItem[]
}

export const getResourceLogs = (token: string, appId: LogsParams['appId']) => {
  return getLogs<ResourceLog[]>(
    token,
    {
      appId,
      category: TransportCategory.RS
    }
  )
}
