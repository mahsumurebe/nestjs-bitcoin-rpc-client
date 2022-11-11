import { BlockHeaderInterface } from './block-header.interface';

export interface BlockInterface<TxInterface = string>
  extends BlockHeaderInterface {
  /**
   * The block size
   *
   * @type {number}
   */
  size: number;
  /**
   * The block size excluding witness data
   *
   * @type {number}
   */
  strippedsize: number;
  /**
   * The block weight as defined in BIP 141
   *
   * @type {number}
   */
  weight: number;
  /**
   * The transaction ids or transactions data
   */
  tx: TxInterface[];
}
