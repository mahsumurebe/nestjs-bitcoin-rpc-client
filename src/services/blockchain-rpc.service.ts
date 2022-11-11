// noinspection JSUnusedGlobalSymbols

import { Injectable } from '@nestjs/common';
import {
  BlockFilterInterface,
  BlockHeaderInterface,
  BlockInterface,
  BlockStatsInterface,
  ChainTipInterface,
  ChainTxStatsInterface,
  GetBlockChainInfoInterface,
  MempoolAncestorsInterface,
  MempoolInfoInterface,
  MempoolTransactionInterface,
  TxOutInterface,
  TxOutsetInfoInterface,
  TxOutsetInterface,
} from '../interfaces';
import {
  TYPE_BLOCK,
  TYPE_BLOCK_WITH_TRANSACTION,
  TYPE_BLOCK_WITH_TRANSACTION_WITH_PREV,
  TYPE_MEMPOOL_DESCENDANT,
  TYPE_SCAN_TX_OUTSET_SCAN_OBJECTS,
} from '../types';
import { BaseServiceAbstract } from '../abstracts';

@Injectable()
/**
 * Blockchain RPC Service
 *
 * @author Mahsum UREBE <info@mahsumurebe.com>
 * @licence MIT
 * @link https://developer.bitcoin.org/reference/rpc/index.html#blockchain-rpcs
 */
export class BlockchainRpcService extends BaseServiceAbstract {
  /**
   * Returns the hash of the best (tip) block in the most-work fully-validated chain.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getbestblockhash.html
   *
   * @link https://developer.bitcoin.org/reference/rpc/getbestblockhash.html
   * @return {Promise}
   */
  getBestBlockHash(): Promise<string> {
    return this.call<string>('getbestblockhash');
  }

  /**
   * Get Block Data
   * @param {string} blockhash - The block hash
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblock.html
   * @return {Promise} - returns an Object with information about block ‘hash’.
   */
  getBlock(blockhash: string): Promise<BlockInterface>;
  /**
   * Get Block Raw Data
   * @param {string} blockhash - The block hash
   * @param {number} [verbose=0] - Verbose
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblock.html
   * @return {Promise} - returns a string that is serialized, hex-encoded data for block ‘hash’.
   */
  getBlock(blockhash: string, verbose: 0): Promise<string>;
  /**
   * Get Block Data
   * @param {string} blockhash - The block hash
   * @param {number} [verbose=1] - Verbose
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblock.html
   * @return {Promise} - returns an Object with information about block ‘hash’.
   */
  getBlock(blockhash: string, verbose: 1): Promise<BlockInterface>;
  /**
   * Get Block Data
   * @param {string} blockhash - The block hash
   * @param {number} [verbose=2] - Verbose
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblock.html
   * @return {Promise} - returns an Object with information about block ‘hash’ and information about each transaction.
   */
  getBlock(blockhash: string, verbose: 2): Promise<TYPE_BLOCK_WITH_TRANSACTION>;
  /**
   * Get Block Data
   * @param {string} blockhash - The block hash
   * @param {number} [verbose=3] - Verbose
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblock.html
   * @return {Promise} - returns an Object with information about block ‘hash’ and information about each transaction and input previous transaction information.
   */
  getBlock(
    blockhash: string,
    verbose: 3,
  ): Promise<TYPE_BLOCK_WITH_TRANSACTION_WITH_PREV>;
  getBlock(blockhash: string, verbose?: number): Promise<TYPE_BLOCK> {
    return this.call<TYPE_BLOCK>('getblock', [blockhash, verbose ?? 1]);
  }

  /**
   * Get Blockchain Info
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblockchaininfo.html
   * @return {Promise} Returns an object containing various state info regarding blockchain processing.
   */
  getBlockchainInfo(): Promise<GetBlockChainInfoInterface> {
    return this.call<GetBlockChainInfoInterface>('getblockchaininfo', []);
  }

  /**
   * Get Block Count
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblockcount.html
   * @return {Promise} Returns the height of the most-work fully-validated chain.
   * The genesis block has height 0.
   */
  getBlockCount(): Promise<number> {
    return this.call<number>('getblockcount', []);
  }

  /**
   * Get Block Hash
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblockhash.html
   * @return {Promise} Returns hash of block in best-block-chain at height provided.
   */
  getBlockHash(height: number): Promise<string> {
    return this.call<string>('getblockhash', [height]);
  }

