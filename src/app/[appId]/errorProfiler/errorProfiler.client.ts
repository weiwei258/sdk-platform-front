import { LogsParams, getLogs } from "@/service/commonApi"
import { ErrorProfilerLog } from "./types"

export const getErrorProfiler = (data: Omit<LogsParams, 'category'>) => {
  return getLogs<ErrorProfilerLog[]>({
    category: 'error',
    ...data
  })
}
