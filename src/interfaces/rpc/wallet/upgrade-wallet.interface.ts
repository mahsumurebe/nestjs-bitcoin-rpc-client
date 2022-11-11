export interface UpgradeWalletSuccessInterface extends UpgradeWalletInterface {
  /**
   * Description of result, if no error
   *
   * @type {string}
   */
  result: string;
}

export interface UpgradeWalletErrorInterface extends UpgradeWalletInterface {
  /**
   * Error message (if there is one)
   *
   * @type {string}
   */
  error: string;
}

export interface UpgradeWalletInterface {
  /**
   * Name of wallet this operation was performed on
   *
   * @type {string}
   */
  wallet_name: string;
  /**
   * Version of wallet before this operation
   *
   * @type {number}
   */
  previous_version: number;
  /**
   * Version of wallet after this operation
   *
   * @type {number}
   */
  current_version: number;
}