  /**
   * Get Block Filter
   * @param {string} blockhash The hash of the block
   * @param {string} [filterType=basic] The type name of the filter
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblockfilter.html
   * @return {Promise} Retrieve a BIP 157 content filter for a particular block.
   */
  getBlockFilter(
    blockhash: string,
    filterType?: string,
  ): Promise<BlockFilterInterface> {
    return this.call<BlockFilterInterface>('getblockfilter', [
      blockhash,
      filterType ?? 'basic',
    ]);
  }

  /**
   * Get Block Header
   *
   * @param {string} hash The hash of the block
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getbestblockhash.html
   * @return {Promise} returns a string that is serialized, hex-encoded data for blockheader ‘hash’.
   */
  getBlockHeader(hash: string): Promise<string>;
  /**
   * Get Block Header
   *
   * @param {string} hash The hash of the block
   * @param {boolean} [verbose=false] Verbose
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblockfilter.html
   * @return {Promise} returns a string that is serialized, hex-encoded data for blockheader ‘hash’.
   */
  getBlockHeader(hash: string, verbose: false): Promise<string>;
  /**
   * Get Block Header
   *
   * @param {string} hash The hash of the block
   * @param {boolean} [verbose=true] Verbose
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblockfilter.html
   * @return {Promise} returns an Object with information about blockheader ‘hash’.
   */
  getBlockHeader(hash: string, verbose: true): Promise<BlockHeaderInterface>;
  getBlockHeader(
    hash: string,
    verbose?: boolean,
  ): Promise<BlockHeaderInterface | string> {
    return this.call<BlockHeaderInterface | string>('getblockheader', [
      hash,
      verbose ?? false,
    ]);
  }

  /**
   * Get Block Stats
   *
   * Compute per block statistics for a given window. All amounts are in satoshis.
   *
   * It won’t work for some heights with pruning.
   *
   * @param {string} hash The hash of the block
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblockstats.html
   * @return {Promise} Block Stats
   */
  getBlockStats(hash: string): Promise<BlockStatsInterface>;
  /**
   * Get Block Stats
   *
   * Compute per block statistics for a given window. All amounts are in satoshis.
   *
   * It won’t work for some heights with pruning.
   *
   * @param {string|number} hash The hash of the block
   * @param {object} stats Stats
   * @param {number} stats.confirmations The number of confirmations, or -1 if the block is not on the main chain
   * @param {number} stats.height The block height or index
   * @param {number} stats.version The block version
   * @param {string} stats.versionHex The block version formatted in hexadecimal
   * @param {string} stats.merkleroot The merkle root
   * @param {number} stats.time The block time expressed in UNIX epoch time
   * @param {number} stats.mediantime The median block time expressed in UNIX epoch time
   * @param {number} stats.nonce The nonce
   * @param {string} stats.bits The bits
   * @param {number} stats.difficulty The difficulty
   * @param {string} stats.chainwork Expected number of hashes required to produce the current chain
   * @param {number} stats.nTx The number of transactions in the block
   * @param {string} stats.previousblockhash The hash of the previous block
   * @param {string} stats.nextblockhash The hash of the next block
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getblockstats.html
   * @return {Promise} Block Stats
   */
  getBlockStats(
    hash: string,
    stats?: Partial<Omit<BlockHeaderInterface, 'hash'>>,
  ): Promise<BlockStatsInterface>;
  /**
   * Get Block Stats
   *
   * Compute per block statistics for a given window. All amounts are in satoshis.
   *
   * It won’t work for some heights with pruning.
   *
   * @param {number} height The height of the block
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getbestblockhash.html
   * @return {Promise} Block Stats
   */
  getBlockStats(height: number): Promise<BlockStatsInterface>;
  /**
   * Get Block Stats
   *
   * Compute per block statistics for a given window. All amounts are in satoshis.
   *
   * It won’t work for some heights with pruning.
   *
   * @param {number} height The height of the block
   * @param {object} stats Stats
   * @param {string} stats.hash the block hash (same as provided)
   * @param {number} stats.confirmations The number of confirmations, or -1 if the block is not on the main chain
   * @param {number} stats.version The block version
   * @param {string} stats.versionHex The block version formatted in hexadecimal
   * @param {string} stats.merkleroot The merkle root
   * @param {number} stats.time The block time expressed in UNIX epoch time
   * @param {number} stats.mediantime The median block time expressed in UNIX epoch time
   * @param {number} stats.nonce The nonce
   * @param {string} stats.bits The bits
   * @param {number} stats.difficulty The difficulty
   * @param {string} stats.chainwork Expected number of hashes required to produce the current chain
   * @param {number} stats.nTx The number of transactions in the block
   * @param {string} stats.previousblockhash The hash of the previous block
   * @param {string} stats.nextblockhash The hash of the next block
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getbestblockhash.html
   * @return {Promise} Block Stats
   */
  getBlockStats(
    height: number,
    stats?: Partial<Omit<BlockHeaderInterface, 'height'>>,
  ): Promise<BlockStatsInterface>;
  getBlockStats(
    arg0: string | number,
    stats?: Partial<BlockHeaderInterface>,
  ): Promise<BlockStatsInterface> {
    return this.call<BlockStatsInterface>('getblockstats', [arg0, stats]);
  }

