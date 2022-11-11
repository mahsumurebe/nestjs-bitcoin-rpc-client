export interface ImportDescriptorsOptionsInterface {
  /**
   * Descriptor to import.
   * @type {string}
   */
  desc: string;
  /**
   * Set this descriptor to be the active descriptor for the corresponding output type/externality
   *
   * @default false
   * @type {boolean}
   */
  active?: boolean;
  /**
   * If a ranged descriptor is used, this specifies the end or the range (in the form [begin,end]) to import
   *
   * @type {number|number[]}
   */
  range: number | number[];
  /**
   * If a ranged descriptor is set to active, this specifies the next index to generate addresses from
   *
   * @type {number}
   */
  next_index: number;
  /**
   * Time from which to start rescanning the blockchain for this descriptor, in UNIX epoch time Use the string
   * "now" to substitute the current synced blockchain time. "now" can be specified to bypass scanning, for
   * outputs which are known to never have been used, and 0 can be specified to scan the entire blockchain.
   * Blocks up to 2 hours before the earliest timestamp of all descriptors being imported will be scanned.
   *
   * @type {number|string}
   */
  timestamp: number | 'now';
  /**
   * Whether matching outputs should be treated as not incoming payments (e.g. change)
   *
   * @default false
   * @type {boolean}
   */
  internal?: boolean;
  /**
   * Label to assign to the address, only allowed with internal=false
   *
   * @default ''
   * @type {string}
   */
  label: string;
}
