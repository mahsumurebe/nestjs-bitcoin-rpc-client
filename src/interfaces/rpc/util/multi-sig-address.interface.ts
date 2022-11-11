export interface MultiSigAddressInterface {
  /**
   * The value of the new multisig address.
   *
   * @type {string}
   */
  address: string;
  /**
   * The string value of the hex-encoded redemption script.
   *
   * @type {string}
   */
  redeemScript: string;
  /**
   * The descriptor for this multisig
   *
   * @type {string}
   */
  descriptor: string;
}
