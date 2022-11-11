export interface ListUnspendQueryOptionsInterface {
  /**
   * Minimum value of each UTXO in BTC
   *
   * @default 0
   * @type {number|string}
   */
  minimumAmount: number | string;

  /**
   * Maximum value of each UTXO in BTC
   *
   * @default unlimited
   * @type {number|string}
   */
  maximumAmount: number | string;

  /**
   * Maximum number of UTXOs
   *
   * @default unlimited
   * @type {number}
   */
  maximumCount: number;

  /**
   * Minimum sum value of all UTXOs in BTC
   *
   * @default unlimited
   * @type {number|string}
   */
  minimumSumAmount: number | string;
}
