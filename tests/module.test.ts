import { Test, TestingModule } from '@nestjs/testing';
import { BitcoinRpcClientModule, BlockchainRpcService } from '../src';
import { ServerErrorException } from '@mahsumurebe/jrpc-client';
// FUTURE fill all tests
describe('Module Tests', () => {
  let moduleRef: TestingModule;
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
  afterAll(async () => {
    await moduleRef.close();
  });
});
