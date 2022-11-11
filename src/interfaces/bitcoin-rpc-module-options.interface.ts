import { HttpAdapterConfigInterface } from '@mahsumurebe/jrpc-client';

/**
 * Bitcoin RPC Module Options
 *
 * @interface
 */
export interface BitcoinRpcModuleOptionsInterface
  extends HttpAdapterConfigInterface {
  /**
   * RPC Url
   *
   * @type {string}
   */
  url: string;
}
