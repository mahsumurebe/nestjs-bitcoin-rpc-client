export interface RescanBlockchainInterface {
  /**
   * The block height where the rescan started (the requested height or 0)
   *
   * @type {number}
   */
  start_height: number;
  /**
   * The height of the last rescanned block. May be null in rare cases if
   * there was a reorg and the call didn't scan any blocks because they were
   * already scanned in the background.
   *
   * @type {number}
   */
  stop_height: number;
}
