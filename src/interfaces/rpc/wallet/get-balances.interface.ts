export interface GetBalancesMineInterface {
  /**
   * trusted balance (outputs created by the wallet or confirmed outputs)
   *
   * @type {number}
   */
  trusted: number;
  /**
   * untrusted pending balance (outputs created by others that are in the mempool)
   *
   * @type {number}
   */
  untrusted_pending: number;
  /**
   * balance from immature coinbase outputs
   *
   * @type {number}
   */
  immature: number;
  /**
   * (only present if avoid_reuse is set) balance from coins sent to addresses that were previously spent from (potentially privacy violating)
   *
   * @type {number}
   */
  used: number;
}

export interface GetBalancesWatchOnlyInterface {
  /**
   * trusted balance (outputs created by the wallet or confirmed outputs)
   *
   * @type {number}
   */
  trusted: number;
  /**
   * untrusted pending balance (outputs created by others that are in the mempool)
   *
   * @type {number}
   */
  untrusted_pending: number;
  /**
   * balance from immature coinbase outputs
   *
   * @type {number}
   */
  immature: number;
}

export interface GetBalancesInterface {
  /**
   * balances from outputs that the wallet can sign
   *
   * @type {object}
   */
  mine: GetBalancesMineInterface;
  /**
   * watchonly balances (not present if wallet does not watch anything)
   *
   * @type {object}
   */
  watchonly: GetBalancesWatchOnlyInterface;
}
