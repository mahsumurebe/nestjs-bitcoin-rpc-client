import { TransactionVOutInterface } from '../index';

/**
 * Transaction Out
 *
 * @interface
 */
export interface TxOutInterface extends Omit<TransactionVOutInterface, 'n'> {
  bestblock: string; // The hash of the block at the tip of the chain
  confirmations: number; // The number of confirmations
  coinbase: boolean; // Coinbase or not
}
