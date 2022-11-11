import { TYPE_ADDRESS_TYPES, TYPE_ESTIMATE_MODE } from '../../../types';

/**
 * @interface
 */
export interface FundRawTransactionOptionsInterface {
  /**
   * For a transaction with existing inputs, automatically include more if they are not enough.
   *
   * @type {boolean}
   * @default true
   */
  add_inputs?: boolean;
  /**
   * The bitcoin address to receive the change
   * @type {string}
   * @default pool address
   */
  changeAddress?: string;
  /**
   * The index of the change output
   *
   * @type {number}
   * @default random number
   */
  changePosition?: number;
  /**
   * The output type to use. Only valid if changeAddress is not specified.
   * Options are "legacy", "p2sh-segwit", and "bech32".
   * @type {string}
   * @default set by -changetype on daemon argument
   */
  change_type?: TYPE_ADDRESS_TYPES;
  /**
   * true for watch-only wallets, otherwise false
   * Also select inputs which are watch only.
   * Only solvable inputs can be used. Watch-only destinations are solvable
   * if the public key and/or output script was imported,
   * e.g. with 'importpubkey' or 'importmulti' with the 'pubkeys' or 'desc' field.
   *
   * @type {boolean}
   * @default true
   */
  includeWatching?: boolean;
  /**
   * Lock selected unspent outputs
   *
   * @type {boolean}
   * @default false
   */
  lockUnspents?: boolean;
  /**
   * Specify a fee rate in sat/vB.
   *
   * @type {number|string}
   * @default not set, fall back to wallet fee estimation
   */
  fee_rate?: number | string;
  /**
   * Specify a fee rate in BTC/kvB.
   *
   * @type {number|string}
   * @default not set, fall back to wallet fee estimation
   */
  feeRate?: number | string;
  /**
   * The zero-based output index, before a change output is added.
   *
   * The fee will be equally deducted from the amount of each specified output.
   * Those recipients will receive less bitcoins than you enter in their corresponding amount field.
   * If no outputs are specified here, the sender pays the fee.
   */
  subtractFeeFromOutputs?: number[];

  /**
   * Marks this transaction as BIP125 replaceable. Allows this transaction to be replaced by a transaction with higher fees
   *
   * @type {boolean}
   * @default wallet default
   */
  replaceable?: boolean;
  /**
   * Confirmation target in blocks
   *
   * @type {number}
   * @default set by -txconfirmtarget on daemon argument
   */
  conf_target?: number;
  /**
   * The fee estimate mode, must be one of (case insensitive):
   * “unset” “economical” “conservative”
   * @type {string}
   * @default unset
   */
  estimate_mode?: TYPE_ESTIMATE_MODE;
}
