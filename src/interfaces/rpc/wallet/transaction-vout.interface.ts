export interface TransactionVOutInterface {
  // (json object)
  value: number; // (numeric) The value in BTC
  n: number; // (numeric) index
  scriptPubKey: {
    // (json object)
    asm: string; // (string) the asm
    hex: string; // (string) the hex
    reqSigs: number; // (numeric) The required sigs
    type: string; // (string) The type, eg 'pubkeyhash'
    addresses?: string[]; // (string) bitcoin address
  };
}
