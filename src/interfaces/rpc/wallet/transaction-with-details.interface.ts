import { TransactionDetailInterface } from '../index';

export interface TransactionWithDetailsInterface {
  /**
   * Transaction Details
   *
   * @type {TransactionDetailInterface}
   */
  details: TransactionDetailInterface;
}
