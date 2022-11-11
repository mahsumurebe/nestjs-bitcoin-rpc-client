/**
 *
 * @interface
 */
export interface BlockTemplateTransactionInterface {
  /**
   * transaction data encoded in hexadecimal (byte-for-byte)
   *
   * @type {string}
   */
  data: string;
  /**
   * transaction id encoded in little-endian hexadecimal
   *
   * @type {string}
   */
  txid: string;
  /**
   * hash encoded in little-endian hexadecimal (including witness data)
   *
   * @type {string}
   */
  hash: string;
  /**
   * transactions before this one (by 1-based index in 'transactions' list) that must be present in the final block if this one is
   *-
   * @type {number[]}
   */
  depends: number[];
  /**
   * difference in value between transaction inputs and outputs (in satoshis); for coinbase transactions, this is a negative Number of the total collected block fees (ie, not including the block subsidy); if key is not present, fee is unknown and clients MUST NOT assume there isn't one
   *
   * @type {number}
   */
  fee: number;
  /**
   * total SigOps cost, as counted for purposes of block limits; if key is not present, sigop cost is unknown and clients MUST NOT assume it is zero
   *
   * @type {number}
   */
  sigops: number;
  /**
   * total transaction weight, as counted for purposes of block limits
   *
   * @type {number}
   */
  weight: number;
}
