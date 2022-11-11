export interface WalletInterface {
  /**
   * The wallet name
   *
   * @type {string}
   */
  name: string;
}

export interface WalletDirInterface {
  wallets: WalletInterface[];
}
