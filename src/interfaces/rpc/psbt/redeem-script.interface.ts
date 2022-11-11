export interface RedeemScriptInterface {
  /**
   * The asm
   *
   * @type {string}
   */
  asm: string;
  /**
   * The hex
   *
   * @type {string}
   */
  hex: string;
  /**
   * The type, eg 'pubkeyhash'
   *
   * @type {string}
   */
  type: string;
}
