export type ChainTipStatus =
  | 'invalid' // This branch contains at least one invalid block
  | 'headers-only' // Not all blocks for this branch are available, but the headers are valid
  | 'valid-headers' // All blocks are available for this branch, but they were never fully validated
  | 'valid-fork' // This branch is not part of the active chain, but is fully validated
  | 'active'; // This is the tip of the active main chain, which is certainly valid

export interface ChainTipInterface {
  /**
   * height of the chain tip
   * @return {number}
   */
  height: number;
  /**
   * block hash of the tip
   * @return {string}
   */
  hash: string;
  /**
   * zero for main chain, otherwise length of branch connecting the tip to the main chain
   * @return {number}
   */
  branchlen: number;
  /**
   * status of the chain, "active" for the main chain
   * @return {string}
   * 1.  "invalid"               This branch contains at least one invalid block
   * 2.  "headers-only"          Not all blocks for this branch are available, but the headers are valid
   * 3.  "valid-headers"         All blocks are available for this branch, but they were never fully validated
   * 4.  "valid-fork"            This branch is not part of the active chain, but is fully validated
   * 5.  "active"                This is the tip of the active main chain, which is certainly valid
   */
  status: ChainTipStatus;
}
