export interface TestMempoolAcceptInterface {
  /**
   * The transaction hash in hex
   *
   * @type {string}
   */
  txid: string;
  /**
   * If the mempool allows this tx to be inserted
   *
   * @type {boolean}
   */
  allowed: boolean;
  /**
   * Virtual transaction size as defined in BIP 141. This is different from actual serialized size for witness transactions as witness data is discounted (only present when 'allowed' is true)
   *
   * @type {numeric}
   */
  vsize: number;
  /**
   * Transaction fees (only present if 'allowed' is true)
   *
   * @type {object}
   */
  fees?: {
    base: number; // (numeric) transaction fee in BTC
  };
  /**
   * Rejection string (only present when 'allowed' is false)
   *
   * @type {string}
   */
  'reject-reason': string;
}
