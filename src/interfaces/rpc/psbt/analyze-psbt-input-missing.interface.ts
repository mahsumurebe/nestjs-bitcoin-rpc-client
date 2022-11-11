export interface AnalyzePSBTInputMissingInterface {
  // Things that are missing that are required to complete this input
  pubkeys: string[]; // Public key ID, hash160 of the public key, of a public key whose BIP 32 derivation path is missing
  signatures: string[]; // (string) Public key ID, hash160 of the public key, of a public key whose signature is missing
  redeemscript: string; // Hash160 of the redeemScript that is missing
  witnessscript: string; // SHA256 of the witnessScript that is missing
}
