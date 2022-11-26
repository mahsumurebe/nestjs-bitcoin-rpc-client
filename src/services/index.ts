import { Inject, Injectable } from '@nestjs/common';
import { JRPCClient, JRPCRequestBodyInterface } from '@mahsumurebe/jrpc-client';
import { BlockchainRpcService } from './blockchain-rpc.service';
import { ControlRpcService } from './control-rpc.service';
import { GeneratingRpcService } from './generating-rpc.service';
import { MiningRpcService } from './mining-rpc.service';
import { NetworkRpcService } from './network-rpc.service';
import { RawTransactionsRpcService } from './raw-transactions-rpc.service';
import { UtilRpcService } from './util-rpc.service';
import { WalletRpcService } from './wallet-rpc.service';
import { BaseServiceAbstract } from '../abstracts';
import { TypeJRPCResponse } from '@mahsumurebe/jrpc-client/lib/core/types';
import { BatchRpcServiceInterface } from '../interfaces/batch-rpc-service.interface';

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

  async batch(
    callback: (rpc: BatchRpcServiceInterface) => Promise<void> | void,
  ): Promise<TypeJRPCResponse[]> {
    const requests: JRPCRequestBodyInterface[] = [];
    const serviceNames = [
      'blockchain',
      'control',
      'generating',
      'mining',
      'network',
      'rawTransaction',
      'util',
      'wallet',
    ];

    const rpc: any = new Proxy(this, {
      get(target: RPCService, fieldName: string): any {
        if (serviceNames.indexOf(fieldName) > -1) {
          return new Proxy(target[fieldName], {
            get(target2: BaseServiceAbstract, methodName: string): any {
              if (methodName === 'call') {
                return (method: string, params?: Array<any>) => {
                  const requestBody: JRPCRequestBodyInterface = {
                    id: requests.length,
                    jsonrpc: '2.0',
                    method: method,
                    params: params ?? [],
                  };
                  requests.push(requestBody);
                  return requestBody.id;
                };
              }
              return target2[methodName];
            },
          });
        }
        if (fieldName === 'batch') {
          throw new Error('Inline batch does not supported.');
        }
        return target[fieldName];
      },
    });

    await callback(rpc);

    return this.handler.call(requests);
  }
}
