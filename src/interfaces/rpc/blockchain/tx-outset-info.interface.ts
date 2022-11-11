/**
 * Transaction Outset Info
 *
 * @interface
 */
export interface TxOutsetInfoInterface {
  height: number; // The current block height (index)
  bestblock: string; // The hash of the block at the tip of the chain
  transactions: number; // The number of transactions with unspent outputs
  txouts: number; // The number of unspent transaction outputs
  bogosize: number; // A meaningless metric for UTXO set size
  hash_serialized_2: string; // The serialized hash (only present if 'hash_serialized_2' hash_type is chosen)
  disk_size: number; // The estimated size of the chainstate on disk
  total_amount: number; // The total amount
}
