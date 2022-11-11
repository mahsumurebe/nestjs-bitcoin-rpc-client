// noinspection JSUnusedGlobalSymbols

import { BaseServiceAbstract } from '../abstracts';
import { BlockTemplateInterface, MiningInfoInterface } from '../interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * Mining RPC Service
 *
 * @author Mahsum UREBE <info@mahsumurebe.com>
 * @licence MIT
 * @link https://developer.bitcoin.org/reference/rpc/index.html#mining-rpcs
 */
export class MiningRpcService extends BaseServiceAbstract {
  /**
   * If the request parameters include a ‘mode’ key, that
   * is used to explicitly select between the default
   * ‘template’ request or a ‘proposal’.
   *
   * It returns data needed to construct a block to work on.
   *
   * For full specification, see BIPs 22, 23, 9, and 145:
   *
   * https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki
   *
   * https://github.com/bitcoin/bips/blob/master/bip-0023.mediawiki
   *
   * https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki#getblocktemplate_changes
   *
   * https://github.com/bitcoin/bips/blob/master/bip-0145.mediawiki
   *
   * @param {object} [templateRequest={}] Format of the template.
   * “rules”: [ (json array, required) A list of strings “segwit”,
   * (string, required) (literal) indicates client side segwit support
   * “str”, (string) other client side supported softfork deployment … ], }
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblocktemplate.html
   * @return {Promise}
   */
  getBlockTemplate(templateRequest?: {
    mode?: string;
    capabilities?: string[];
  }): Promise<BlockTemplateInterface> {
    return this.call<BlockTemplateInterface>('getblocktemplate', [
      templateRequest ?? {},
    ]);
  }

  /**
   * Get Mining Info
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmininginfo.html
   * @return {Promise} Returns a json object containing mining-related information.
   */
  getMiningInfo(): Promise<MiningInfoInterface> {
    return this.call<MiningInfoInterface>('getmininginfo');
  }

  /**
   * Get Network Hash Per Second
   *
   * Pass in [blocks] to override # of blocks, -1 specifies since last difficulty change.
   *
   * Pass in [height] to estimate the network speed at the time when a certain block was found.
   *
   * @param {number} [nblocks=120] The number of blocks, or -1 for blocks since last difficulty change.
   * @param {number} [height=-1] To estimate at the time of the given height.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getnetworkhashps.html
   * @return {Promise} Returns the estimated network hashes per second based on the last n blocks.
   */
  getNetworkHashPS(nblocks?: number, height?: number): Promise<number> {
    return this.call<number>('getnetworkhashps', [nblocks, height]);
  }

  /**
   * Prioritise Transaction
   * @param {string} txid The transaction id.
   * @param {number} fee_delta The fee value (in satoshis) to add (or subtract, if negative).
   * Note, that this value is not a fee rate. It is a value to modify absolute fee of the TX. The fee is not actually paid, only the algorithm for selecting transactions into a block considers the transaction as it would have paid a higher (or lower) fee.
   *
   * @link https://developer.bitcoin.org/reference/rpc/prioritisetransaction.html
   * @return {Promise}
   */
  prioritiseTransaction(txid: string, fee_delta: number): Promise<boolean> {
    return this.call<boolean>('prioritisetransaction', [txid, null, fee_delta]);
  }

  /**
   * Attempts to submit new block to network.
   *
   * @link https://en.bitcoin.it/wiki/BIP_0022
   * @param {string} hexData the hex-encoded block data to submit
   * @param {string} [dummy] dummy value, for compatibility with BIP22. This value is ignored.
   *
   * @link https://developer.bitcoin.org/reference/rpc/submitblock.html
   * @return {Promise} Returns JSON Null when valid, a string according to BIP22 otherwise
   */
  submitBlock(hexData: string, dummy?: string): Promise<null> {
    return this.call<null>('submitblock', [hexData, dummy]);
  }

  /**
   * Decode the given hexdata as a header and submit it as
   * a candidate chain tip if valid.
   *
   * Throws when the header is invalid.
   *
   * @param {string} hexData the hex-encoded block data
   * to submit
   *
   * @link https://developer.bitcoin.org/reference/rpc/submitheader.html
   * @return {Promise}
   */
  submitHeader(hexData: string): Promise<null> {
    return this.call<null>('submitheader', [hexData]);
  }
}
