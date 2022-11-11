// noinspection JSUnusedGlobalSymbols

import { Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from '../abstracts';
import {
  EstimateSmartFeeInterface,
  GetDescriptorInfoInterface,
  GetIndexInfoInterface,
  MultiSigAddressInterface,
  ValidateAddressInterface,
} from '../interfaces';
import { TYPE_ADDRESS_TYPES, TYPE_ESTIMATE_MODE_UPPER } from '../types';

@Injectable()
/**
 * Raw Transactions RPC Service
 *
 * @author Mahsum UREBE <info@mahsumurebe.com>
 * @licence MIT
 * @link https://developer.bitcoin.org/reference/rpc/index.html#util-rpcs
 */
export class UtilRpcService extends BaseServiceAbstract {
  /**
   * Creates a multi-signature address with n signature of m keys required.
   *
   * It returns a json object with the address and redeemScript.
   * @param {number} nRequired The number of required signatures out of the n keys or addresses.
   * @param {string[]} keys The bitcoin addresses or hex-encoded public keys
   * @param {string} [addressType] The address type to use. Options are “legacy”, “p2sh-segwit”, and “bech32”.
   *
   * @link https://developer.bitcoin.org/reference/rpc/createmultisig.html
   * @return {Promise}
   */
  createMultiSig(
    nRequired: number,
    keys: string[],
    addressType: TYPE_ADDRESS_TYPES = 'legacy',
  ): Promise<MultiSigAddressInterface> {
    return this.call<MultiSigAddressInterface>('createmultisig', [
      nRequired,
      keys,
      addressType,
    ]);
  }

  /**
   * Derives one or more addresses corresponding to an output descriptor.
   *
   * Examples of output descriptors are:
   *
   * pkh(<pubkey>) P2PKH outputs for the given pubkey wpkh(<pubkey>) Native
   * segwit P2PKH outputs for the given pubkey sh(multi(<n>,<pubkey>,<pubkey>,…))
   * P2SH-multisig outputs for the given threshold and pubkeys raw(<hex script>)
   * Outputs whose scriptPubKey equals the specified hex scripts
   *
   * In the above, <pubkey> either refers to a fixed public key in hexadecimal
   * notation, or to a xpub/xprv optionally followed by one or more path elements
   * separated by “/”, where “h” represents a hardened child key.
   *
   * @param {string} description The descriptor
   * @param {number|number[]} range If a ranged descriptor is used, this specifies the end or the range (in [begin,end] notation) to derive.
   *
   * @link https://developer.bitcoin.org/reference/rpc/deriveaddresses.html
   * @return {Promise}
   */
  deriveAddresses(
    description: string,
    range: number | number[],
  ): Promise<string[]> {
    return this.call<string[]>('deriveaddresses', [description, range]);
  }

  /**
   * Estimates the approximate fee per kilobyte needed for a transaction to begin
   * confirmation within conf_target blocks if possible and return the number of
   * blocks for which the estimate is valid. Uses virtual transaction size as defined
   * in BIP 141 (witness data is discounted).
   *
   * @param {number} conf_target Confirmation target in blocks (1 - 1008)
   * @param {string} [estimate_mode=CONSERVATIVE] Whether to return a more conservative
   * estimate which also satisfies a longer history. A conservative estimate potentially
   * returns a higher feerate and is more likely to be sufficient for the desired target,
   * but is not as responsive to short term drops in the prevailing fee market. Must be one
   * of: “UNSET” “ECONOMICAL” “CONSERVATIVE”
   *
   * @link https://developer.bitcoin.org/reference/rpc/estimatesmartfee.html
   * @return {Promise}
   */
  estimateSmartFee(
    conf_target: number,
    estimate_mode: TYPE_ESTIMATE_MODE_UPPER = 'CONSERVATIVE',
  ): Promise<EstimateSmartFeeInterface> {
    return this.call<EstimateSmartFeeInterface>('estimatesmartfee', [
      conf_target,
      estimate_mode,
    ]);
  }

  /**
   * Analyses a descriptor.
   * @param {string} descriptor The descriptor.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getdescriptorinfo.html
   * @return {Promise}
   */
  getDescriptorInfo(descriptor: string): Promise<GetDescriptorInfoInterface> {
    return this.call<GetDescriptorInfoInterface>('getdescriptorinfo', [
      descriptor,
    ]);
  }

  /**
   * Returns the status of one or all available indices currently running in the node.
   * @param {string} [indexName] Filter results for an index with a specific name.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getindexinfo.html
   * @return {Promise}
   */
  getIndexInfo(
    indexName: string,
  ): Promise<Record<string, GetIndexInfoInterface>> {
    return this.call<Record<string, GetIndexInfoInterface>>('getindexinfo', [
      indexName,
    ]);
  }

  /**
   * Sign a message with the private key of an address
   * @type {string} privKey The private key to sign the message with.
   * @type {string} message The message to create a signature of.
   *
   * @link https://developer.bitcoin.org/reference/rpc/signmessagewithprivkey.html
   * @return {Promise} The signature of the message encoded in base 64
   */
  signMessageWithPrivKey(privKey: string, message: string): Promise<string> {
    return this.call<string>('signmessagewithprivkey', [privKey, message]);
  }

  /**
   * Return information about the given bitcoin address.
   * @param {string} address The bitcoin address to validate
   *
   * @link https://developer.bitcoin.org/reference/rpc/validateaddress.html
   * @return {Promise}
   */
  validateAddress(address: string): Promise<ValidateAddressInterface> {
    return this.call<ValidateAddressInterface>('validateaddress', [address]);
  }

  /**
   * Verify a signed message
   * @param {string} address The bitcoin address to use for the signature.
   * @param {string} signature The signature provided by the signer in base 64 encoding (see signmessage).
   * @param {string} message The message that was signed.
   *
   * @see signmessage
   * @link https://developer.bitcoin.org/reference/rpc/verifymessage.html
   * @return {Promise} If the signature is verified or not.
   */
  verifyMessage(
    address: string,
    signature: string,
    message: string,
  ): Promise<boolean> {
    return this.call<boolean>('verifymessage', [address, signature, message]);
  }
}
