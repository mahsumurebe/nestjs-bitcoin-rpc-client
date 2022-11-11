import { ScriptSigInterface } from '../index';

export interface WitnessScriptInterface extends ScriptSigInterface {
  /**
   * The type, eg 'pubkeyhash'
   *
   * @type {string}
   */
  type: string;
}
