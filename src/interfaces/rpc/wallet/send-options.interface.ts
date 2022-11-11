import { TYPE_ADDRESS_TYPES, TYPE_ESTIMATE_MODE } from '../../../types';

export interface SendOptionsInterface {
  /**
   * If inputs are specified, automatically include more if they are not enough.
   *
   * @default false
   * @type {boolean}
   */
  add_inputs?: boolean;
  /**
   * When false, returns a serialized transaction which will not be added to the wallet or broadcast
   *
   * @default true
   * @type {boolean}
   */
  add_to_wallet?: boolean;
  /**
   * The bitcoin address to receive the change
   *
   * @default pool address
   * @type {string}
   */
  change_address?: string;
  /**
   * The index of the change output
   *
   * @default random
   * @type {number}
   */
  change_position?: number;
  /**
   *The output type to use. Only valid if change_address is not specified. Options are "legacy", "p2sh-segwit", and "bech32".
   *
   * @default set by -changetype on daemon argument
   * @type {string}
   */
  change_type?: TYPE_ADDRESS_TYPES;
  /**
   *Confirmation target in blocks
   *
   * @default set by -txconfirmtarget on daemon argument
   * @type {number}
   */
  conf_target?: number;
  /**
   * The fee estimate mode, must be one of (case insensitive): "unset","economical","conservative"
   * @default unset
   * @type {string}
   */
  estimate_mode?: TYPE_ESTIMATE_MODE;
  /**
   * Specify a fee rate in sat/vB.
   *
   * @default not set, fall back to wallet fee estimation
   * @type {number|string}
   */
  fee_rate?: number | string;
  /**
   * Also select inputs which are watch only. Only solvable inputs can be used. Watch-only
   * destinations are solvable if the public key and/or output script was imported, e.g. with
   * 'importpubkey' or 'importmulti' with the 'pubkeys' or 'desc' field.
   *
   * @default true for watch-only wallets, otherwise false
   * @type {boolean}
   */
  include_watching?: boolean;
  /**
   * (json array, optional, default=empty array) Specify inputs instead of adding them automatically. A JSON array of JSON objects
   *   "txid",                         (string, required) The transaction id
   *   vout,                           (numeric, required) The output number
   *   sequence,                       (numeric, required) The sequence number
   *   ...
   */
  inputs?: any[];

  [key: string]: any;
}
