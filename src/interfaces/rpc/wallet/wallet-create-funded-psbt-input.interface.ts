export interface WalletCreateFundedPsbtInputInterface {
  /**
   * The transaction id
   * @type {string}
   */
  txid: string;
  /**
   * The output number
   * @type {number}
   */
  vout: number;
  /**
   * The sequence number
   *
   * @default depends on the value of the 'locktime' and 'options.replaceable' arguments
   * @type {number}
   */
  sequence?: number;
}
