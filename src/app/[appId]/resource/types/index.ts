import { RSErrorLog, ResourceItem, TransportCategory } from "@eagle-tracker/types";
import { TransportStructure } from "@eagle-tracker/types/src/transport";

export interface ResourceItemLog extends Omit<TransportStructure, 'context' | 'category'> {
  category: TransportCategory.RS;
  context: ResourceItem[]
}

export interface ResourceErrLog extends Omit<TransportStructure, 'context' | 'category'> {
  category: TransportCategory.RSERROR;
  context: RSErrorLog
}
