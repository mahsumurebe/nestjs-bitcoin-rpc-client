export interface NetTotalsUploadTargetInterface {
  /**
   * Length of the measuring timeframe in seconds
   *
   * @type {number}
   */
  timeframe: number;
  /**
   * Target in bytes
   *
   * @type {number}
   */
  target: number;
  /**
   * True if target is reached
   *
   * @type {boolean}
   */
  target_reached: boolean;
  /**
   * True if serving historical blocks
   *
   * @type {boolean}
   */
  serve_historical_blocks: boolean;
  /**
   * Bytes left in current time cycle
   *
   * @type {number}
   */
  bytes_left_in_cycle: number;
  /**
   * Seconds left in current time cycle
   *
   * @type {number}
   */
  time_left_in_cycle: number;
}
