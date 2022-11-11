import { PsbtBumpFeeInterface } from './psbt-bump-fee.interface';

export interface BumpFeeInterface extends PsbtBumpFeeInterface {
  /**
   * The id of the new transaction. Only returned when wallet private keys are enabled.
   *
   * @type {string}
   */
  txid: string;
}
