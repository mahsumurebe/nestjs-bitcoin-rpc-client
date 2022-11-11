// noinspection JSUnusedGlobalSymbols

import {
  DynamicModule,
  Inject,
  Module,
  OnApplicationShutdown,
} from '@nestjs/common';
import * as _services from './services';
import {
  BitcoinRpcModuleAsyncOptionsInterface,
  BitcoinRpcModuleOptionsInterface,
} from './interfaces';
import {
  createRpcAsyncClientOptions,
  createRpcClient,
  RPC_MODULE_OPTIONS,
} from './providers/jsonrpc-client.provider';
import { JRPCClient } from '@mahsumurebe/jrpc-client';

export * from './services';
export * from './interfaces';

const services = Object.values(_services);

@Module({})
export class BitcoinRpcClientModule implements OnApplicationShutdown {
  @Inject(JRPCClient) protected rpcClient: JRPCClient;

  static forRoot(options: BitcoinRpcModuleOptionsInterface): DynamicModule {
    const clientProvider = createRpcClient();
    return {
      global: true,
      module: BitcoinRpcClientModule,
      providers: [
        clientProvider,
        {
          provide: RPC_MODULE_OPTIONS,
          useValue: options,
        },
        ...services,
      ],
      exports: [clientProvider, ...services],
    };
  }

  static forRootAsync(
    options: BitcoinRpcModuleAsyncOptionsInterface,
  ): DynamicModule {
    const clientProvider = createRpcClient();
    return {
      global: true,
      module: BitcoinRpcClientModule,
      imports: options.imports,
      providers: [
        clientProvider,
        createRpcAsyncClientOptions(options),
        ...services,
      ],
      exports: [clientProvider, ...services],
    };
  }

  async onApplicationShutdown() {
    await this.rpcClient.destroy();
  }
}
