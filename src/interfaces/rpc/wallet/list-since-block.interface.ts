export interface ListSinceBlockTransactionInterface {
  /**
   * Only returns true if imported addresses were involved in transaction.
   *
   * @type {boolean}
   */
  involvesWatchonly: boolean;
  /**
   * The bitcoin address of the transaction.
   *
   * @type {string}
   */
  address: string;
  /**
   * The transaction category.
   *
   * "send"                  Transactions sent.
   * "receive"               Non-coinbase transactions received.
   * "generate"              Coinbase transactions received with more than 100 confirmations.
   * "immature"              Coinbase transactions received with 100 or fewer confirmations.
   * "orphan"                Orphaned coinbase transactions received.
   *
   * @type {string}
   */
  category: 'send' | 'receive' | 'generate' | 'immature' | 'orphan';
  /**
   * The amount in BTC. This is negative for the 'send' category, and is positive for all
   * other categories
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
   * The amount of the fee in BTC. This is negative and only available for the 'send' category
   * of transactions.
   *
   * @type {number}
   */
  fee: number;
  /**
   * The number of confirmations for the transaction. Negative confirmations means the transaction
   * conflicted that many blocks ago.
   *
   * @type {number}
   */
  confirmations: number;
  /**
   * Only present if transaction only input is a coinbase one.
   *
   * @type {boolean}
   */
  generated: boolean;
  /**
   * Only present if we consider transaction to be trusted and so safe to spend from.
   *
   * @type {boolean}
   */
  trusted: boolean;
  /**
   * The block hash containing the transaction.
   *
   * @type {string}
   */
  blockhash: string;
  /**
   * The block height containing the transaction.
   *
   * @type {number}
   */
  blockheight: number;
  /**
   * The index of the transaction in the block that includes it.
   *
   * @type {number}
   */
  blockindex: number;
  /**
   * The block time expressed in UNIX epoch time.
   *
   * @type {number}
   */
  blocktime: number;
  /**
   * The transaction id.
   *
   * @type {string}
   */
  txid: string;
  /**
   * Conflicting transaction ids.
   *
   * @type {string[]}
   */
  walletconflicts: string[];
  /**
   * The transaction time expressed in UNIX epoch time.
   *
   * @type {number}
   */
  time: number;
  /**
   * The time received expressed in UNIX epoch time.
   *
   * @type {number}
   */
  timereceived: number;
  /**
   * If a comment is associated with the transaction, only present if not empty.
   *
   * @type {string}
   */
  comment: string;
  /**
   * Whether this transaction could be replaced due to BIP125 (replace-by-fee); may be unknown
   * for unconfirmed transactions not in the mempool
   *
   * @type {string}
   */
  'bip125-replaceable': 'yes|no|unknown';
  /**
   * 'true' if the transaction has been abandoned (inputs are respendable). Only available for
   * the 'send' category of transactions.
   *
   * @type {boolean}
   */
  abandoned: boolean;
  /**
   * If a comment to is associated with the transaction.
   *
   * @type {string}
   */
  to: string;
}

export interface ListSinceBLockRemovedTransactionInterface
  extends ListSinceBlockTransactionInterface {
  include_removed: true;
}

export interface ListSinceBlockInterface {
  /**
   *
   * @type {object[]}
   */
  transactions: ListSinceBlockTransactionInterface[];
  /**
   * <structure is the same as "transactions" above, only present if include_removed=true>
   * Note: transactions that were re-added in the active chain will appear as-is in this array,
   * and may thus have a positive confirmation count.
   *
   * @type {object[]}
   */
  removed: ListSinceBLockRemovedTransactionInterface[];
  /**
   * The hash of the block (target_confirmations-1) from the best block on the main chain, or
   * the genesis hash if the referenced block does not exist yet. This is typically used to
   * feed back into listsinceblock the next time you call it. So you would generally use a
   * target_confirmations of say 6, so you will be continually re-notified of transactions
   * until they've reached 6 confirmations plus any new ones
   */
  lastblock: string;
}
