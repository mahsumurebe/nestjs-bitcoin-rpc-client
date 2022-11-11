export interface TransactionInterface {
  /**
   * The amount in BTC
   *
   * @type {number}
   */
  amount: number;
  /**
   * The amount of the fee in BTC. This is negative and only available for the 'send' category of transactions.
   *
   * @type {string}
   */
  fee: number;
  /**
   * The number of confirmations for the transaction. Negative confirmations means the transaction conflicted that many blocks ago.
   *
   * @type {number}
   */
  confirmations?: number;
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
   * The block hash containing the transaction.*****
   *
   * @type {string}
   */
  blockhash?: string;
  /**
   * The block height containing the transaction.
   *
   * @type {number}
   */
  blockheight?: number;
  /**
   * The index of the transaction in the block that includes it.
   *
   * @type {number}
   */
  blockindex?: number;
  /**
   * The block time expressed in UNIX epoch time.
   *
   * @type {number}
   */
  blocktime?: number;
  /**
   * The transaction id. *****
   *
   * @type {string}
   */
  txid: string;
  /**
   * Conflicting transaction ids.
   * @type {string[]}
   */
  walletconflicts?: string[];
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
   * Whether this transaction could be replaced due to BIP125 (replace-by-fee);  may be unknown for unconfirmed transactions not in the mempool
   *
   * @type {'yes' | 'no' | 'unknown'}
   */
  'bip125-replaceable': 'yes' | 'no' | 'unknown';
  /**
   * Raw data for transaction
   *
   * @type {string}
   */
  hex: string;
}
