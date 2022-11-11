export interface MiningInfoInterface {
  /**
   * The current block
   *
   * @type {number}
   */
  blocks: number;

  /**
   * The block weight of the last assembled block (only present if a block was ever assembled)
   *
   * @type {number|undefined}
   */
  currentblockweight?: number;

  /**
   * The number of block transactions of the last assembled block (only present if a block was ever assembled)
   *
   * @type {number|undefined}
   */
  currentblocktx?: number;

  /**
   * The current difficulty
   *
   * @type {number}
   */
  difficulty: number;

  /**
   * The network hashes per second
   *
   * @type {number}
   */
  networkhashps: number;

  /**
   * The size of the mempool
   *
   * @type {number}
   */
  pooledtx: number;

  /**
   * (string) current network name (main, test, regtest)
   *
   */
  chain: string;

  /**
   * (string) any network and blockchain warnings
   *
   */
  warnings: string;
}
