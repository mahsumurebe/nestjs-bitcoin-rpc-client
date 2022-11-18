import { ModuleMetadata, Type } from '@nestjs/common';
import { BitcoinRpcModuleOptionsInterface } from "./bitcoin-rpc-module-options.interface";

/**
 * Bitcoin RPC Module Async Options Interface
 *
 * @interface
 */
export interface BitcoinRpcModuleAsyncOptionsInterface
  extends Pick<ModuleMetadata, 'imports'> {
  connectionName?: string;
  useExisting?: Type<BitcoinRpcModuleOptionsInterface>;
  useClass?: Type<BitcoinRpcModuleOptionsInterface>;
  useFactory?: (
    ...args: any[]
  ) => Promise<BitcoinRpcModuleOptionsInterface> | BitcoinRpcModuleOptionsInterface;
  inject?: any[];
}
