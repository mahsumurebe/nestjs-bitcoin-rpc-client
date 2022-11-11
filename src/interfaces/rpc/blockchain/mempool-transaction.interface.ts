export interface MempoolTransactionInterface {
  /**
   * virtual transaction size as defined in BIP 141. This is different from actual serialized size for witness transactions as witness data is discounted.
   * @type {number}
   */
  vsize: number;
  /**
   * transaction weight as defined in BIP 141.
   * @type {number}
   */
  weight: number;
  /**
   * transaction fee in BTC (DEPRECATED)
   * @type {number}
   */
  fee: number;
  /**
   * transaction fee with fee deltas used for mining priority (DEPRECATED)
   * @type {number}
   */
  modifiedfee: number;
  /**
   * local time transaction entered pool in seconds since 1 Jan 1970 GMT
   * @type {number}
   */
  time: number;
  /**
   * block height when transaction entered pool
   * @type {number}
   */
  height: number;
  /**
   * number of in-mempool descendant transactions (including this one)
   * @type {number}
   */
  descendantcount: number;
  /**
   * virtual transaction size of in-mempool descendants (including this one)
   * @type {number}
   */
  descendantsize: number;
  /**
   * modified fees (see above) of in-mempool descendants (including this one) (DEPRECATED)
   * @type {number}
   */
  descendantfees: number;
  /**
   * number of in-mempool ancestor transactions (including this one)
   * @type {number}
   */
  ancestorcount: number;
  /**
   * virtual transaction size of in-mempool ancestors (including this one)
   * @type {number}
   */
  ancestorsize: number;
  /**
   * modified fees (see above) of in-mempool ancestors (including this one) (DEPRECATED)
   * @type {number}
   */
  ancestorfees: number;
  /**
   * hash of serialized transaction, including witness data
   * @type {string}
   */
  wtxid: string;
  fees: {
    /**
     * transaction fee in BTC
     *
     * @type {number}
     */
    base: number;
    /**
     * transaction fee with fee deltas used for mining priority in BTC
     *
     * @type {number}
     */
    modified: number;
    /**
     * modified fees (see above) of in-mempool ancestors (including this one) in BTC
     *
     * @type {number}
     */
    ancestor: number;
    /**
     * modified fees (see above) of in-mempool descendants (including this one) in BTC
     *
     * @type {number}
     */
    descendant: number;
  };
  /**
   * unconfirmed transactions used as inputs for this transaction parent transaction id
   *
   * @type {string[]}
   */
  depends: string[];
  /**
   * unconfirmed transactions spending outputs from this transaction child transaction id
   *
   * @type {string[]}
   */
  spentby: string[];
  /**
   * Whether this transaction could be replaced due to BIP125 (replace-by-fee)
   *
   * @type {boolean}
   */
  'bip125-replaceable': boolean;
  /**
   * Whether this transaction is currently unbroadcast (initial broadcast not yet acknowledged by any peers)
   *
   * @type {boolean}
   */
  unbroadcast: boolean;
}
