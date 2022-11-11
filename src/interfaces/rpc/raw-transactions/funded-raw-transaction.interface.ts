export interface FundedRawTransactionInterface {
  /**
   * The resulting raw transaction (hex-encoded string)
   * @type {string}
   */
  hex: string;
  /**
   * Fee in BTC the resulting transaction pays
   * @type {number}
   */
  fee: number;
  /**
   * The position of the added change output, or -1
   * @type {number}
   */
  changepos: number;
}
