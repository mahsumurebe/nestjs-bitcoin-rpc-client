export interface FinalizedPsbtInterface {
  /**
   * (string) The base64-encoded partially signed transaction if not extracted
   *
   * @type {string}
   */
  psbt: string;
  /**
   * (string) The hex-encoded network transaction if extracted
   *
   * @type {string}
   */
  hex: string;
  /**
   * (boolean) If the transaction has a complete set of signatures
   *
   * @type {boolean}
   */
  complete: boolean;
}
