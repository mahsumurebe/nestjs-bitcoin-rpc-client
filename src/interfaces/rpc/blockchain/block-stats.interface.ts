export interface BlockStatsInterface {
  avgfee: number; // (numeric) Average fee in the block
  avgfeerate: number; // (numeric) Average feerate (in satoshis per virtual byte)
  avgtxsize: number; // (numeric) Average transaction size
  blockhash: string; // (string) The block hash (to check for potential reorgs)
  feerate_percentiles: [
    // (json array) Feerates at the 10th, 25th, 50th, 75th, and 90th percentile weight unit (in satoshis per virtual byte)
    number, // (numeric) The 10th percentile feerate
    number, // (numeric) The 25th percentile feerate
    number, // (numeric) The 50th percentile feerate
    number, // (numeric) The 75th percentile feerate
    number, // (numeric) The 90th percentile feerate
  ];
  height: number; // (numeric) The height of the block
  ins: number; // (numeric) The number of inputs (excluding coinbase)
  maxfee: number; // (numeric) Maximum fee in the block
  maxfeerate: number; // (numeric) Maximum feerate (in satoshis per virtual byte)
  maxtxsize: number; // (numeric) Maximum transaction size
  medianfee: number; // (numeric) Truncated median fee in the block
  mediantime: number; // (numeric) The block median time past
  mediantxsize: number; // (numeric) Truncated median transaction size
  minfee: number; // (numeric) Minimum fee in the block
  minfeerate: number; // (numeric) Minimum feerate (in satoshis per virtual byte)
  mintxsize: number; // (numeric) Minimum transaction size
  outs: number; // (numeric) The number of outputs
  subsidy: number; // (numeric) The block subsidy
  swtotal_size: number; // (numeric) Total size of all segwit transactions
  swtotal_weight: number; // (numeric) Total weight of all segwit transactions
  swtxs: number; // (numeric) The number of segwit transactions
  time: number; // (numeric) The block time
  total_out: number; // (numeric) Total amount in all outputs (excluding coinbase and thus reward [ie subsidy + totalfee])
  total_size: number; // (numeric) Total size of all non-coinbase transactions
  total_weight: number; // (numeric) Total weight of all non-coinbase transactions
  totalfee: number; // (numeric) The fee total
  txs: number; // (numeric) The number of transactions (including coinbase)
  utxo_increase: number; // (numeric) The increase/decrease in the number of unspent outputs
  utxo_size_inc: number; // (numeric) The increase/decrease in size for the utxo index (not discounting op_return and similar)
}