  /**
   * Get Chain Tips
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getchaintips.html
   * @return {Promise} Return information about all known tips in the block tree, including the main chain as well as orphaned branches.
   */
  getChainTips(): Promise<ChainTipInterface[]> {
    return this.call<ChainTipInterface[]>('getchaintips', []);
  }

  /**
   * Compute statistics about the total number and rate of transactions in the chain.
   *
   *  @param {number} [nblocks] Size of the window in number of blocks
   *  @param {string} [blockhash] The hash of the block that ends the window.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getchaintxstats.html
   * @return {Promise}
   */
  getChainTxStats(
    nblocks?: number,
    blockhash?: string,
  ): Promise<ChainTxStatsInterface> {
    return this.call<ChainTxStatsInterface>('getchaintxstats', [
      nblocks,
      blockhash,
    ]);
  }

  /**
   * Get Difficulty
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getchaintips.html
   * @return {Promise} Returns the proof-of-work difficulty as a multiple of the minimum difficulty.
   */
  getDifficulty(): Promise<number> {
    return this.call<number>('getchaintips', []);
  }

  /**
   * Mempool Ancestors
   * @param {string} txid The transaction id (must be in mempool)
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmempoolancestors.html
   * @return {Promise} return array of transaction ids
   */
  getMempoolAncestors(txid: string): Promise<string[]>;
  /**
   * Mempool Ancestors
   * @param {string} txid The transaction id (must be in mempool)
   * @param {boolean} [verbose=false] Verbose
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmempoolancestors.html
   * @return {Promise} return array of transaction ids
   */
  getMempoolAncestors(txid: string, verbose: false): Promise<string[]>;
  /**
   * Mempool Ancestors
   * @param {string} txid The transaction id (must be in mempool)
   * @param {boolean} [verbose=true] Verbose
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmempoolancestors.html
   * @return {Promise} return in-mempool ancestors object.
   */
  getMempoolAncestors(
    txid: string,
    verbose: true,
  ): Promise<Record<string, MempoolAncestorsInterface>>;
  getMempoolAncestors(
    txid: string,
    verbose?: boolean,
  ): Promise<Record<string, MempoolAncestorsInterface> | string[]> {
    return this.call<Record<string, MempoolAncestorsInterface> | string[]>(
      'getmempoolancestors',
      [txid, verbose ?? false],
    );
  }

  /**
   * Mempool Descendants
   * @param {string} txid The transaction id (must be in mempool)
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmempooldescendants.html
   * @return {Promise} return array of transaction ids
   */
  getMempoolDescendants(txid: string): Promise<string[]>;
  /**
   * Mempool Descendants
   * @param {string} txid The transaction id (must be in mempool)
   * @param {boolean} [verbose=false] Verbose
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmempooldescendants.html
   * @return {Promise} return array of transaction ids
   */
  getMempoolDescendants(txid: string, verbose: false): Promise<string[]>;
  /**
   * Mempool Descendants
   * @param {string} txid The transaction id (must be in mempool)
   * @param {boolean} [verbose=true] Verbose
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmempooldescendants.html
   * @return {Promise} return in-mempool descendants object.
   */
  getMempoolDescendants(
    txid: string,
    verbose?: true,
  ): Promise<Record<string, TYPE_MEMPOOL_DESCENDANT>>;
  getMempoolDescendants(
    txid: string,
    verbose?: boolean,
  ): Promise<string[] | Record<string, TYPE_MEMPOOL_DESCENDANT>> {
    return this.call<string[] | Record<string, TYPE_MEMPOOL_DESCENDANT>>(
      'getmempooldescendants',
      [txid, verbose ?? false],
    );
  }

