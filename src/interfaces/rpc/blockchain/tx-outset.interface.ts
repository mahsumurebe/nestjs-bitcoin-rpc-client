import { TxOutsetUnspentInterface } from './tx-outset-unspent.interface';

/**
 * Transaction Outset Interface
 *
 * @interface
 */

export interface TxOutsetInterface {
  /**
   * Whether the scan was completed
   *
   * @type {boolean}
   */
  success: boolean;

  /**
   * The number of unspent transaction outputs scanned
   *
   * @type {number}
   */
  txouts: number;

  /**
   * The current block height (index)
   *
   * @type {number}
   */
  height: number;

  /**
   * The hash of the block at the tip of the chain
   *
   * @type {string}
   */
  bestblock: string;

  /**
   * Transaction Outset Unspents
   *
   * @type {TxOutsetUnspentInterface[]}
   */
  unspents: TxOutsetUnspentInterface[];

  /**
   * The total amount of all found unspent outputs in BTC
   *
   * @type {number}
   */
  total_amount: number;
}
