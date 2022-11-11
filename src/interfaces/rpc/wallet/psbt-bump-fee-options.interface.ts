import { TYPE_ESTIMATE_MODE } from '../../../types';

export interface PsbtBumpFeeOptionsInterface {
  /**
   * Confirmation target in blocks
   *
   * @default set by -txconfirmtarget on daemon argument
   * @type {number}
   */
  conf_target?: number;

  /**
   * Specify a fee rate in sat/vB instead of relying on the built-in fee estimator.
   * Must be at least 1.000 sat/vB higher than the current transaction fee rate.
   * WARNING: before version 0.21, fee_rate was in BTC/kvB. As of 0.21, fee_rate is in sat/vB.
   *
   * @default not set, fall back to wallet fee estimation
   *
   * @type {number|string}
   */
  fee_rate?: number | string;

  /**
   * Whether the new transaction should still be
   * marked bip-125 replaceable. If true, the sequence numbers in the transaction will
   * be left unchanged from the original. If false, any input sequence numbers in the
   * original transaction that were less than 0xfffffffe will be increased to 0xfffffffe
   * so the new transaction will not be explicitly bip-125 replaceable (though it may
   * still be replaceable in practice, for example if it has unconfirmed ancestors which
   * are replaceable).
   *
   * @default true
   *
   * @type {boolean}
   */
  replaceable?: boolean;

  /**
   * The fee estimate mode, must be one of (case insensitive): "unset","economical","conservative"
   *
   * @default unset
   * @type {string}
   */
  estimate_mode?: TYPE_ESTIMATE_MODE;
}
