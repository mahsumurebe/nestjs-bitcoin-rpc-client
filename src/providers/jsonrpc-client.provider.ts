import { Provider } from '@nestjs/common';
import {
  BitcoinRpcModuleAsyncOptionsInterface,
  BitcoinRpcModuleOptionsInterface,
} from '../interfaces';
import {
  HttpAdapter,
  JRPCClient,
  TypeId,
  TypeJRPCResponse,
  TypeJRPCResponseBody,
} from '@mahsumurebe/jrpc-client';
import { getErrorInstanceFrom } from '@mahsumurebe/jrpc-client/lib/core/exceptions/helpers/response.helper';
import { JRPCResponseBodyInterface } from '@mahsumurebe/jrpc-client/lib/core/interfaces';

export const RPC_MODULE_OPTIONS = 'JRPC_CLIENT';

export const createRpcClient = (): Provider<JRPCClient> => ({
  provide: JRPCClient,
  inject: [RPC_MODULE_OPTIONS],
  useFactory: ({ url, ...config }: BitcoinRpcModuleOptionsInterface) => {
    function responseParse<TData = any, TId extends TypeId = number>(
      data: TypeJRPCResponseBody<TData, TId>,
    ): TypeJRPCResponse<TData, TId> | TypeJRPCResponse<TData, TId>[] {
      if (Array.isArray(data)) {
        return data.map((item) => responseParse<TData, TId>(item)).flat();
      }
      if ('error' in data && data.error) {
        return getErrorInstanceFrom(data);
      }
      return data as JRPCResponseBodyInterface<TData, TId>;
    }

    return new JRPCClient(
      new HttpAdapter(url, { parser: responseParse, ...config }),
    );
  },
});
export const createRpcAsyncClientOptions = (
  options: BitcoinRpcModuleAsyncOptionsInterface,
) =>
  ({
    provide: RPC_MODULE_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject,
  } as Provider<BitcoinRpcModuleOptionsInterface>);
