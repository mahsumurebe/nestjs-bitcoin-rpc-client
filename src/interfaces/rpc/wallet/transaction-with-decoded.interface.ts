import { DecodedRawTransactionInterface } from '../index';

export interface TransactionWithDecodedInterface {
  /**
   * Optional, the decoded transaction (only present when `verbose` is passed) Equivalent to the RPC decoderawtransaction method, or the RPC getrawtransaction method when `verbose` is passed.
   *
   * @type {DecodedRawTransactionInterface}
   */
  decoded?: DecodedRawTransactionInterface;
}
