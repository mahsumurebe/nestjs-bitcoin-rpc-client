export interface BlockHeaderInterface {
  /**
   * the block hash (same as provided)
   * @type {string}
   */
  hash: string;
  /**
   * The number of confirmations, or -1 if the block is not on the main chain
   * @type {number}
   */
  confirmations: number;
  /**
   * The block height or index
   * @type {number}
   */
  height: number;
  /**
   * The block version
   * @type {number}
   */
  version: number;
  /**
   * The block version formatted in hexadecimal
   * @type {string}
   */
  versionHex: string;
  /**
   * The merkle root
   * @type {string}
   */
  merkleroot: string;
  /**
   * The block time expressed in UNIX epoch time
   * @type {number}
   */
  time: number;
  /**
   * The median block time expressed in UNIX epoch time
   * @type {number}
   */
  mediantime: number;
  /**
   * The nonce
   * @type {number}
   */
  nonce: number;
  /**
   * The bits
   * @type {string}
   */
  bits: string;
  /**
   * The difficulty
   * @type {number}
   */
  difficulty: number;
  /**
   * Expected number of hashes required to produce the current chain
   * @type {string}
   */
  chainwork: string;
  /**
   * The number of transactions in the block
   * @type {number}
   */
  nTx: number;
  /**
   * The hash of the previous block
   * @type {string}
   */
  previousblockhash: string;
  /**
   * The hash of the next block
   * @type {string}
   */
  nextblockhash: string;
}
