import {
  Bip32DerivationInterface,
  BlockInterface,
  MempoolAncestorsInterface,
  RawTransactionWithBlockInterface,
  SignRawTransactionWithKeyCompletedInterface,
  SignRawTransactionWithKeyErrorInterface,
  TransactionInterface,
  TransactionVinWithPrevInterface,
  TransactionWithDecodedInterface,
  TransactionWithDetailsInterface,
  UpgradeWalletErrorInterface,
  UpgradeWalletSuccessInterface,
} from '../interfaces';
import { BaseServiceAbstract } from '../abstracts';

export type TYPE_BLOCK_WITH_TRANSACTION =
  BlockInterface<RawTransactionWithBlockInterface>;
export type TYPE_BLOCK =
  | BlockInterface
  | BlockInterface<RawTransactionWithBlockInterface>
  | BlockInterface<
      RawTransactionWithBlockInterface<TransactionVinWithPrevInterface>
    >
  | string;
export type TYPE_BLOCK_WITH_TRANSACTION_WITH_PREV = BlockInterface<
  RawTransactionWithBlockInterface<TransactionVinWithPrevInterface>
>;

export type TYPE_TRANSACTION_WITH_INCLUDE_WATCH = TransactionInterface &
  TransactionWithDetailsInterface;
export type TYPE_TRANSACTION_WITH_INCLUDE_VERBOSE = TransactionInterface &
  TransactionWithDetailsInterface &
  TransactionWithDecodedInterface;
export type TYPE_TRANSACTION =
  | TransactionInterface
  | TYPE_TRANSACTION_WITH_INCLUDE_WATCH
  | TYPE_TRANSACTION_WITH_INCLUDE_VERBOSE
  | TYPE_TRANSACTION_WITH_DETAILS;
export type TYPE_TRANSACTION_WITH_DETAILS = TransactionInterface &
  TransactionWithDetailsInterface;

export type TYPE_SCAN_TX_OUTSET_SCAN_OBJECTS = [string, object];

export type TYPE_LOGGING_CATEGORIES =
  | 'net'
  | 'tor'
  | 'mempool'
  | 'http'
  | 'bench'
  | 'zmq'
  | 'walletdb'
  | 'rpc'
  | 'estimatefee'
  | 'addrman'
  | 'selectcoins'
  | 'reindex'
  | 'cmpctblock'
  | 'rand'
  | 'prune'
  | 'proxy'
  | 'mempoolrej'
  | 'libevent'
  | 'coindb'
  | 'qt'
  | 'leveldb'
  | 'validation'
  | 'all'
  | 'none'
  | '1'
  | '0';

export type TYPE_LOGGING = Record<TYPE_LOGGING_CATEGORIES, boolean>;

export type TYPE_PSBT_OUTPUT_ADDRESS_VALUE_PAIR = { [address: string]: number };
export type TYPE_PSBT_OUTPUT_KEY_VALUE_PAIR = { data: string };
export type TYPE_CREATE_PSBT_OUTPUT =
  | TYPE_PSBT_OUTPUT_ADDRESS_VALUE_PAIR
  | TYPE_PSBT_OUTPUT_KEY_VALUE_PAIR;

export type TYPE_BIP32_DERIVATION_OUTPUT = Bip32DerivationInterface & {
  /**
   * The public key this path corresponds to
   * @type {string}
   */
  pubkey: string;
};

export type TYPE_SIGHASH_TYPES =
  | 'ALL'
  | 'NONE'
  | 'SINGLE'
  | 'ALL|ANYONECANPAY'
  | 'NONE|ANYONECANPAY'
  | 'SINGLE|ANYONECANPAY';

export type TYPE_SIGN_RAW_TRANSACTION_WITH_KEY =
  | SignRawTransactionWithKeyCompletedInterface
  | SignRawTransactionWithKeyErrorInterface;

export type TYPE_ADDRESS_TYPES = 'legacy' | 'p2sh-segwit' | 'bech32';
export type TYPE_ESTIMATE_MODE = 'unset' | 'economical' | 'conservative';
export type TYPE_ESTIMATE_MODE_UPPER = 'UNSET' | 'ECONOMICAL' | 'CONSERVATIVE';

export type TYPE_SCRIPT_TYPES =
  | 'nonstandard'
  | 'pubkey'
  | 'pubkeyhash'
  | 'scripthash'
  | 'multisig'
  | 'nulldata'
  | 'witness_v0_keyhash'
  | 'witness_v0_scripthash'
  | 'witness_unknown';

export type TYPE_UPGRADE_WALLET =
  | UpgradeWalletSuccessInterface
  | UpgradeWalletErrorInterface;

export type TYPE_MEMPOOL_DESCENDANT = MempoolAncestorsInterface;

type OverloadedArguments<T> = T extends {
  (...args: infer A1): any;
  (...args: infer A2): any;
  (...args: infer A3): any;
  (...args: infer A4): any;
  (...args: infer A5): any;
  (...args: infer A6): any;
  (...args: infer A7): any;
  (...args: infer A8): any;
}
  ? A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8
  : T extends {
      (...args: infer A1): any;
      (...args: infer A2): any;
      (...args: infer A3): any;
      (...args: infer A4): any;
      (...args: infer A5): any;
      (...args: infer A6): any;
      (...args: infer A7): any;
    }
  ? A1 | A2 | A3 | A4 | A5 | A6 | A7
  : T extends {
      (...args: infer A1): any;
      (...args: infer A2): any;
      (...args: infer A3): any;
      (...args: infer A4): any;
      (...args: infer A5): any;
      (...args: infer A6): any;
    }
  ? A1 | A2 | A3 | A4 | A5 | A6
  : T extends {
      (...args: infer A1): any;
      (...args: infer A2): any;
      (...args: infer A3): any;
      (...args: infer A4): any;
      (...args: infer A5): any;
    }
  ? A1 | A2 | A3 | A4 | A5
  : T extends {
      (...args: infer A1): any;
      (...args: infer A2): any;
      (...args: infer A3): any;
      (...args: infer A4): any;
    }
  ? A1 | A2 | A3 | A4
  : T extends {
      (...args: infer A1): any;
      (...args: infer A2): any;
      (...args: infer A3): any;
    }
  ? A1 | A2 | A3
  : T extends { (...args: infer A1): any; (...args: infer A2): any }
  ? A1 | A2
  : T extends (...args: infer A) => any
  ? A
  : any;

type ReplaceReturnType<TFn, TR> = TFn extends (...a: any) => any
  ? (...a: OverloadedArguments<TFn>) => TR
  : never;

export type BatchServiceType<C extends BaseServiceAbstract> = {
  [MethodName in keyof C]: ReplaceReturnType<C[MethodName], number>;
};
