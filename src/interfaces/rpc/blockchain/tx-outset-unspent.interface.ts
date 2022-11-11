/**
 * Transaction Outset Unspent
 *
 * @interface
 */
export interface TxOutsetUnspentInterface {
  txid: string; // (string) The transaction id
  vout: number; // (numeric) The vout value
  scriptPubKey: string; // (string) The script key
  desc: string; // (string) A specialized descriptor for the matched scriptPubKey
  amount: number; // (numeric) The total amount in BTC of the unspent output
  height: number; // (numeric) Height of the unspent transaction output
}
