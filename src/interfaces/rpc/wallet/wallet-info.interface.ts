/**
 * current scanning details, or false if no scan is in progress
 *
 * @type {object}
 */
export interface WalletInfoScanningInterface {
  /**
   * elapsed seconds since scan start
   *
   * @type {number}
   */
  duration: number;
  /**
   * scanning progress percentage [0.0, 1.0]
   *
   * @type {number}
   */
  progress: number;
}

/**
 * @interface
 */
export interface WalletInfoInterface {
  /**
   * the wallet name
   *
   * @type {string}
   */
  walletname: string;
  /**
   * the wallet version
   *
   * @type {number}
   */
  walletversion: number;
  /**
   * the database format (bdb or sqlite)
   *
   * @type {string}
   */
  format: string;
  /**
   * @deprecated Identical to getBalances().mine.trusted
   *
   * @see getBalances
   * @type {number}
   */
  balance: number;
  /**
   * @deprecated Identical to getBalances().mine.untrusted_pending
   *
   * @type {number}
   */
  unconfirmed_balance: number;
  /**
   * @deprecated. Identical to getBalances().mine.immature
   * @see getBalances
   * @type {number}
   */
  immature_balance: number;
  /**
   * the total number of transactions in the wallet
   *
   * @type {number}
   */
  txcount: number;
  /**
   * the UNIX epoch time of the oldest pre-generated key in the key pool. Legacy wallets only.
   *
   * @type {number}
   */
  keypoololdest: number;
  /**
   * how many new keys are pre-generated (only counts external keys)
   *
   * @type {number}
   */
  keypoolsize: number;
  /**
   * how many new keys are pre-generated for internal use (used for change outputs, only appears if the wallet is using this feature, otherwise external keys are used)
   */
  keypoolsize_hd_internal: number;
  /**
   * the UNIX epoch time until which the wallet is unlocked for transfers, or 0 if the wallet is locked (only present for passphrase-encrypted wallets)
   *
   * @type {number}
   */
  unlocked_until?: number;
  /**
   * the transaction fee configuration, set in BTC/kvB
   *
   * @type {number}
   */
  paytxfee: number;
  /**
   * the Hash160 of the HD seed (only present when HD is enabled)
   *
   * @type {string}
   */
  hdseedid?: string;
  /**
   * false if privatekeys are disabled for this wallet (enforced watch-only wallet)
   *
   * @type {boolean}
   */
  private_keys_enabled: boolean;
  /**
   * whether this wallet tracks clean/dirty coins in terms of reuse
   *
   * @type {boolean}
   */
  avoid_reuse: boolean;
  /**
   * current scanning details, or false if no scan is in progress
   *
   * @type {object}
   */
  scanning: WalletInfoScanningInterface;
  /**
   * whether this wallet uses descriptors for scriptPubKey management
   *
   * @type {boolean}
   */
  descriptors: boolean;
}
