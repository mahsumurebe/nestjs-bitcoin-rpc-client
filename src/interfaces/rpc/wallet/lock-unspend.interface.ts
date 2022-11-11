export interface LockUnspendInterface {
  /**
   * The transaction id locked
   *
   * @type {string}
   */
  txid: string;
  /**
   * The vout value
   *
   * @type {numeric}
   */
  vout: number;
}
