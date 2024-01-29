import { IErrorLog, IJsErrorLog, PerformanceData, TransportCategory } from "@eagle-tracker/types";
import { TransportStructure } from "@eagle-tracker/types/src/transport";

export interface PerformanceLog extends Omit<TransportStructure, 'context' | 'category'> {
  category: TransportCategory.PERF;
  context: PerformanceData
}
