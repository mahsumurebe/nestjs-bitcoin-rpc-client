/**
 * An object with an output descriptor and extra information
 */
export interface UtxoUpdatePsbtDescriptorInterface {
  /**
   * An output descriptor
   *
   * @type {string}
   */
  desc: string;
  /**
   * Up to what index HD chains should be explored (either end or [begin,end])
   *
   * @default 1000
   * @type {number|number[]}
   */
  range?: number | number[];
}
