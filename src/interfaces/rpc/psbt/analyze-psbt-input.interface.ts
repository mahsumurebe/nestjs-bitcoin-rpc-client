import { AnalyzePSBTInputMissingInterface } from './analyze-psbt-input-missing.interface';

/**
 * Analyze PSBT Input Interface
 *
 * @interface
 */
export interface AnalyzePSBTInputInterface {
  /**
   * Whether a UTXO is provided
   *
   * @type {boolean}
   */
  has_utxo: boolean;
  /**
   * Whether the input is finalized
   *
   * @type {boolean}
   */
  is_final: boolean;
  /**
   * Missing
   *
   * @type {object}
   */
  missing: Partial<AnalyzePSBTInputMissingInterface>[];
  /**
   * Role of the next person that this input needs to go to
   *
   * @type {string}
   */
  next?: string;
}
