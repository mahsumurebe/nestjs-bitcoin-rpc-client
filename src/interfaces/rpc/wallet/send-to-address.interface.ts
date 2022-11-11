export interface SendToAddressInterface {
  /**
   * The transaction id for the send. Only 1 transaction is created regardless of the number of addresses.
   *
   * @type {string}
   */
  txid: string;
  /**
   * The transaction fee reason.
   *
   * @type {string}
   */
  'fee reason': string;
}
