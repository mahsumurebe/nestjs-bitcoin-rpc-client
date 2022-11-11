import { RedeemScriptInterface, WitnessScriptInterface } from './index';
import { TYPE_BIP32_DERIVATION_OUTPUT } from '../../../types';

export interface DecodePsbtOutputInterface {
  redeem_script: RedeemScriptInterface;
  witness_script: WitnessScriptInterface;
  bip32_derivs: TYPE_BIP32_DERIVATION_OUTPUT[];
  /**
   * The unknown global fields
   * (key-value pair) An unknown key-value pair
   *
   * @type {object}
   */
  unknown: Record<string, string>;
}
