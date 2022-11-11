// noinspection JSUnusedGlobalSymbols

import { Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from '../abstracts';
import {
  AnalyzePSBTtInterface,
  DecodedRawTransactionInterface,
  DecodePsbtInterface,
  DecodeScriptInterface,
  FinalizedPsbtInterface,
  FundedRawTransactionInterface,
  FundRawTransactionOptionsInterface,
  SignRawTransactionPreviousTxInterface,
  TestMempoolAcceptInterface,
  UtxoUpdatePsbtDescriptorInterface,
} from '../interfaces';
import {
  TYPE_CREATE_PSBT_OUTPUT,
  TYPE_SIGHASH_TYPES,
  TYPE_SIGN_RAW_TRANSACTION_WITH_KEY,
} from '../types';

@Injectable()
/**
 * Raw Transactions RPC Service
 *
 * @author Mahsum UREBE <info@mahsumurebe.com>
 * @licence MIT
 * @link https://developer.bitcoin.org/reference/rpc/index.html#rawtransactions-rpcs
 */
export class RawTransactionsRpcService extends BaseServiceAbstract {
  /**
   * Analyzes and provides information about the current status of a
   * PSBT and its inputs
   * @param {string} psbt A base64 string of a PSBT
   *
   * @link https://developer.bitcoin.org/reference/rpc/analyzepsbt.html
   * @return {Promise}
   */
  analyzePSBT(psbt: string): Promise<AnalyzePSBTtInterface> {
    return this.call<AnalyzePSBTtInterface>('analyzepsbt', [psbt]);
  }

  /**
   * Combine multiple partially signed Bitcoin transactions into one
   * transaction.
   *
   * Implements the Combiner role.
   *
   * @param {string[]} txs The base64 strings of partially signed
   * transactions
   *
   * @link https://developer.bitcoin.org/reference/rpc/combinepsbt.html
   * @return {Promise} The base64-encoded partially signed transaction
   */
  combinePSBT(txs: string[]): Promise<string> {
    return this.call<string>('combinepsbt', [txs]);
  }

  /**
   * Combine multiple partially signed transactions into one
   * transaction.
   *
   * The combined transaction may be another partially signed
   * transaction
   * or a fully signed transaction.
   *
   * @param {string[]} txs The base64 strings of partially signed
   * transactions
   *
   * @link https://developer.bitcoin.org/reference/rpc/combinerawtransaction.html
   * @return {Promise} The hex-encoded raw transaction with
   * signature(s)
   */
  combineRawTransaction(txs: string[]): Promise<string> {
    return this.call<string>('combinerawtransaction', [txs]);
  }

  /**
   * Converts a network serialized transaction to a PSBT.
   * This should be used only with createrawtransaction
   * and fundrawtransaction createpsbt and
   * walletcreatefundedpsbt should be used for new applications.
   * @param {string} hexstring The hex string of a raw transaction
   * @param {boolean} [permitsigdata] If true, any signatures in
   * the input will be discarded and conversion
   * will continue. If false, RPC will fail if any signatures are
   * present.
   * @param {boolean} [iswitness] Whether the transaction hex is a
   * serialized witness transaction.
   * If iswitness is not present, heuristic tests will be used in
   * decoding. If true, only witness deserialization will be tried.
   * If false, only non-witness deserialization will be tried. This
   * boolean should reflect whether the transaction has inputs
   * (e.g. fully valid, or on-chain transactions), if known by the caller.
   *
   * @link https://developer.bitcoin.org/reference/rpc/converttopsbt.html
   * @return {Promise} The resulting raw transaction (base64-encoded string)
   */
  convertToPSBT(
    hexstring: string,
    permitsigdata = false,
    iswitness,
  ): Promise<string> {
    return this.call<string>('converttopsbt', [
      hexstring,
      permitsigdata,
      iswitness,
    ]);
  }

  /**
   * Creates a transaction in the Partially Signed Transaction format.
   *
   * Implements the Creator role.
   *
   * @param {array} inputs input array
   * @param {string} inputs[].txid The transaction id
   * @param {number} inputs[].vout The output number
   * @param {number} [inputs[].sequence] The sequence number
   * @param {TYPE_CREATE_PSBT_OUTPUT[]} outputs The outputs (key-value pairs),
   * where none of the keys are duplicated.
   * That is, each address can only appear once and there can only be one ‘data’
   * object. For compatibility reasons, a dictionary, which holds the key-value
   * pairs directly, is also accepted as second parameter.
   * @param {number} [locktime=0] Raw locktime. Non-0 value also locktime-activates inputs
   * @param {boolean} [replaceable=false] Marks this transaction as BIP125 replaceable.
   * Allows this transaction to be replaced by a transaction with higher fees. If provided,
   * it is an error if explicit sequence numbers are incompatible.
   *
   * @link https://developer.bitcoin.org/reference/rpc/createpsbt.html
   * @return {Promise} The resulting raw transaction (base64-encoded string)
   */
  createPSBT(
    inputs: object[],
    outputs: TYPE_CREATE_PSBT_OUTPUT[],
    locktime = 0,
    replaceable = false,
  ): Promise<string> {
    return this.call<string>('createpsbt', [
      inputs,
      outputs,
      locktime,
      replaceable,
    ]);
  }

  /**
   * Create a transaction spending the given inputs and creating new outputs.
   *
   * Outputs can be addresses or data.
   *
   * Returns hex-encoded raw transaction.
   *
   * Note that the transaction’s inputs are not signed, and it is not stored
   * in the wallet or transmitted to the network.
   *
   * @param {array} inputs input array
   * @param {string} inputs[].txid The transaction id
   * @param {number} inputs[].vout The output number
   * @param {number} [inputs[].sequence] The sequence number
   * @param {TYPE_CREATE_PSBT_OUTPUT[]} outputs The outputs (key-value pairs),
   * where none of the keys are duplicated.
   * That is, each address can only appear once and there can only be one ‘data’
   * object. For compatibility reasons, a dictionary, which holds the key-value
   * pairs directly, is also accepted as second parameter.
   * @param {number} [locktime=0] Raw locktime. Non-0 value also locktime-activates inputs
   * @param {boolean} [replaceable=false] Marks this transaction as BIP125 replaceable.
   * Allows this transaction to be replaced by a transaction with higher fees. If provided,
   * it is an error if explicit sequence numbers are incompatible.
   *
   * @link https://developer.bitcoin.org/reference/rpc/createrawtransaction.html
   * @return {Promise} hex string of the transaction
   */
  createRawTransaction(
    inputs: object[],
    outputs: TYPE_CREATE_PSBT_OUTPUT[],
    locktime = 0,
    replaceable = false,
  ): Promise<string> {
    return this.call<string>('createrawtransaction', [
      inputs,
      outputs,
      locktime,
      replaceable,
    ]);
  }

  /**
   * Decode PSBT
   * @param {string} psbt The PSBT base64 string
   *
   * @link https://developer.bitcoin.org/reference/rpc/decodepsbt.html
   * @return {Promise} Return a JSON object representing the serialized, base64-encoded
   * partially signed Bitcoin transaction.
   */
  decodePSBT(psbt: string): Promise<DecodePsbtInterface> {
    return this.call<DecodePsbtInterface>('decodepsbt', [psbt]);
  }

  /**
   * Decode Raw Transaction
   *
   * @param {string} hexString The transaction hex string
   * @param {boolean} [isWitness] Whether the transaction hex is a serialized
   * witness transaction. If isWitness is not present, heuristic tests will
   * be used in decoding. If true, only witness deserialization will be tried.
   * If false, only non-witness deserialization will be tried. This boolean
   * should reflect whether the transaction has inputs (e.g. fully valid,
   * or on-chain transactions), if known by the caller.
   *
   * @link https://developer.bitcoin.org/reference/rpc/decoderawtransaction.html
   * @return {Promise}
   */
  decodeRawTransaction(
    hexString: string,
    isWitness?: boolean,
  ): Promise<DecodedRawTransactionInterface> {
    return this.call<DecodedRawTransactionInterface>('decoderawtransaction', [
      hexString,
      isWitness,
    ]);
  }

  /**
   * Decode a hex-encoded script.
   * @param {string} hexString the hex-encoded script
   *
   * @link https://developer.bitcoin.org/reference/rpc/decodescript.html
   * @return {Promise}
   */
  decodeScript(hexString: string): Promise<DecodeScriptInterface> {
    return this.call<DecodeScriptInterface>('decodescript', [hexString]);
  }

  /**
   * finalizePSBT
   * @param {string} psbt A base64 string of a PSBT
   * @param {boolean} [extract=true] extract and return the complete transaction in
   * normal network serialization instead of the PSBT.
   *
   * @link https://developer.bitcoin.org/reference/rpc/finalizepsbt.html
   * @return {Promise}
   */
  finalizePSBT(psbt: string, extract = true): Promise<FinalizedPsbtInterface> {
    return this.call<FinalizedPsbtInterface>('finalizepsbt', [psbt, extract]);
  }

  /**
   * Fun dRaw Transaction
   * If the transaction has no inputs, they will be automatically selected to meet
   * its out value.
   *
   * It will add at most one change output to the outputs.
   *
   * No existing outputs will be modified unless “subtractFeeFromOutputs” is
   * specified.
   *
   * Note that inputs which were signed may need to be resigned after completion
   * since in/outputs have been added.
   *
   * The inputs added will not be signed, use signrawtransactionwithkey
   * or signrawtransactionwithwallet for that.
   *
   * Note that all existing inputs must have their previous output transaction be in
   * the wallet.
   *
   * Note that all inputs selected must be of standard form and P2SH scripts must be in
   * the wallet using importaddress or addmultisigaddress (to calculate fees).
   *
   * You can see whether this is the case by checking the “solvable” field in the listunspent output.
   *
   * Only pay-to-pubkey, multisig, and P2SH versions thereof are currently supported for watch-only
   * @param {string} hexString the hex-encoded script
   * @param {object} [options] for backward compatibility: passing in a true instead of an object
   * will result in {“includeWatching”:true}
   * “replaceable”: bool, (boolean, optional, default=wallet default) Marks this transaction as
   * BIP125 replaceable. Allows this transaction to be replaced by a transaction with higher fees
   * “conf_target”: n, (numeric, optional, default=wallet -txconfirmtarget) Confirmation target in
   * blocks “estimate_mode”: “str”, (string, optional, default=unset) The fee estimate mode, must
   * be one of : “unset” “economical” “conservative”
   * @param {boolean} [isWitness] If iswitness is not present, heuristic tests will be used in decoding.
   * If true, only witness deserialization will be tried. If false, only non-witness deserialization
   * will be tried. This boolean should reflect whether the transaction has inputs (e.g. fully valid,
   * or on-chain transactions), if known by the caller.
   *
   * @see signRawTransactionWithKey
   * @see signRawTransactionWithWallet
   * @see FundRawTransactionOptionsInterface
   *
   * @link https://developer.bitcoin.org/reference/rpc/fundrawtransaction.html
   * @return {Promise}
   */
  fundRawTransaction(
    hexString: string,
    options?: FundRawTransactionOptionsInterface,
    isWitness?: boolean,
  ): Promise<FundedRawTransactionInterface> {
    return this.call<FundedRawTransactionInterface>('fundrawtransaction', [
      hexString,
      options,
      isWitness,
    ]);
  }

  /**
   * Get the raw transaction data.
   *
   * Hint: Use gettransaction for wallet transactions.
   *
   * @param {string} txid The transaction id
   *
   * @link https://developer.bitcoin.org/reference/rpc/getrawtransaction.html
   * @return {Promise}
   */
  getRawTransaction(txid: string): Promise<string>;

  /**
   * Get the raw transaction data.
   *
   * Hint: Use gettransaction for wallet transactions.
   *
   * If verbose is ‘true’, returns an Object with information about ‘txid’.
   *
   * If verbose is ‘false’ or omitted, returns a string that is serialized, hex-encoded
   * data for ‘txid’.
   *
   * @param {string} txid The transaction id
   * @param {boolean} [verbose=true] If false, return a string, otherwise return a json object
   *
   * @link https://developer.bitcoin.org/reference/rpc/getrawtransaction.html
   * @return {Promise}
   */
  getRawTransaction(
    txid: string,
    verbose: true,
  ): Promise<DecodedRawTransactionInterface>;
  /**
   * Get the raw transaction data.
   *
   * Hint: Use gettransaction for wallet transactions.
   *
   * If verbose is ‘true’, returns an Object with information about ‘txid’.
   *
   * If verbose is ‘false’ or omitted, returns a string that is serialized, hex-encoded
   * data for ‘txid’.
   *
   * @param {string} txid The transaction id
   * @param {boolean} [verbose=true] If false, return a string, otherwise return a json object
   *
   * @link https://developer.bitcoin.org/reference/rpc/getrawtransaction.html
   * @return {Promise}
   */
  getRawTransaction(txid: string, verbose: false): Promise<string>;
  /**
   * Get the raw transaction data.
   *
   * Hint: Use gettransaction for wallet transactions.
   *
   * If verbose is ‘true’, returns an Object with information about ‘txid’.
   *
   * If verbose is ‘false’ or omitted, returns a string that is serialized, hex-encoded
   * data for ‘txid’.
   *
   * @param {string} txid The transaction id
   * @param {boolean} [verbose=true] If false, return a string, otherwise return a json object
   * @param {boolean} [blockHash] The block in which to look for the transaction
   *
   * @link https://developer.bitcoin.org/reference/rpc/getrawtransaction.html
   * @return {Promise}
   */
  getRawTransaction(
    txid: string,
    verbose?: boolean,
    blockHash?: string,
  ): Promise<DecodedRawTransactionInterface | string> {
    return this.call<DecodedRawTransactionInterface | string>(
      'getrawtransaction',
      [txid, verbose, blockHash],
    );
  }

  /**
   * Joins multiple distinct PSBTs with different inputs and outputs into one
   * PSBT with inputs and outputs from all the PSBTs No input in any of the
   * PSBTs can be in more than one of the PSBTs.
   *
   * @param {string[]} psbts The base64 strings of partially signed transactions
   *
   * @link https://developer.bitcoin.org/reference/rpc/joinpsbts.html
   * @return {Promise} The base64-encoded partially signed transaction
   */
  joinPSBTs(psbts: string[]): Promise<string> {
    return this.call<string>('joinpsbts', psbts);
  }

  /**
   * Submit a raw transaction (serialized, hex-encoded) to local node and network.
   *
   * Note that the transaction will be sent unconditionally to all peers, so using
   * this for manual rebroadcast may degrade privacy by leaking the transaction’s origin,
   * as nodes will normally not rebroadcast non-wallet transactions already in their mempool.
   *
   * Also see createrawtransaction and signrawtransactionwithkey calls.
   *
   * @param {string} hexString The hex string of the raw transaction
   * @param {number|string} [maxFeeRate=0.10] Reject transactions whose fee rate is higher than the specified
   * value, expressed in BTC/kB. Set to 0 to accept any fee rate.
   *
   * @see createrawtransaction
   * @see signrawtransactionwithkey
   *
   * @link https://developer.bitcoin.org/reference/rpc/sendrawtransaction.html
   * @return {Promise} The transaction hash in hex
   */
  sendRawTransaction(
    hexString: string,
    maxFeeRate: number | string = 0.1,
  ): Promise<string> {
    return this.call<string>('sendrawtransaction', [hexString, maxFeeRate]);
  }

  /**
   * signRawTransactionWithKey
   * @param {string} hexString The transaction hex string
   * @param {string[]} privateKeys The base58-encoded private keys for signing
   * @param {object} previousTXs The previous dependent transaction outputs
   * @param {string} signatureHashType The signature hash type. Must be one of:
   * “ALL” “NONE” “SINGLE” “ALL|ANYONECANPAY” “NONE|ANYONECANPAY” “SINGLE|ANYONECANPAY”
   *
   * @link https://developer.bitcoin.org/reference/rpc/signrawtransactionwithkey.html
   * @return {Promise}
   */
  signRawTransactionWithKey(
    hexString: string,
    privateKeys: string[],
    previousTXs: SignRawTransactionPreviousTxInterface,
    signatureHashType: TYPE_SIGHASH_TYPES = 'ALL',
  ): Promise<TYPE_SIGN_RAW_TRANSACTION_WITH_KEY> {
    return this.call<TYPE_SIGN_RAW_TRANSACTION_WITH_KEY>(
      'signrawtransactionwithkey',
      [hexString, privateKeys, previousTXs, signatureHashType],
    );
  }

  /**
   * Returns result of mempool acceptance tests indicating if raw transaction
   * (serialized, hex-encoded) would be accepted by mempool.
   *
   * This checks if the transaction violates the consensus or policy rules.
   * @param {string[]} rawTXs An array of hex strings of raw transactions.
   * Length must be one for now.
   * @param {number|string} [maxFeeRate=0.10] Reject transactions whose fee rate is higher than the specified
   * value, expressed in BTC/kB. Set to 0 to accept any fee rate.
   *
   * @see sendRawTransaction.
   *
   * @link https://developer.bitcoin.org/reference/rpc/testmempoolaccept.html
   * @return {Promise}
   */
  testMempoolAccept(
    rawTXs: string[],
    maxFeeRate: number | string = 0.1,
  ): Promise<TestMempoolAcceptInterface> {
    return this.call<TestMempoolAcceptInterface>('testmempoolaccept', [
      rawTXs,
      maxFeeRate,
    ]);
  }

  /**
   * Updates all segwit inputs and outputs in a PSBT with data from output
   * descriptors, the UTXO set or the mempool.
   * @param {string} psbt A base64 string of a PSBT
   * @param {string|object} [descriptors] An array of either strings or objects
   *
   * @link https://developer.bitcoin.org/reference/rpc/utxoupdatepsbt.html
   * @return {Promise} The base64-encoded partially signed transaction with
   * inputs updated
   */
  utxoUpdatePSBT(
    psbt: string,
    descriptors?: (string | UtxoUpdatePsbtDescriptorInterface)[],
  ): Promise<string> {
    return this.call<string>('utxoupdatepsbt', [psbt, descriptors]);
  }
}
