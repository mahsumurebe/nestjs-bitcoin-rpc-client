import { TYPE_ADDRESS_TYPES, TYPE_ESTIMATE_MODE } from '../../../types';

export interface WalletCreateFundedPsbtOptionsInterface {
  /**
   * If inputs are specified, automatically include more if they are not enough.
   *
   * @default false
   * @type {boolean}
   */
  add_inputs?: boolean;
  /**
   *  The bitcoin address to receive the change
   *
   * @default pool address
   * @type {string}
   */
  changeAddress?: string;
  /**
   *  The index of the change output
   *
   * @default random
   * @type {number}
   */
  changePosition?: number;
  /**
   * The output type to use. Only valid if changeAddress is not specified. Options are "legacy", "p2sh-segwit", and "bech32".
   *
   * @default set by -changetype on daemon argument
   * @type {string}
   */
  change_type?: TYPE_ADDRESS_TYPES;
  /**
   * Also select inputs which are watch only
   *
   * @default true for watch-only wallets, otherwise false
   * @type {boolean}
   */
  includeWatching?: boolean;
  /**
   * Lock selected unspent outputs
   *
   * @default false
   * @type {boolean}
   */
  lockUnspents?: boolean;
  /**
   * Specify a fee rate in sat/vB.
   *
   * @default not set, fall back to wallet fee estimation
   * @type {number | string}
   */
  fee_rate?: number | string;
  /**
   * Specify a fee rate in BTC/kvB.
   *
   * @default not set, fall back to wallet fee estimation
   * @type {number | string}
   */
  feeRate?: number | string;
  /**
   * The zero-based output index, before a change output is added.
   *
   * The outputs to subtract the fee from.
   * The fee will be equally deducted from the amount of each specified output.
   * Those recipients will receive less bitcoins than you enter in their corresponding amount field.
   * If no outputs are specified here, the sender pays the fee.
   *
   * @default []
   * @type {number[]}
   */
  subtractFeeFromOutputs?: string[];
  /**
   * Marks this transaction as BIP125 replaceable.
   * Allows this transaction to be replaced by a transaction with higher fees
   *
   * @default wallet default
   * @type {boolean}
   */
  replaceable: boolean;
  /**
   * Confirmation target in blocks
   *
   * @default set by -txconfirmtarget on daemon argument
   * @type {number}
   */
  conf_target: number;
  /**
   * The fee estimate mode, must be one of (case insensitive): "unset" "economical" "conservative"
   *
   * @type {string}
   */
  estimate_mode: TYPE_ESTIMATE_MODE;
}
