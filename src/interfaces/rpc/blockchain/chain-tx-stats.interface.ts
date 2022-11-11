export interface ChainTxStatsInterface {
  /**
   * The timestamp for the final block in the window, expressed in UNIX epoch time
   *
   * @type {number}
   */
  time: number;
  /**
   * The total number of transactions in the chain up to that point
   *
   * @type {number}
   */
  txcount: number;
  /**
   * The hash of the final block in the window
   *
   * @type {string}
   */
  window_final_block_hash: string;
  /**
   * The height of the final block in the window.
   *
   * @type {number}
   */
  window_final_block_height: number;
  /**
   * Size of the window in number of blocks
   *
   * @type {number}
   */
  window_block_count: number;
  /**
   * The number of transactions in the window. Only returned if "window_block_count" is > 0
   *
   * @type {number}
   */
  window_tx_count: number;
  /**
   * The elapsed time in the window in seconds. Only returned if "window_block_count" is > 0
   *
   * @type {number}
   */
  window_interval: number;
  /**
   * The average rate of transactions per second in the window. Only returned if "window_interval" is > 0
   *
   * @type {number}
   */
  txrate: number;
}
