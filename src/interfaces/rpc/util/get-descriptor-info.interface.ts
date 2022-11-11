export interface GetDescriptorInfoInterface {
  /**
   * The descriptor in canonical form, without private keys
   * @type {string}
   */
  descriptor: string;
  /**
   * The checksum for the input descriptor
   * @type {string}
   */
  checksum: string;
  /**
   * Whether the descriptor is ranged
   * @type {boolean}
   */
  isrange: boolean;
  /**
   * Whether the descriptor is solvable
   * @type {boolean}
   */
  issolvable: boolean;
  /**
   * Whether the input descriptor contained at least one private key
   * @type {boolean}
   */
  hasprivatekeys: boolean;
}
