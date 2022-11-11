export interface GetBlockChainInfoSoftForksInterface {
  // (json object) name of the softfork
  type: 'buried' | 'bip9'; // (string) one of "buried", "bip9"
  bip9: {
    // (json object) status of bip9 softforks (only for "bip9" type)
    status: 'defined' | 'started' | 'locked_in' | 'active' | 'failed'; // (string) one of "defined", "started", "locked_in", "active", "failed"
    bit: number; // (numeric) the bit (0-28) in the block version field used to signal this softfork (only for "started" status)
    start_time: number; // (numeric) the minimum median time past of a block at which the bit gains its meaning
    timeout: number; // (numeric) the median time past of a block at which the deployment is considered failed if not yet locked in
    since: number; // (numeric) height of the first block to which the status applies
    statistics: {
      // (json object) numeric statistics about BIP9 signalling for a softfork (only for "started" status)
      period: number; // (numeric) the length in blocks of the BIP9 signalling period
      threshold: number; // (numeric) the number of blocks with the version bit set required to activate the feature
      elapsed: number; // (numeric) the number of blocks elapsed since the beginning of the current period
      count: number; // (numeric) the number of blocks with the version bit set in the current period
      possible: boolean; // (boolean) returns false if there are not enough blocks left in this period to pass activation threshold
    };
  };
  height: number; // (numeric) height of the first block which the rules are or will be enforced (only for "buried" type, or "bip9" type with "active" status)
  active: boolean; // (boolean) true if the rules are enforced for the mempool and the next block
}
