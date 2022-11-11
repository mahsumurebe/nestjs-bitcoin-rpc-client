export interface ListReceivedByLabelInterface {
  /**
   * Only returns true if imported addresses were involved in transaction
   *
   * @type {boolean}
   */
  involvesWatchonly: boolean;
  /**
   * The total amount received by addresses with this label
   *
   * @type {number}
   */
  amount: number;
  /**
   * The total amount received by addresses with this label
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
}
