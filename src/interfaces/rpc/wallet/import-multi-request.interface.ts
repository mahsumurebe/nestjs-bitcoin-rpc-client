export interface ImportMultiRequestInterface {
  /**
   * Descriptor to import. If using descriptor, do not also provide address/scriptPubKey, scripts, or pubkeys
   *
   * @type {string}
   */
  desc: string;
  /**
   * Type of scriptPubKey (string for script, json for address). Should not be provided if using a descriptor
   *
   * @type {string|object}
   */
  scriptPubKey: string | Record<string, string>;
  /**
   * Creation time of the key expressed in UNIX epoch time,
   * or the string "now" to substitute the current synced blockchain time. The timestamp of the oldest
   * key will determine how far back blockchain rescans need to begin for missing wallet transactions.
   * "now" can be specified to bypass scanning, for keys which are known to have never been used, and
   * 0 can be specified to scan the entire blockchain. Blocks up to 2 hours before the earliest key
   * creation time of all keys being imported by the importmulti call will be scanned.
   *
   * @type {number|string}
   */
  timestamp: number | 'now';
  /**
   * Allowed only if the scriptPubKey is a P2SH or P2SH-P2WSH address/scriptPubKey
   *
   * @type {string}
   */
  redeemscript: string;
  /**
   * Allowed only if the scriptPubKey is a P2SH-P2WSH or P2WSH address/scriptPubKey
   *
   * @type {string}
   */
  witnessscript: string;
  /**
   * Array of strings giving pubkeys to import. They must occur in P2PKH or P2WPKH scripts. They are not
   * required when the private key is also provided (see the "keys" argument).
   *
   * @default []
   * @type {string[]}
   */
  pubkeys: string[];
  /**
   * Array of strings giving private keys to import. The corresponding public keys must occur in the output
   * or redeemscript.
   *
   * @default []
   * @type {string[]}
   */
  keys: string[];
}
