import { Inject, Injectable } from '@nestjs/common';
import { JRPCClient } from '@mahsumurebe/jrpc-client';
import { BlockchainRpcService } from './blockchain-rpc.service';
import { ControlRpcService } from './control-rpc.service';
import { GeneratingRpcService } from './generating-rpc.service';
import { MiningRpcService } from './mining-rpc.service';
import { NetworkRpcService } from './network-rpc.service';
import { RawTransactionsRpcService } from './raw-transactions-rpc.service';
import { UtilRpcService } from './util-rpc.service';
import { WalletRpcService } from './wallet-rpc.service';

export * from './blockchain-rpc.service';
export * from './control-rpc.service';
export * from './generating-rpc.service';
export * from './mining-rpc.service';
export * from './network-rpc.service';
export * from './raw-transactions-rpc.service';
export * from './util-rpc.service';
export * from './wallet-rpc.service';

@Injectable()
export class RPCService {
  @Inject() public readonly handler: JRPCClient;
  @Inject() public readonly blockchain: BlockchainRpcService;
  @Inject() public readonly control: ControlRpcService;
  @Inject() public readonly generating: GeneratingRpcService;
  @Inject() public readonly mining: MiningRpcService;
  @Inject() public readonly network: NetworkRpcService;
  @Inject() public readonly rawTransaction: RawTransactionsRpcService;
  @Inject() public readonly util: UtilRpcService;
  @Inject() public readonly wallet: WalletRpcService;
}
