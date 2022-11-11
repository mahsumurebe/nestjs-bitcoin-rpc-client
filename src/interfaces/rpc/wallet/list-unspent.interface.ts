export interface ListUnspentInterface {
  /**
   * the transaction id
   *
   * @type {string}
   */
  txid: string;
  /**
   * the vout value
   *
   * @type {number}
   */
  vout: number;
  /**
   * the bitcoin address
   *
   * @type {string}
   */
  address: string;
  /**
   * The associated label, or "" for the default label
   *
   * @type {string}
   */
  label: string;
  /**
   * the script key
   *
   * @type {string}
   */
  scriptPubKey: string;
  /**
   * the transaction output amount in BTC
   *
   * @type {number}
   */
  amount: number;
  /**
   * The number of confirmations
   *
   * @type {number}
   */
  confirmations: number;
  /**
   * The redeemScript if scriptPubKey is P2SH
   *
   * @type {string}
   */
  redeemScript: string;
  /**
   * witnessScript if the scriptPubKey is P2WSH or P2SH-P2WSH
   *
   * @type {string}
   */
  witnessScript: string;
  /**
   * Whether we have the private keys to spend this output
   *
   * @type {boolean}
   */
  spendable: boolean;
  /**
   * Whether we know how to spend this output, ignoring the lack of keys
   *
   * @type {boolean}
   */
  solvable: boolean;
  /**
   * (only present if avoid_reuse is set) Whether this output is reused/dirty (sent to an address that was previously spent from)
   *
   * @type {boolean}
   */
  reused: boolean;
  /**
   * (only when solvable) A descriptor for spending this output
   *
   * @type {string}
   */
  desc: string;
  /**
   * // Whether this output is considered safe to spend. Unconfirmed transactions from outside keys and unconfirmed replacement transactions are considered unsafe and are not eligible for spending by fundrawtransaction  sendtoaddress.
   *
   * @type {boolean}
   */
  safe: boolean;
}
