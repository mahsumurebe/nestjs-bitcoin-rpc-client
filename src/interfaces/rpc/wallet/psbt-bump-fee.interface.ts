export interface PsbtBumpFeeInterface {
  /**
   * The base64-encoded unsigned PSBT of the new transaction.
   *
   * @type {string}
   */
  psbt: string;
  /**
   * The fee of the replaced transaction.
   *
   * @type {number}
   */
  origfee: number;
  /**
   * The fee of the new transaction.
   *
   * @type {number}
   */
  fee: number;
  /**
   * Errors encountered during processing (may be empty).
   *
   * @∂efault []
   * @type {string[]}
   */
  errors: string[];
}
