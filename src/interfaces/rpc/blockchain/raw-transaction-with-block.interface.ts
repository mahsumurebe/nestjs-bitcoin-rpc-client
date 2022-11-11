import {
  DecodedRawTransactionInterface,
  TransactionVInInterface,
  TransactionVOutInterface,
} from '../index';

export interface RawTransactionWithBlockInterface<
  VIn extends TransactionVInInterface = TransactionVInInterface,
  TOut extends TransactionVOutInterface = TransactionVOutInterface,
> extends DecodedRawTransactionInterface<VIn, TOut> {
  in_active_chain: boolean; // (boolean) Whether specified block is in the active chain or not (only present with explicit "blockhash" argument)
  blockhash: string; // (string) the block hash
  confirmations: number; // (numeric) The confirmations
  blocktime: number; // (numeric) The block time expressed in UNIX epoch time
  time: number; // (numeric) Same as "blocktime"
}
