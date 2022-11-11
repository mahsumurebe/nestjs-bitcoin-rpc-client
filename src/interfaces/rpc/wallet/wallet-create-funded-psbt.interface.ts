export interface WalletCreateFundedPsbtInterface {
  /**
   * The resulting raw transaction (base64-encoded string)
   *
   * @type {number}
   */
  psbt: string;

  /**
   * Fee in BTC the resulting transaction pays
   *
   * @type {number}
   */
  fee: number;

  /**
   * The position of the added change output, or -1
   *
   * @type {number}
   */
  changepos: number;
}
