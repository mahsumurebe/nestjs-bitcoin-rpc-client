import { ModuleMetadata, Type } from '@nestjs/common';
import { HttpAdapterConfigInterface } from '@mahsumurebe/jrpc-client';

/**
 * Bitcoin RPC Module Async Options Interface
 *
 * @interface
 */
export interface BitcoinRpcModuleAsyncOptionsInterface
  extends Pick<ModuleMetadata, 'imports'> {
  connectionName?: string;
  useExisting?: Type<HttpAdapterConfigInterface>;
  useClass?: Type<HttpAdapterConfigInterface>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HttpAdapterConfigInterface> | HttpAdapterConfigInterface;
  inject?: any[];
}
