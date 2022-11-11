import { BlockTemplateTransactionInterface } from './block-template-transaction.interface';

export interface BlockTemplateInterface {
  version: number; // The preferred block version
  /**
   *  specific block rules that are to be enforced name of a rule the client must understand to some extent; see BIP 9 for format
   *
   * @type {string[]}
   */
  rules: string[];
  /**
   * set of pending, supported versionbit (BIP 9) softfork deployments
   *
   * @type {object}
   */
  vbavailable: {
    /**
     * identifies the bit number as indicating acceptance and readiness for the named softfork rule
     *
     * @type {number}
     */
    [rulename: string]: number;
  };
  /**
   * bit mask of versionbits the server requires set in submissions
   *
   * @type {number}
   */
  vbrequired: number;
  /**
   * The hash of current highest block
   * @type {string}
   */
  previousblockhash: string;
  /**
   * contents of non-coinbase transactions that should be included in the next block;
   *
   * @type {BlockTemplateTransactionInterface[]}
   */
  transactions: BlockTemplateTransactionInterface[];
  /**
   * data that should be included in the coinbase's scriptSig content
   *
   * @type {object}
   */
  coinbaseaux: {
    /**
     * values must be in the coinbase (keys may be ignored)
     * @type {string}
     */
    [key: string]: string;
  };
  /**
   * maximum allowable input to coinbase transaction, including the generation award and transaction fees (in satoshis)
   *
   * @type {number}
   */
  coinbasevalue: number;
  /**
   * an id to include with a request to longpoll on an update to this template
   * @type {string}
   */
  longpollid: string;
  /**
   * The hash target
   * @type {string}
   */
  target: string;
  mintime: number; // The minimum timestamp appropriate for the next block time, expressed in UNIX epoch time
  /**
   * list of ways the block template may be changed
   *
   * A way the block template may be changed, e.g. 'time', 'transactions', 'prevblock'
   *
   * @type {string}
   */
  mutable: string[];
  /**
   * A range of valid nonces
   * @type {string}
   */
  noncerange: string;
  /**
   * limit of sigops in blocks
   *
   * @type {number}
   */
  sigoplimit: number;
  /**
   * limit of block size
   *
   * @type {number}
   */
  sizelimit: number;
  /**
   * limit of block weight
   *
   * @type {number}
   */
  weightlimit: number;
  /**
   * current timestamp in UNIX epoch time
   *
   * @type {number}
   */
  curtime: number;
  /**
   * compressed target of next block
   * @type {string}
   */
  bits: string;
  /**
   * The height of the next block
   *
   * @type {number}
   */
  height: number;
  /**
   * a valid witness commitment for the unmodified block template
   *
   * @type {string|undefined}
   */
  default_witness_commitment?: string;
}
