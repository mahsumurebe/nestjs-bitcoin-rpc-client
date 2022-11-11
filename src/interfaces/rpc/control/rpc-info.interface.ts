import { RpcInfoActiveCommandInterface } from '../index';

export interface RpcInfoInterface {
  /**
   * All active commands
   *
   * @type {RpcInfoActiveCommandInterface}
   */
  active_commands: RpcInfoActiveCommandInterface[];
  /**
   * The complete file path to the debug log
   *
   * @type {string}
   */
  logpath: string;
}
