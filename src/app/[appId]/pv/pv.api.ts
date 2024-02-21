
import { TransportCategory } from '@eagle-tracker/types';
import { PvType } from './types';
import { LogsParams, getLogs, getLogsWithServeSide } from '@/service/commonApi';


export const getPvLogsWithServerSide = (token: string, appId: LogsParams['appId']) => {
  return getLogsWithServeSide<PvType[]>(
    token,
    {
      appId,
      category: TransportCategory.PV,
    }
  )
}

 export const getPvLogs = (data: Omit<LogsParams, 'category'>)=>{
  return getLogs<PvType[]>({
    category: TransportCategory.ERROR,
    ...data
  })
 }
