# Bitcoin RPC Client Module for NestJS

Bitcoin RPC Client Module for NestJS.

## Installation

For installation, you can run the following command in the directory of your project.

```shell script
npm install nestjs-bitcoin-rpc-client
```  

## Getting started with module

```typescript
import {Module} from '@nestjs/common';
import {BitcoinRpcClientModule} from 'nestjs-bitcoin-rpc-client';

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
import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {BitcoinRpcClientModule} from 'nestjs-bitcoin-rpc-client';

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
import {Inject, Injectable} from '@nestjs/common';
import {RPCService} from 'nestjs-bitcoin-rpc-client';

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
import {Inject, Injectable} from '@nestjs/common';
import {BlockchainRpcService} from 'nestjs-bitcoin-rpc-client';

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
