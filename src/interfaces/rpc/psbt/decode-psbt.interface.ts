import {
  DecodedRawTransactionInterface,
  DecodePsbtInputInterface,
  DecodePsbtOutputInterface,
} from '../index';

export interface DecodePsbtInterface {
  /**
   * The decoded network-serialized unsigned transaction.
   *
   * @type {object}
   */
  tx: DecodedRawTransactionInterface;

  /**
   * The unknown global fields
   * (key-value pair) An unknown key-value pair
   *
   * @type {object}
   */
  unknown: Record<string, string>;

  inputs: DecodePsbtInputInterface[];

  outputs: DecodePsbtOutputInterface[];

  /**
   * The transaction fee paid if all UTXOs slots in the PSBT have been filled.
   *
   * @type{number}
   */
  fee?: number;
}
