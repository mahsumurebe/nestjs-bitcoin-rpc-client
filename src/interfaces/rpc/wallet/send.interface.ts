import { WalletProcessPsbtInterface } from './wallet-process-psbt.interface';

export interface SendInterface extends WalletProcessPsbtInterface {
  /**
   * The transaction id for the send. Only 1 transaction is created regardless of the number of addresses.
   *
   * @type {string}
   */
  txid: string;
  /**
   * If add_to_wallet is false, the hex-encoded raw transaction with signature(s)
   *
   * @type {string}
   */
  hex: string;
}
