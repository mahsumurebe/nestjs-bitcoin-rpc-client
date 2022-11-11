export interface EstimateSmartFeeInterface {
  /**
   * estimate fee rate in BTC/kB (only present if no errors were encountered)
   *
   * @type {number}
   */
  feerate?: number;
  /**
   * Errors encountered during processing (if there are any)
   *
   * @type {string[]}
   */
  errors?: string[];
  /**
   * block number where estimate was found
   * The request target will be clamped between 2 and the highest target
   * fee estimation is able to return based on how long it has been running.
   * An error is returned if not enough transactions and blocks
   * have been observed to make an estimate for any number of blocks.
   *
   * @type {number}
   */
  blocks: number;
}
