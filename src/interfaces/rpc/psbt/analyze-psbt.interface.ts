import { AnalyzePSBTInputInterface } from './analyze-psbt-input.interface';

export interface AnalyzePSBTtInterface {
  /**
   * Inputs
   *
   * @type {AnalyzePSBTInputInterface}
   */
  inputs: AnalyzePSBTInputInterface[];
  /**
   * Estimated vsize of the final signed transaction
   *
   * @type {number}
   */
  estimated_vsize?: number;
  /**
   * Estimated feerate of the final signed transaction in BTC/kB. Shown only if all UTXO slots in the PSBT have been filled
   *
   * @type {number}
   */
  estimated_feerate?: number;
  /**
   * The transaction fee paid. Shown only if all UTXO slots in the PSBT have been filled
   *
   * @type {number}
   */
  fee?: number;
  /**
   * Role of the next person that this psbt needs to go to
   *
   * @type {string}
   */
  next: string;
  /**
   * Error message (if there is one)
   *
   * @type {string}
   */
  error?: string;
}
