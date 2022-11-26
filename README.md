# Bitcoin RPC Client Module for NestJS

Bitcoin RPC Client Module for NestJS.

## Installation

For installation, you can run the following command in the directory of your project.

```shell script
npm install nestjs-bitcoin-rpc-client
```  

## Getting started with module

```typescript
import { Module } from '@nestjs/common';
import { BitcoinRpcClientModule } from 'nestjs-bitcoin-rpc-client';

@Module({
  imports: [
    BitcoinRpcClientModule.forRoot({
      url: "http://localhost:8332"
    }),
  ],
})
export class AppModule {
}
```

Or with async module loading

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BitcoinRpcClientModule } from 'nestjs-bitcoin-rpc-client';

@Module({
  imports: [
    BitcoinRpcClientModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('BITCOIN_RPC_URL'),
      }),
    }),
  ],
})
export class AppModule {
}
```

### Configuration

The module configuration is as follows.

| KEY     | DEFAULT   | DESCRIPTION  | Type              | Required |
|---------|-----------|--------------|-------------------|----------|
| url     | null      | RPC HTTP URL | object            | Yes      |
| headers | null      | HTTP Headers | object            | No       |
| timeout | 10_000    | Timeout      | number            | No       |

### Using In Project

The way of use in controller and service is the same. Below is an example of usage within the service.

#### Use RPCService

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { RPCService } from 'nestjs-bitcoin-rpc-client';

@Injectable()
export class FooService {
  @Inject() protected rpcService: RPCService;

  async getNodeBlockCount(): Promise<{ blockCount: number }> {
    const blockCount = await this.rpcService.blockchain.getBlockCount();
    return {
      blockCount,
    }
  }
}
```

#### Use Directly Service

You can also inject RPC groups one by one, which are collected under RPCSService.

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { BlockchainRpcService } from 'nestjs-bitcoin-rpc-client';

@Injectable()
export class FooService {
  @Inject() protected blockchainRpcService: BlockchainRpcService;

  async getNodeBlockCount(): Promise<{ blockCount: number }> {
    const blockCount = await this.blockchainRpcService.getBlockCount();
    return {
      blockCount,
    }
  }
}
```

#### Batch Request

This module supports batch requests. Batch requests must be made within the callback function sent to
**RpcService.batch** method. The first parameter of the callback function contains the RpcService instance.

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { RPCService, TransactionInterface } from 'nestjs-bitcoin-rpc-client';

@Injectable()
export class FooService {
  @Inject() protected rpcService: RPCService;

  async getTransactions(): Promise<TransactionInterface[]> {
    const transactions = await this.rpcService
      .batch((batchRpcService) => {
        batchRpcService.wallet.getTransaction('0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098');
        batchRpcService.wallet.getTransaction('9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5');
        batchRpcService.wallet.getTransaction('foo');
      })
      .then((allResponse) => allResponse.map(response => {
        if (response instanceof Error) {
          // You can catch error
          return response;
        }
        return response.result;
      }));

    console.log(transactions);
    // [
    //    {
    //        "addresses": [
    //            "12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"
    //        ],
    //        "block_height": -1,
    //        "block_index": -1,
    //        "confirmations": 0,
    //        "double_spend": false,
    //        "fees": 0,
    //        "hash": "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
    //        "inputs": [
    //            {
    //                "age": 0,
    //                "output_index": -1,
    //                "script": "04ffff001d0104",
    //                "script_type": "empty",
    //                "sequence": 4294967295
    //            }
    //        ],
    //        "outputs": [
    //            {
    //                "addresses": [
    //                    "12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"
    //                ],
    //                "script": "410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac",
    //                "script_type": "pay-to-pubkey",
    //                "value": 5000000000
    //            }
    //        ],
    //        "preference": "low",
    //        "received": "2022-11-26T21:23:50.591795236Z",
    //        "relayed_by": "44.202.186.4",
    //        "size": 134,
    //        "total": 5000000000,
    //        "ver": 1,
    //        "vin_sz": 1,
    //        "vout_sz": 1,
    //        "vsize": 134
    //    },
    //    {
    //        "addresses": [
    //            "12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"
    //        ],
    //        "block_height": -1,
    //        "block_index": -1,
    //        "confirmations": 0,
    //        "double_spend": false,
    //        "fees": 0,
    //        "hash": "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
    //        "inputs": [
    //            {
    //                "age": 0,
    //                "output_index": -1,
    //                "script": "04ffff001d0104",
    //                "script_type": "empty",
    //                "sequence": 4294967295
    //            }
    //        ],
    //        "outputs": [
    //            {
    //                "addresses": [
    //                    "12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX"
    //                ],
    //                "script": "410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac",
    //                "script_type": "pay-to-pubkey",
    //                "value": 5000000000
    //            }
    //        ],
    //        "preference": "low",
    //        "received": "2022-11-26T21:24:42.283438993Z",
    //        "relayed_by": "54.85.182.93",
    //        "size": 134,
    //        "total": 5000000000,
    //        "ver": 1,
    //        "vin_sz": 1,
    //        "vout_sz": 1,
    //        "vsize": 134
    //    },
    //    ServerErrorException(3, {
    //      code: -8,
    //      message: "parameter 1 must be of length 64 (not 3, for 'foo')",
    //    })
    // ]

    return transactions;
  }
}
```
