interface SignError {
  /**
   * The hash of the referenced, previous transaction
   */
  txid: string;
  /**
   * The index of the output to spent and used as input
   */
  vout: number;
  /**
   * The hex-encoded signature script
   */
  scriptSig: string;
  /**
   * Script sequence number
   */
  sequence: number;
  /**
   * Verification or signing error related to the input
   */
  error: string;
}

export interface SignRawTransactionWithKeyCompletedInterface
  extends SignRawTransactionWithKeyInterface {
  /**
   * If the transaction has a complete set of signatures
   *
   * @type {boolean}
   */
  complete: boolean;
}

export interface SignRawTransactionWithKeyErrorInterface
  extends SignRawTransactionWithKeyInterface {
  /**
   * Script verification errors (if there are any)
   * @type {Array}
   */
  errors?: SignError[];
}

export interface SignRawTransactionWithKeyInterface {
  /**
   * The hex-encoded raw transaction with signature(s)
   *
   * @type {string}
   */
  hex: string;
}
