/**
 * The public key with the derivation path as the value.
 *
 * @interface
 */
import {
  Bip32DerivationInterface,
  RedeemScriptInterface,
  WitnessScriptInterface,
  WitnessUtxoInterface,
} from './index';

export interface DecodePsbtInputInterface {
  /**
   * Decoded network transaction for non-witness UTXOs
   *
   * @type {object}
   */
  non_witness_utxo?: Record<string, string>;
  /**
   * Transaction output for witness UTXOs
   *
   * @type {object}
   */
  witness_utxo?: WitnessUtxoInterface;
  /**
   * The public key and signature that corresponds to it.
   * @type {object}
   */
  partial_signatures?: Record<string, string>;
  /**
   * The sighash type to be used
   *
   * @type {string}
   */
  sighash?: string;

  redeem_script?: RedeemScriptInterface;

  witness_script?: WitnessScriptInterface;

  /**
   * The public key with the derivation path as the value.
   *
   * @type {Bip32DerivationInterface[]}
   */
  bip32_derivs?: Bip32DerivationInterface[];

  final_scriptsig?: WitnessScriptInterface;

  /**
   * hex-encoded witness data (if any)
   *
   * @type {string[]}
   */
  final_scriptwitness: string[];

  /**
   * The unknown global fields
   * (key-value pair) An unknown key-value pair
   *
   * @type {object}
   */
  unknown: Record<string, string>;
}
