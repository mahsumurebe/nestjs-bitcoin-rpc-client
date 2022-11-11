export interface ListWalletInterface {
  /**
   * The wallet name if loaded successfully.
   *
   * @type {string}
   */
  name: string;
  /**
   * Warning message if wallet was not loaded cleanly.
   *
   * @type {string}
   */
  warning: string;
}
