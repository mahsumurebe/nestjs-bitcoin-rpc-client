export interface SignRawTransactionWithWalletError {
  /**
   * The hash of the referenced, previous transaction
   *
   * @type {string}
   */
  txid: string;

  /**
   * The index of the output to spent and used as input
   *
   * @type {number}
   */
  vout: number;

  /**
   * The hex-encoded signature script
   *
   * @type {string}
   */
  scriptSig: string;

  /**
   * Script sequence number
   *
   * @type {number}
   */
  sequence: number;

  /**
   * Verification or signing error related to the input
   *
   * @type {string}
   */
  error: string;
}

export interface SignRawTransactionWithWalletInterface {
  /**
   * (string) The hex-encoded raw transaction with signature(s)
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

  /**
   * Script verification errors (if there are any)
   *
   * @type {SignRawTransactionWithWalletError[]}
   */
  errors: SignRawTransactionWithWalletError[];
}
