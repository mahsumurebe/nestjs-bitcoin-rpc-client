export interface TransactionVInInterface {
  // (json object)
  txid: string; // (string) The transaction id
  vout: number; // (numeric) The output number
  scriptSig: {
    // (json object) The script
    asm: string; // (string) asm
    hex: string; // (string) hex
  };
  sequence: number; // (numeric) The script sequence number
  txinwitness: string[]; // (string array) hex-encoded witness data (if any)
}
