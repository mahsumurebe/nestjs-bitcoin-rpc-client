/**
 * Mempool Info Interface
 *
 * @interface
 */
export interface MempoolInfoInterface {
  /**
   * True if the mempool is fully loaded
   *
   * @type {boolean}
   */
  loaded: boolean;
  /**
   * Current tx count
   *
   * @type {number}
   */
  size: number;
  /**
   * Sum of all virtual transaction sizes as defined in BIP 141. Differs from actual serialized size because witness data is discounted
   *
   * @type {number}
   */
  bytes: number;
  /**
   * Total memory usage for the mempool
   *
   * @type {number}
   */
  usage: number;
  /**
   * Maximum memory usage for the mempool
   *
   * @type {number}
   */
  maxmempool: number;
  /**
   * Minimum fee rate in BTC/kB for tx to be accepted. Is the maximum of minrelaytxfee and minimum mempool fee
   *
   * @type {number}
   */
  mempoolminfee: number;
  /**
   * Current minimum relay fee for transactions
   *
   * @type {number}
   */
  minrelaytxfee: number;
  /**
   * Current number of transactions that haven't passed initial broadcast yet
   *
   * @type {number}
   */
  unbroadcastcount: number;
}