  /**
   * Get Mempool Entry Data
   * @param {string} txid The transaction id (must be in mempool)
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmempoolentry.html
   * @return {Promise} Returns mempool data for given transaction
   */
  getMempoolEntry(txid: string): Promise<MempoolTransactionInterface> {
    return this.call<MempoolTransactionInterface>('getmempoolentry', [txid]);
  }

  /**
   * Get Mempool Info
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmempoolinfo.html
   * @return {Promise}
   */
  getMempoolInfo(): Promise<MempoolInfoInterface> {
    return this.call<MempoolInfoInterface>('getmempoolinfo', []);
  }

  /**
   * Get Raw Mempool
   *
   * @link https://developer.bitcoin.org/reference/rpc/getrawmempool.html
   * @return {Promise} returns array of transaction ids
   */
  getRawMempool(): Promise<string[]>;
  /**
   * Get Raw Mempool
   *
   * @param {boolean} [verbose=false] Verbose
   *
   * @link https://developer.bitcoin.org/reference/rpc/getrawmempool.html
   * @return {Promise} returns array of transaction ids
   */
  getRawMempool(verbose: false): Promise<string[]>;
  /**
   * Get Raw Mempool
   *
   * @param {boolean} [verbose=false] Verbose
   *
   * @link https://developer.bitcoin.org/reference/rpc/getrawmempool.html
   * @return {Promise} returns in-mempool transactions object.
   */
  getRawMempool(
    verbose: true,
  ): Promise<Record<string, MempoolTransactionInterface>>;
  /**
   * Get Raw Mempool
   *
   * @param {boolean} [verbose=false] Verbose
   * @param {boolean} [mempool_sequence=true] Sequence
   *
   * @link https://developer.bitcoin.org/reference/rpc/getrawmempool.html
   * @return {Promise} returns a json object with transaction list and mempool sequence number attached..
   */
  getRawMempool(
    verbose: false,
    mempool_sequence: true,
  ): Promise<{ txids: string[]; mempool_sequence: number }>;
  getRawMempool(
    verbose?: boolean,
    mempool_sequence?: boolean,
  ): Promise<
    | string[]
    | Record<string, MempoolTransactionInterface>
    | { txids: string[]; mempool_sequence: number }
  > {
    return this.call<string[] | Record<string, MempoolTransactionInterface>>(
      'getrawmempool',
      [verbose ?? false, mempool_sequence ?? false],
    );
  }

  /**
   * Get Transaction Output
   *
   * @param {string} txid The transaction id
   * @param {number} n vout number
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettxout.html
   * @return {Promise} Returns details about an unspent transaction output.
   */
  getTxOut(txid: string, n: number): Promise<TxOutInterface>;
  /**
   * Get Transaction Output
   *
   * @param {string} txid The transaction id
   * @param {number} n vout number
   * @param {boolean} [includeMempool=false] Include Mempool
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettxout.html
   * @return {Promise} Returns details about an unspent transaction output.
   */
  getTxOut(
    txid: string,
    n: number,
    includeMempool: false,
  ): Promise<TxOutInterface>;
  /**
   * Get Transaction Output
   *
   * @param {string} txid The transaction id
   * @param {number} n vout number
   * @param {boolean} [includeMempool=true] Whether to include the mempool. Note that an unspent output that is spent in the mempool won’t appear.
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettxout.html
   * @return {Promise} Returns details about an unspent transaction output.
   */
  getTxOut(
    txid: string,
    n: number,
    includeMempool: true,
  ): Promise<TxOutInterface>;
  getTxOut(
    txid: string,
    n: number,
    includeMempool?: boolean,
  ): Promise<TxOutInterface> {
    return this.call<TxOutInterface>('gettxout', [
      txid,
      n,
      includeMempool ?? true,
    ]);
  }

