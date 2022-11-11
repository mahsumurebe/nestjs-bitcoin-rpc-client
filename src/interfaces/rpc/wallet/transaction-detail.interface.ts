export interface TransactionDetailInterface {
  /**
   * Only returns true if imported addresses were involved in transaction.
   *
   * @type {boolean}
   */
  involvesWatchonly: boolean;
  /**
   * The bitcoin address involved in the transaction.
   *
   * @type {string}
   */
  address: string;
  /**
   * The transaction category.
   *
   * if value is "send", Transactions sent.
   *
   * if value is "receive", Non-coinbase transactions received.
   *
   * if value is "generate", Coinbase transactions received with more than 100 confirmations.
   *
   * if value is "immature", Coinbase transactions received with 100 or fewer confirmations.
   *
   * if value is "orphan", Orphaned coinbase transactions received.
   *
   * @type {"send"|"receive"|"generate"|"immature"|"orphan"}
   */
  category: string;
  /**
   * The amount in BTC
   *
   * @type {number}
   */
  amount: number;
  /**
   * A comment for the address/transaction, if any
   *
   * @type {string}
   */
  label: string;
  /**
   * the vout value
   *
   * @type {number}
   */
  vout: number;
  /**
   * The amount of the fee in BTC. This is negative and only available for the 'send' category of transactions.
   *
   * @type {number}
   */
  fee: number;
  /**
   * 'true' if the transaction has been abandoned (inputs are respendable). Only available for the 'send' category of transactions.
   *
   * @type {boolean}
   */
  abandoned: boolean;
}
