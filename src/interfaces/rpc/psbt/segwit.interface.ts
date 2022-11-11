export interface SegwitInterface {
  asm: string; /// String representation of the script public key
  hex: string; /// Hex string of the script public key
  type: string; /// The type of the script public key (e.g. witness_v0_keyhash or witness_v0_scripthash)
  /**
   * The required signatures (always 1)
   *
   * @type {number}
   */
  reqSigs: number;
  addresses: [
    /// (json array) (always length 1)
    string, /// segwit address
  ];
  'p2sh-segwit': string; /// address of the P2SH script wrapping this witness redeem script
}
