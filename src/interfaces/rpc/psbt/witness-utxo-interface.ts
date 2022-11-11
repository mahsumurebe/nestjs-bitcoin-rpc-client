import { ScriptPubKeyInterface } from './index';

export interface WitnessUtxoInterface {
  /**
   * The value in BTC
   *
   * @type {number}
   */
  amount: number;
  /**
   * Script Public Key
   */
  scriptPubKey: ScriptPubKeyInterface;
}
