// noinspection JSUnusedGlobalSymbols

import { Injectable } from '@nestjs/common';
import { BlockHeaderInterface } from '../interfaces';
import { BaseServiceAbstract } from '../abstracts';

@Injectable()
/**
 * Generating RPC Service
 *
 * @author Mahsum UREBE <info@mahsumurebe.com>
 * @licence MIT
 * @link https://developer.bitcoin.org/reference/rpc/index.html#generating-rpcs
 */
export class GeneratingRpcService extends BaseServiceAbstract {
  /**
   * Mine a block with a set of ordered transactions immediately to a specified
   * address or descriptor (before the RPC call returns)
   * @param {string} output The address or descriptor to send the newly generated
   * bitcoin to.
   * @param {string[]} transactions An array of hex strings which are either txids
   * or raw transactions.
   * Txids must reference transactions currently in the mempool. All transactions must
   * be valid and in valid order, otherwise the block will be rejected.
   *
   * @link https://developer.bitcoin.org/reference/rpc/generateblock.html
   * @return {Promise} returns hash and raw data combination of generated block
   */
  generateBlock(
    output: string,
    transactions: string[],
  ): Promise<{ [blockHash: string]: string }> {
    return this.call<{ [blockHash: string]: string }>('generateblock', [
      output,
      transactions,
    ]);
  }

  /**
   * Mine blocks immediately to a specified address (before the RPC call returns)
   * @param {number} nblocks How many blocks are generated immediately.
   * @param {string} address The address to send the newly generated bitcoin to.
   * @param {number} [maxtries=1000000] How many iterations to try.
   *
   * @link https://developer.bitcoin.org/reference/rpc/generatetoaddress.html
   * @return {Promise} Return generated block info
   */
  generateToAddress(
    nblocks: number,
    address: string,
    maxtries?: number,
  ): Promise<Pick<BlockHeaderInterface, 'hash'>[]> {
    return this.call<Pick<BlockHeaderInterface, 'hash'>[]>(
      'generatetoaddress',
      [nblocks, address, maxtries ?? 1000000],
    );
  }

  /**
   * Mine blocks immediately to a specified descriptor (before the RPC call returns)
   * @param {number} numBlocks How many blocks are generated immediately.
   * @param {string} descriptor The descriptor to send the newly generated bitcoin to.
   * @param {number} [maxtries=1000000] How many iterations to try.
   *
   * @link https://developer.bitcoin.org/reference/rpc/generatetodescriptor.html
   * @return {Promise} Return generated block info
   */
  generateToDescriptor(
    numBlocks: number,
    descriptor: string,
    maxtries?: number,
  ): Promise<Pick<BlockHeaderInterface, 'hash'>[]> {
    return this.call<Pick<BlockHeaderInterface, 'hash'>[]>(
      'generatetodescriptor',
      [numBlocks, descriptor, maxtries ?? 1000000],
    );
  }
}
