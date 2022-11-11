import { TransactionVInInterface, TransactionVOutInterface } from '../index';

export interface DecodedRawTransactionInterface<
  VIn extends TransactionVInInterface = TransactionVInInterface,
  TOut extends TransactionVOutInterface = TransactionVOutInterface,
> {
  /**
   * The serialized, hex-encoded data for 'txid'
   * @type {string}
   */
  hex: string;
  /**
   * The transaction id (same as provided)
   * @type {string}
   */
  txid: string;
  /**
   * The transaction hash (differs from txid for witness transactions)
   * @type {string}
   */
  hash: string;
  /**
   * The serialized transaction size
   * @type {number}
   */
  size: number;
  /**
   * The virtual transaction size (differs from size for witness transactions)
   * @type {number}
   */
  vsize: number;
  /**
   * The transaction's weight (between vsize*4-3 and vsize*4)
   * @type {number}
   */
  weight: number;
  /**
   * The version
   * @type {number}
   */
  version: number;
  /**
   * The lock time
   * @type {number}
   */
  locktime: number;
  vin: VIn[];
  vout: TOut[];
  /**
   * Whether specified block is in the active chain or not (only present with explicit "blockhash" argument)
   * @type {boolean}
   */
  in_active_chain?: boolean;
  /**
   * the block hash
   * @type {string}
   */
  blockhash?: string;
  /**
   * The confirmations
   * @type {number}
   */
  confirmations?: number;
  /**
   * The block time expressed in UNIX epoch time
   * @type {number}
   */
  blocktime?: number;
  /**
   * Same as "blocktime"
   * @type {number}
   */
  time?: number;
}
