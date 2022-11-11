export interface GetIndexInfoInterface {
  /**
   * Whether the index is synced or not
   *
   * @type {boolean}
   */
  synced: boolean;
  /**
   * The block height to which the index is synced
   *
   * @type {number}
   */
  best_block_height: number;
}
