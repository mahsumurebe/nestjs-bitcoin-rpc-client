export interface WalletProcessPsbtInterface {
  /**
   * If the transaction has a complete set of signatures
   *
   * @type {boolean}
   */
  complete: boolean;

  /**
   * If more signatures are needed, or if add_to_wallet is false, the base64-encoded (partially) signed transaction
   *
   * @type {string}
   */
  psbt: string;
}
