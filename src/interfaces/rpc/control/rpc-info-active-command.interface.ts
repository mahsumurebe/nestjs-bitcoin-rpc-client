/**
 *  Information about an active command
 *
 *  @interface
 */
export interface RpcInfoActiveCommandInterface {
  /**
   * The name of the RPC command
   *
   * @type {string}
   */
  method: string;
  /**
   * The running time in microseconds
   *
   * @type {number}
   */
  duration: number;
}