  /**
   * Get Transaction Output Proof
   *
   * @param {string[]} txid The txids to filter
   * @param {string} [blockHash] If specified, looks for txid in the block with this hash
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettxoutproof.html
   * @return {Promise} A string that is a serialized, hex-encoded data for the proof.
   */
  getTxOutProof(txid: string[], blockHash?: string): Promise<string> {
    return this.call<string>('gettxoutproof', [txid, blockHash]);
  }

  /**
   * Get Transaction Outset Info
   *
   * Note this call may take some time.
   *
   * @param {('hash_serialized_2'|'none')} hashType Which UTXO set hash should be calculated.
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettxoutsetinfo.html
   * @return {Promise} Returns statistics about the unspent transaction output set.
   */
  getTxOutsetInfo(
    hashType?: 'hash_serialized_2' | 'none',
  ): Promise<TxOutsetInfoInterface> {
    return this.call<TxOutsetInfoInterface>('gettxoutsetinfo', [
      hashType ?? 'hash_serialized_2',
    ]);
  }

  /**
   * Treats a block as if it were received before others with the same work.
   *
   * A later preciousblock call can override the effect of an earlier one.
   *
   * The effects of preciousblock are not retained across restarts.
   *
   * @param {string} blockhash - The block hash
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/preciousblock.html
   * @return {null}
   */
  preciousBlock(blockhash: string): Promise<null> {
    return this.call<null>('preciousblock', [blockhash]);
  }

  /**
   * Prune Blockchain
   *
   * @param {number} height The block height to prune up to.
   * May be set to a discrete height, or to a UNIX epoch time
   * to prune blocks whose block time is at least 2 hours older
   * than the provided timestamp.
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/pruneblockchain.html
   * @return {number} Height of the last block pruned
   */
  pruneBlockchain(height: number): Promise<number> {
    return this.call<number>('pruneblockchain', [height]);
  }

  /**
   * TDumps the mempool to disk. It will fail until the previous
   * dump is fully loaded.
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/preciousblock.html
   * @return {null}
   */
  saveMempool(): Promise<null> {
    return this.call<null>('preciousblock', []);
  }

  /**
   * Scan Transaction Outset
   * @param {string} [action=abort] The action to execute
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/scantxoutset.html
   * @return {null}
   */
  scanTxOutset(action: 'abort'): Promise<null>;
  /**
   * Scan Transaction Outset
   * @param {string} [action=status] The action to execute
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/scantxoutset.html
   * @return {number} progress report (in %) of the current scan
   */
  scanTxOutset(action: 'status'): Promise<number>;
  /**
   * Scan Transaction Outset
   * @param {string} [action=start] The action to execute
   * @param {object} scanobjects Array of scan objects. Required for “start” action
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/scantxoutset.html
   * @return {number} progress report (in %) of the current scan
   */
  scanTxOutset(
    action: 'start',
    scanobjects?: TYPE_SCAN_TX_OUTSET_SCAN_OBJECTS,
  ): Promise<TxOutsetInterface>;
  scanTxOutset(
    action: 'abort' | 'status' | 'start',
    scanobjects?: TYPE_SCAN_TX_OUTSET_SCAN_OBJECTS,
  ): Promise<null | number | TxOutsetInterface> {
    return this.call<null | number | TxOutsetInterface>('scantxoutset', [
      action,
      scanobjects,
    ]);
  }

  /**
   * Verify Chain
   *
   * How thorough the block verification is:
   * - level 0 reads the blocks from disk
   *
   * - level 1 verifies block validity
   *
   * - level 2 verifies undo data
   *
   * - level 3 checks disconnection of tip blocks
   *
   * - level 4 tries to reconnect the blocks
   *
   * each level includes the checks of the previous levels
   *
   * @param {number} [checklevel] Level
   * @param {number} [nblocks] The number of blocks to check.
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/verifychain.html
   * @return {boolean} Verified or not
   */
  verifyChain(checklevel?: number, nblocks?: number): Promise<boolean> {
    return this.call<boolean>('verifychain', [checklevel, nblocks]);
  }

  /**
   * Verify Transaction Output Proof
   *
   * @param {string} proof The hex-encoded proof generated by gettxoutproof
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/verifytxoutproof.html
   * @return {string[]} The txid(s) which the proof commits to, or empty array if the proof can not be validated.
   */
  verifyTxOutProof(proof: string): Promise<string[]> {
    return this.call<string[]>('verifytxoutproof', [proof]);
  }
}
