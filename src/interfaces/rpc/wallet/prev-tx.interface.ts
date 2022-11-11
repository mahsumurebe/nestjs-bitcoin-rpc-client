export interface PrevTxInterface {
  /**
   * The transaction id
   *
   * @type {string}
   */
  txid: string;
  /**
   * The output number
   *
   * @type {number}
   */
  vout: number;
  /**
   * script key
   *
   * @type {string}
   */
  scriptPubKey: string;
  /**
   * redeem script
   *
   * @type {string}
   */
  redeemScript?: string;
  /**
   * witness script
   *
   * @type {string}
   */
  witnessScript?: string;
  /**
   * the amount spent
   *
   * @type {string}
   */
  amount?: number | string;
}
