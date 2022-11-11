import { SegwitInterface } from '../psbt';

export interface DecodeScriptInterface {
  /**
   * Script public key
   *
   * @type {string}
   */
  asm: string;
  /**
   * The output type
   *
   * @type {string}
   */
  type:
    | 'nonstandard'
    | 'pubkey'
    | 'pubkeyhash'
    | 'scripthash'
    | 'multisig'
    | 'nulldata'
    | 'witness_v0_scripthash'
    | 'witness_v0_keyhash'
    | 'witness_v1_taproot'
    | 'witness_unknown';
  /**
   * The required signatures
   *
   * @type {number}
   */
  reqSigs: number;
  /**
   * bitcoin address
   *
   * @type {string[]}
   */
  addresses: string[];
  /**
   * address of P2SH script wrapping this redeem script (not returned if the script is already a P2SH)
   *
   * @type {string}
   */
  p2sh: string;
  /**
   * Result of a witness script public key wrapping this redeem script (not returned if the script is a P2SH or witness)
   *
   * @type {object}
   */
  segwit: SegwitInterface;
}
