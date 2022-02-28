import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type RoffersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Roffers {
  readonly id: string;
  readonly restaurant?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Roffers, RoffersMetaData>);
  static copyOf(source: Roffers, mutator: (draft: MutableModel<Roffers, RoffersMetaData>) => MutableModel<Roffers, RoffersMetaData> | void): Roffers;
}