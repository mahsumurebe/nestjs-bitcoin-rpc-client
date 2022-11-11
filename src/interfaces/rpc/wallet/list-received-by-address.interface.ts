export interface ListReceivedByAddressInterface {
  /**
   * Only returns true if imported addresses were involved in transaction
   *
   * @type {boolean}
   */
  involvesWatchonly: boolean;
  /**
   * The receiving address
   *
   * @type {string}
   */
  address: string;
  /**
   * The total amount in BTC received by the address
   *
   * @type {number}
   */
  amount: number;
  /**
   * The number of confirmations of the most recent transaction included
   *
   * @type {number}
   */
  confirmations: number;
  /**
   * The label of the receiving address. The default label is ""
   *
   * @default ""
   * @type {string}
   */
  label: string;
  /**
   * The ids of transactions received with the address
   *
   * @type {string[]}
   */
  txids: string[];
}
