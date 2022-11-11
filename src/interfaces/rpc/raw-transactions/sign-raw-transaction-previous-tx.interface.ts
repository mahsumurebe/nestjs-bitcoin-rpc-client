export interface SignRawTransactionPreviousTxInterface {
  /**
   * The transaction id
   *
   * @type {string}
   */
  txid: string;
  /**
   * (numeric) The output number
   *
   * @type {numeric}
   */
  vout: number;
  /**
   * script key
   *
   * @type {string}
   */
  scriptPubKey?: string;
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
   * @type {numeric|string}
   */
  amount?: number | string;
}
