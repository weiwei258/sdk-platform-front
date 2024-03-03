import { LogsParams, getLogsWithServeSide } from '@/service/commonApi';

import { TransportStructure, TransportCategory, ResourceItem } from '@eagle-tracker/types';


export interface ResourceLog extends Omit<TransportStructure, 'context' | 'category'> {
  category: TransportCategory.RS;
  content: ResourceItem[]
}

export const getResourceLogs = (token: string, appId: LogsParams['appId']) => {
  return getLogsWithServeSide<ResourceLog[]>(
    token,
    {
      appId,
      category: TransportCategory.RS
    }
  )
}
