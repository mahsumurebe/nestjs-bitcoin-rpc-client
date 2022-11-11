export interface LockUnspendTransactionInterface {
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
}
