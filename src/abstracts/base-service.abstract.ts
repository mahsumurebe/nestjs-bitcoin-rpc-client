import { Inject } from '@nestjs/common';
import { JRPCClient, JrpcClientBaseException } from '@mahsumurebe/jrpc-client';

export abstract class BaseServiceAbstract {
  @Inject() protected rpc: JRPCClient;

  /**
   * Call RPC Methods
   *
   * @param {string} method Method Name
   * @param {Array} params Parameter Array
   * @protected
   */
  protected call<TData = any>(
    method: string,
    params?: Array<any>,
  ): Promise<TData> {
    for (const i in params) {
      if (typeof params[i] === 'undefined') {
        params[i] = null;
      }
    }
    return this.rpc
      .call<TData, Array<any>>({
        id: 1,
        jsonrpc: '2.0',
        method,
        params: params ?? [],
      })
      .then((data) => {
        if (data instanceof JrpcClientBaseException) {
          throw data;
        }
        return data.result;
      });
  }
}
