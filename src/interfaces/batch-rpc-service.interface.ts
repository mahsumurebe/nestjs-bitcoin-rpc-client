import {
  BlockchainRpcService,
  ControlRpcService,
  GeneratingRpcService,
  MiningRpcService,
  NetworkRpcService,
  RawTransactionsRpcService,
  UtilRpcService,
  WalletRpcService,
} from '../services';
import { BatchServiceType } from '../types';

export interface BatchRpcServiceInterface {
  blockchain: BatchServiceType<BlockchainRpcService>;
  control: BatchServiceType<ControlRpcService>;
  generating: BatchServiceType<GeneratingRpcService>;
  mining: BatchServiceType<MiningRpcService>;
  network: BatchServiceType<NetworkRpcService>;
  rawTransaction: BatchServiceType<RawTransactionsRpcService>;
  util: BatchServiceType<UtilRpcService>;
  wallet: BatchServiceType<WalletRpcService>;
}
