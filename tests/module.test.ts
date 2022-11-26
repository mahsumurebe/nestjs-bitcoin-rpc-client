import { Test, TestingModule } from '@nestjs/testing';
import {
  BitcoinRpcClientModule,
  BlockchainRpcService,
  RPCService,
} from '../src';
import { ServerErrorException } from '@mahsumurebe/jrpc-client';
// FUTURE fill all tests
describe('Module Tests', () => {
  let moduleRef: TestingModule;
  let rpcService: RPCService;
  let blockchainRpcService: BlockchainRpcService;
  beforeAll(async () => {
    const url = `http://${process.env.RPC_USER}:${process.env.RPC_PASS}@localhost:${process.env.RPC_PORT}`;

    moduleRef = await Test.createTestingModule({
      imports: [
        BitcoinRpcClientModule.forRoot({
          url,
        }),
      ],
    }).compile();
    moduleRef.enableShutdownHooks();
    rpcService = moduleRef.get(RPCService);
    blockchainRpcService = moduleRef.get(BlockchainRpcService);
  });
  describe('Blockchain Service', () => {
    describe('getBestBlockHash', () => {
      it('it should return response', async () => {
        await expect(
          blockchainRpcService.getBestBlockHash(),
        ).resolves.toHaveLength(64);
      });
    });
    describe('getBlockCount', () => {
      it('it should return response', async () => {
        await expect(blockchainRpcService.getBlockCount()).resolves.toEqual(
          expect.any(Number),
        );
      });
    });
    describe('Block Details', () => {
      let blockHash: string;
      beforeAll(async () => {
        blockHash = await blockchainRpcService.getBlockHash(
          await blockchainRpcService.getBlockCount(),
        );
      });

      describe('getBlock', () => {
        it('should return block data with default verbosity', async () => {
          const blockData = await blockchainRpcService.getBlock(blockHash);
          expect(blockData).toEqual(expect.any(Object));
          expect(blockData).toHaveProperty('tx');
          expect(typeof blockData.tx[0]).toEqual('string');
        });
        it('should return block data with verbosity level zero', async () => {
          await expect(
            blockchainRpcService.getBlock(blockHash, 0),
          ).resolves.toEqual(expect.any(String));
        });
        it('should return block data with verbosity level one', async () => {
          const blockData = await blockchainRpcService.getBlock(blockHash, 1);
          expect(blockData).toEqual(expect.any(Object));
          expect(blockData).toHaveProperty('tx');
          expect(typeof blockData.tx[0]).toEqual('string');
        });
        it('should return block data with verbosity level two', async () => {
          const blockData = await blockchainRpcService.getBlock(blockHash, 2);
          expect(blockData).toEqual(expect.any(Object));
          expect(blockData).toHaveProperty('tx');
          expect(typeof blockData.tx[0]).toEqual('object');
        });
        it('should return error class instance', async () => {
          await expect(blockchainRpcService.getBlock('foo')).rejects.toThrow(
            ServerErrorException,
          );
        });
      });
    });
  });
  describe('Batch', () => {
    it('should be batch call', async () => {
      const blockCount = await rpcService.blockchain.getBlockCount();
      const difficulty = await rpcService.blockchain.getDifficulty();
      const miningInfo = await rpcService.mining.getMiningInfo();
      await expect(
        rpcService.batch((rpc) => {
          rpc.blockchain.getBlockCount();
          rpc.blockchain.getDifficulty();
          rpc.mining.getMiningInfo();
          rpc.blockchain.getBlock('foo', 1);
        }),
      ).resolves.toEqual([
        {
          id: 0,
          error: null,
          result: blockCount,
        },
        {
          id: 1,
          error: null,
          result: difficulty,
        },
        {
          id: 2,
          error: null,
          result: miningInfo,
        },
        new ServerErrorException(3, {
          code: -8,
          message: "blockhash must be of length 64 (not 3, for 'foo')",
        }),
      ]);
    });
  });
  afterAll(async () => {
    await moduleRef.close();
  });
});
