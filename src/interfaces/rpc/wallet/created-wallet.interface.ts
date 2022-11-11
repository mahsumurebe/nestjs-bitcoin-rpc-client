export interface CreatedWalletInterface {
  /**
   * The wallet name if created successfully. If the wallet was created using a full path, the wallet_name will be the full path.
   *
   * @type {string}
   */
  name: string;
  /**
   * Warning message if wallet was not loaded cleanly.
   *
   * @type {string}
   */
  warning?: string;
}
