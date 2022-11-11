import { GetBlockChainInfoSoftForksInterface } from './get-block-chain-info-soft-forks.interface';

export interface GetBlockChainInfoInterface {
  /**
   * current network name (main, test, regtest)
   *
   * @type {string}
   */
  chain: string;
  /**
   * the height of the most-work fully-validated chain. The genesis block has height 0
   *
   * @type {number}
   */
  blocks: number;
  /**
   * the current number of headers we have validated
   *
   * @type {number}
   */
  headers: number;
  /**
   * the hash of the currently best block
   *
   * @type {string}
   */
  bestblockhash: string;
  /**
   * the current difficulty
   *
   * @type {number}
   */
  difficulty: number;
  /**
   * median time for the current best block
   *
   * @type {number}
   */
  mediantime: number;
  /**
   * estimate of verification progress [0..1]
   *
   * @type {number}
   */
  verificationprogress: number;
  /**
   * (debug information) estimate of whether this node is in Initial Block Download mode
   *
   * @type {boolean}
   */
  initialblockdownload: boolean;
  /**
   * total amount of work in active chain, in hexadecimal
   *
   * @type {string}
   */
  chainwork: string;
  /**
   * the estimated size of the block and undo files on disk
   *
   * @type {number}
   */
  size_on_disk: number;
  /**
   * if the blocks are subject to pruning
   *
   * @type {boolean}
   */
  pruned: boolean;
  /**
   * lowest-height complete block stored (only present if pruning is enabled)
   *
   * @type {number}
   */
  pruneheight: number;
  /**
   * whether automatic pruning is enabled (only present if pruning is enabled)
   *
   * @type {boolean}
   */
  automatic_pruning: boolean;
  /**
   * the target size used by pruning (only present if automatic pruning is enabled)
   *
   * @type {number}
   */
  prune_target_size: number;
  /**
   * status of softforks
   *
   * @type {object}
   */
  softforks: { [key: string]: GetBlockChainInfoSoftForksInterface };
  /**
   * any network and blockchain warnings
   *
   * @type {string}
   */
  warnings: string;
}
