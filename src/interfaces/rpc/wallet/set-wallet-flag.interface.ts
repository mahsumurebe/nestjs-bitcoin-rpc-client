export interface SetWalletFlagInterface {
  /**
   * The name of the flag that was modified
   *
   * @type {string}
   */
  flag_name: string;
  /**
   * The new state of the flag
   *
   * @type {boolean}
   */
  flag_state: boolean;
  /**
   * Any warnings associated with the change
   *
   * @type {string}
   */
  warnings: string;
}
