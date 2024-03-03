import { IErrorLog, IJsErrorLog, TransportCategory } from "@eagle-tracker/types";
import { TransportStructure } from "@eagle-tracker/types/src/transport";

export type ErrorType = TransportCategory.ERROR

export interface JsErrType extends Omit<TransportStructure, 'context' | 'category'> {
  category: TransportCategory.ERROR;
  context: IJsErrorLog
}

export interface WrongRankingType {
  key: string,
  value: number
}

export interface ErrorProfilerLog extends Omit<TransportStructure, 'context' | 'category'> {
  category: TransportCategory.ERROR;
  context: IErrorLog
}
