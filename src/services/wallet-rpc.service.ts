// noinspection JSUnusedGlobalSymbols

import { Injectable } from '@nestjs/common';
import {
  AddressInfoInterface,
  BumpFeeInterface,
  BumpFeeOptionsInterface,
  CreatedWalletInterface,
  GetBalancesInterface,
  ImportDescriptorInterface,
  ImportDescriptorsOptionsInterface,
  ImportMultiRequestInterface,
  ListReceivedByAddressInterface,
  ListReceivedByLabelInterface,
  ListSinceBlockInterface,
  ListSinceBlockTransactionInterface,
  ListUnspendQueryOptionsInterface,
  ListUnspentInterface,
  ListWalletInterface,
  LockUnspendInterface,
  LockUnspendTransactionInterface,
  MultiSigAddressInterface,
  PrevTxInterface,
  PsbtBumpFeeInterface,
  PsbtBumpFeeOptionsInterface,
  RescanBlockchainInterface,
  SendInterface,
  SendOptionsInterface,
  SendToAddressInterface,
  SetWalletFlagInterface,
  SignRawTransactionWithWalletInterface,
  TransactionInterface,
  WalletCreateFundedPsbtInputInterface,
  WalletCreateFundedPsbtInterface,
  WalletCreateFundedPsbtOptionsInterface,
  WalletDirInterface,
  WalletInfoInterface,
  WalletProcessPsbtInterface,
} from '../interfaces';
import {
  TYPE_ADDRESS_TYPES,
  TYPE_ESTIMATE_MODE,
  TYPE_SIGHASH_TYPES,
  TYPE_TRANSACTION,
  TYPE_TRANSACTION_WITH_DETAILS,
  TYPE_TRANSACTION_WITH_INCLUDE_VERBOSE,
  TYPE_TRANSACTION_WITH_INCLUDE_WATCH,
  TYPE_UPGRADE_WALLET,
} from '../types';
import { BaseServiceAbstract } from '../abstracts';

@Injectable()
/**
 * Wallet RPC Service
 *
 * @author Mahsum UREBE <info@mahsumurebe.com>
 * @licence MIT
 * @link https://developer.bitcoin.org/reference/rpc/index.html#wallet-rpcs
 */
export class WalletRpcService extends BaseServiceAbstract {
  /**
   * Mark in-wallet transaction <txid> as abandoned This will mark this transaction
   * and all its in-wallet descendants as abandoned which will allow for their inputs
   * to be respent. It can be used to replace “stuck” or evicted transactions.
   *
   * It only works on transactions which are not included in a block and are not
   * currently in the mempool.
   *
   * It has no effect on transactions which are already abandoned.
   * @param {string} txid The transaction id
   *
   * @link https://developer.bitcoin.org/reference/rpc/abandontransaction.html
   * @return {Promise}
   */
  abandonTransaction(txid: string): Promise<null> {
    return this.call<null>('abandontransaction', [txid]);
  }

  /**
   * Stops current wallet rescan triggered by an RPC call, e.g. by an importprivkey
   * call.
   *
   * Note: Use “getwalletinfo” to query the scanning progress.
   * @see getwalletinfo
   * @link https://developer.bitcoin.org/reference/rpc/abortrescan.html
   * @return {Promise} Whether the abort was successful
   */
  abortRescan(): Promise<boolean> {
    return this.call<boolean>('abortrescan');
  }

  /**
   * Add a nrequired-to-sign multisignature address to the wallet. Requires a new
   * wallet backup.
   *
   * Each key is a Bitcoin address or hex-encoded public key.
   *
   * This functionality is only intended for use with non-watchonly addresses.
   *
   * See importaddress for watchonly p2sh address support.
   *
   * If ‘label’ is specified, assign address to that label.
   *
   * @param {number} nRequired The number of required signatures out of the n keys or
   * addresses.
   * @param {string[]} keys The bitcoin addresses or hex-encoded public keys
   * @param {string} [label] A label to assign the addresses to.
   * @param {string} [addressType] The address type to use. Options are “legacy”,
   * “p2sh-segwit”, and “bech32”.
   *
   * @link https://developer.bitcoin.org/reference/rpc/addmultisigaddress.html
   * @return {Promise}
   */
  addMultiSigAddress(
    nRequired: number,
    keys: string[],
    label?: string,
    addressType: TYPE_ADDRESS_TYPES = 'legacy',
  ): Promise<MultiSigAddressInterface> {
    return this.call<MultiSigAddressInterface>('addmultisigaddress', [
      nRequired,
      keys,
      label,
      addressType,
    ]);
  }

  /**
   * Safely copies current wallet file to destination, which can be a directory or a
   * path
   * with filename.
   * @param {string} destination The destination directory or file
   *
   * @link https://developer.bitcoin.org/reference/rpc/backupwallet.html
   * @return {Promise}
   */
  backupWallet(destination: string): Promise<null> {
    return this.call<null>('backupwallet', [destination]);
  }

  /**
   * Bumps the fee of an opt-in-RBF transaction T, replacing it with a new transaction
   * B.
   *
   * An opt-in RBF transaction with the given txid must be in the wallet.
   *
   * The command will pay the additional fee by reducing change outputs or adding inputs
   * when necessary.
   *
   * It may add a new change output if one does not already exist.
   *
   * All inputs in the original transaction will be included in the replacement transaction.
   *
   * The command will fail if the wallet or mempool contains a transaction that spends one
   * of T’s outputs.
   *
   * By default, the new fee will be calculated automatically using the estimatesmartfee
   * RPC.
   *
   * The user can specify a confirmation target for estimatesmartfee.
   *
   * Alternatively, the user can specify a fee rate in sat/vB for the new transaction.
   *
   * At a minimum, the new fee rate must be high enough to pay an additional new relay fee
   * (incrementalfee returned by getnetworkinfo) to enter the node’s mempool.
   *
   * * WARNING: before version 0.21, fee_rate was in BTC/kvB. As of 0.21, fee_rate is in
   * sat/vB. *
   * @param {string} txid The txid to be bumped
   * @param {object} [options] Options
   *
   * @link https://developer.bitcoin.org/reference/rpc/bumpfee.html
   * @return {Promise}
   */
  bumpFee(
    txid: string,
    options?: BumpFeeOptionsInterface,
  ): Promise<BumpFeeInterface> {
    return this.call<BumpFeeInterface>('bumpfee', [txid, options]);
  }

  /**
   * Creates and loads a new wallet.
   * @param {string} walletName The name for the new wallet. If this is a path,
   * the wallet will be created at the path location.
   * @param {boolean} [disablePrivateKeys] Disable the chance of private
   * keys (only watchonlys are possible in this mode).
   * @param {boolean} [blank] Create a blank wallet. A blank wallet has no keys
   * or HD seed. One can be set using sethdseed.
   * @param {string} [passphrase] Encrypt the wallet with this passphrase.
   * @param {boolean} [avoidReuse] Keep track of coin reuse, and treat dirty and
   * clean coins differently with privacy considerations in mind.
   * @param {boolean} [descriptors] Create a native descriptor wallet. The wallet
   * will use descriptors internally to handle address creation
   * @param {boolean} [loadOnStartup] Save wallet name to persistent settings and
   * load on startup. True to add wallet to startup list, false to remove, null to
   * leave unchanged.
   *
   * @link https://developer.bitcoin.org/reference/rpc/createwallet.html
   * @return {Promise}
   */
  createWallet(
    walletName: string,
    disablePrivateKeys?: boolean,
    blank?: boolean,
    passphrase?: string,
    avoidReuse?: boolean,
    descriptors?: boolean,
    loadOnStartup?: boolean,
  ): Promise<CreatedWalletInterface> {
    return this.call<CreatedWalletInterface>('createwallet', [
      walletName,
      disablePrivateKeys,
      blank,
      passphrase,
      avoidReuse,
      descriptors,
      loadOnStartup,
    ]);
  }

  /**
   * Reveals the private key corresponding to ‘address’.
   *
   * Then the importprivkey can be used with this output
   *
   * @param {string} address The bitcoin address for the private key
   *
   * @link https://developer.bitcoin.org/reference/rpc/dumpprivkey.html
   * @return {Promise} The private key
   */
  dumpPrivKey(address: string): Promise<string> {
    return this.call<string>('dumpprivkey', [address]);
  }

  /**
   * Dumps all wallet keys in a human-readable format to a server-side file.
   * This does not allow overwriting existing files.
   *
   * Imported scripts are included in the dumpfile, but corresponding BIP173
   * addresses, etc. may not be added automatically by importwallet.
   *
   * Note that if your wallet contains keys which are not derived from your
   * HD seed (e.g. imported keys), these are not covered by only backing up
   * the seed itself, and must be backed up too (e.g. ensure you back up the
   * whole dumpfile).
   * @param {string} filename The filename with path (absolute path recommended)
   *
   * @link https://developer.bitcoin.org/reference/rpc/dumpwallet.html
   * @return {Promise} Objecg with filename item with full absolute path
   */
  dumpWallet(filename: string): Promise<{ filename: string }> {
    return this.call<{ filename: string }>('dumpwallet', [filename]);
  }

  /**
   * Encrypts the wallet with ‘passphrase’. This is for first time encryption.
   *
   * After this, any calls that interact with private keys such as sending or
   * signing will require the passphrase to be set prior the making these calls.
   *
   * Use the walletpassphrase call for this, and then walletlock call.
   *
   * If the wallet is already encrypted, use the walletpassphrasechange call.
   * @param {string} passphrase The pass phrase to encrypt the wallet with.
   * It must be at least 1 character, but should be long.
   *
   * @link https://developer.bitcoin.org/reference/rpc/encryptwallet.html
   * @return {Promise} A string with further instructions
   */
  encryptWallet(passphrase: string): Promise<string> {
    return this.call<string>('encryptwallet', [passphrase]);
  }

  /**
   * Returns the list of addresses assigned the specified label.
   * @param {string} label The label.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getaddressesbylabel.html
   * @return {Promise}
   */
  getAddressesByLabel(
    label: string,
  ): Promise<Record<string, { purpose: 'receive' | 'send' }>> {
    return this.call<Record<string, { purpose: 'receive' | 'send' }>>(
      'getaddressesbylabel',
      [label],
    );
  }

  /**
   * Return information about the given bitcoin address.
   *
   * Some information will only be present if the address is in the active
   * wallet.
   * @param {string} address The bitcoin address for which to get information.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getaddressinfo.html
   * @return {Promise}
   */
  getAddressInfo(address: string): Promise<AddressInfoInterface> {
    return this.call<AddressInfoInterface>('getaddressinfo', [address]);
  }

  /**
   * Returns the total available balance.
   *
   * The available balance is what the wallet considers currently spendable,
   * and is thus affected by options which limit spendability such as -spendzeroconfchange.
   * @param {string} dummy Remains for backward compatibility. Must be excluded or set to “*”.
   * @param {number} [minConf=0] Only include transactions confirmed at least this many times.
   * @param {boolean} [includeWatchOnly=true] Also include balance in watch-only addresses
   * (see ‘importaddress’)
   * @param {boolean} [avoidReuse=true] (only available if avoid_reuse wallet flag is set)
   * Do not include balance in dirty outputs; addresses are considered dirty if they have
   * previously been used in a transaction.
   *
   * @see importaddress
   *
   * @link https://developer.bitcoin.org/reference/rpc/getbalance.html
   * @return {Promise} The total amount in BTC received for this wallet.
   */
  getBalance(
    dummy = '*',
    minConf = 0,
    includeWatchOnly = true,
    avoidReuse = true,
  ): Promise<number> {
    return this.call<number>('getbalance', [
      dummy,
      minConf,
      includeWatchOnly,
      avoidReuse,
    ]);
  }

  /**
   * Returns an object with all balances in BTC.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getbalances.html
   * @return {Promise}
   */
  getBalances(): Promise<GetBalancesInterface> {
    return this.call<GetBalancesInterface>('getbalances');
  }

  /**
   * Returns a new Bitcoin address for receiving payments.
   *
   * If ‘label’ is specified, it is added to the address book so payments received
   * with the address will be associated with ‘label’.
   *
   * @param {string} [label=""] The label name for the address to be linked to. It
   * can also be set to the empty string “” to represent the default label. The label
   * does not  need to exist, it will be created if there is no label by the given name.
   * @param {string} [addressType] The address type to use. Options are “legacy”,
   * “p2sh-segwit”, and “bech32”.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getnewaddress.html
   * @return {Promise} The new bitcoin address
   */
  getNewAddress(label = '', addressType?: TYPE_ADDRESS_TYPES): Promise<string> {
    return this.call<string>('getnewaddress', [label, addressType]);
  }

  /**
   * Returns a new Bitcoin address, for receiving change.
   *
   * This is for use with raw transactions, NOT normal use.
   *
   * @param {string} [addressType] The address type to use. Options are “legacy”,
   * “p2sh-segwit”, and “bech32”.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getrawchangeaddress.html
   * @return {Promise} The address
   */
  getRawChangeAddress(addressType?: TYPE_ADDRESS_TYPES): Promise<string> {
    return this.call<string>('getrawchangeaddress', [addressType]);
  }

  /**
   * Returns the total amount received by the given address in transactions with at
   * least minconf confirmations.
   *
   * @param {string} address The bitcoin address for transactions.
   * @param {string} [minconf=1] Only include transactions confirmed at least this many
   * times.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getreceivedbyaddress.html
   * @return {Promise} The total amount in BTC received at this address.
   */
  getReceivedByAddress(address: string, minconf = 1): Promise<number> {
    return this.call<number>('getreceivedbyaddress', [address, minconf]);
  }

  /**
   * Returns the total amount received by addresses with <label> in transactions with
   * at least [minconf] confirmations.
   * @param {string} label The selected label, may be the default label using “”.
   * @param {number} minconf Only include transactions confirmed at least this many times.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getreceivedbylabel.html
   * @return {Promise} The total amount in BTC received for this label.
   */
  getReceivedByLabel(label = '', minconf = 1): Promise<number> {
    return this.call<number>('getreceivedbylabel', [label, minconf]);
  }

  /**
   * Get Wallet Transaction Data
   *
   * @param {string} txid The transaction id
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettransaction.html
   * @return {Promise} Get detailed information about in-wallet transaction <txid>
   */
  getTransaction(txid: string): Promise<TransactionInterface>;
  /**
   * Get Wallet Transaction Data
   *
   * @param {string} txid The transaction id
   * @param {boolean} [includeWatchOnly=false] Include Watch Only
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettransaction.html
   * @return {Promise} Get detailed information about in-wallet transaction <txid>
   */
  getTransaction(
    txid: string,
    includeWatchOnly: false,
  ): Promise<TransactionInterface>;
  /**
   * Get Wallet Transaction Data
   *
   * @param {string} txid The transaction id
   * @param {boolean} [includeWatchOnly=false] Include Watch Only
   * @param {boolean} [verbose=false] Include Watch Only
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettransaction.html
   * @return {Promise} Get detailed information about in-wallet transaction <txid>
   */
  getTransaction(
    txid: string,
    includeWatchOnly: false,
    verbose: false,
  ): Promise<TransactionInterface>;
  /**
   * Get Wallet Transaction Data
   *
   * @param {string} txid The transaction id
   * @param {boolean} [includeWatchOnly=true] Include Watch Only
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettransaction.html
   * @return {Promise} Get detailed information about in-wallet transaction <txid>
   */
  getTransaction(
    txid: string,
    includeWatchOnly: true,
  ): Promise<TYPE_TRANSACTION_WITH_INCLUDE_WATCH>;
  /**
   * Get Wallet Transaction Data
   *
   * @param {string} txid The transaction id
   * @param {boolean} [includeWatchOnly=true] Include Watch Only
   * @param {boolean} [verbose=false] Include Watch Only
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettransaction.html
   * @return {Promise} Get detailed information about in-wallet transaction <txid>
   */
  getTransaction(
    txid: string,
    includeWatchOnly: true,
    verbose: false,
  ): Promise<TYPE_TRANSACTION_WITH_INCLUDE_WATCH>;
  /**
   * Get Wallet Transaction Data
   *
   * @param {string} txid The transaction id
   * @param {boolean} [includeWatchOnly=true] Include Watch Only
   * @param {boolean} [verbose=true] Include Watch Only
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettransaction.html
   * @return {Promise} Get detailed information about in-wallet transaction <txid>
   */
  getTransaction(
    txid: string,
    includeWatchOnly: true,
    verbose: true,
  ): Promise<TYPE_TRANSACTION_WITH_INCLUDE_VERBOSE>;
  /**
   * Get Wallet Transaction Data
   *
   * @param {string} txid The transaction id
   * @param {boolean} [includeWatchOnly=false] Include Watch Only
   * @param {boolean} [verbose=true] Include Watch Only
   *
   * @link https://developer.bitcoin.org/reference/rpc/gettransaction.html
   * @return {Promise} Get detailed information about in-wallet transaction <txid>
   */
  getTransaction(
    txid: string,
    includeWatchOnly: false,
    verbose: true,
  ): Promise<TYPE_TRANSACTION_WITH_DETAILS>;
  getTransaction(
    txid: string,
    includeWatchOnly?: boolean,
    verbose?: boolean,
  ): Promise<TYPE_TRANSACTION> {
    return this.call<TYPE_TRANSACTION>('gettransaction', [
      txid,
      verbose ?? false,
    ]);
  }

  /**
   * @deprecated Identical to getBalances().mine.untrusted_pending
   *
   * @see getBalance
   * @link https://developer.bitcoin.org/reference/rpc/getunconfirmedbalance.html
   * @return {Promise} The balance
   */
  getUnconfirmedBalance(): Promise<number> {
    return this.call<number>('getunconfirmedbalance');
  }

  /**
   * Returns an object containing various wallet state info.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getwalletinfo.html
   * @return {Promise}
   */
  getWalletInfo(): Promise<WalletInfoInterface> {
    return this.call<WalletInfoInterface>('getwalletinfo');
  }

  /**
   * Adds an address or script (in hex) that can be watched as if it
   * were in your wallet but cannot be used to spend. Requires a new
   * wallet backup.
   *
   * Note: This call can take over an hour to complete if rescan is
   * true, during that time, other rpc calls may report that the imported
   * address exists but related transactions are still missing, leading
   * to temporarily incorrect/bogus balances and unspent outputs until
   * rescan completes.
   *
   * If you have the full public key, you should call importpubkey instead
   * of this.
   *
   * Hint: use importmulti to import more than one address.
   *
   * Note: If you import a non-standard raw script in hex form, outputs
   * sending to it will be treated as change, and not show up in many RPCs.
   *
   * Note: Use “getwalletinfo” to query the scanning progress.
   *
   * @param {string} address The Bitcoin address (or hex-encoded script)
   * @param {string} [label=""] An optional label
   * @param {boolean} [rescan=true] Rescan the wallet for transactions
   * @param {boolean} [p2sh=false] Add the P2SH version of the script as well
   * @link https://developer.bitcoin.org/reference/rpc/importaddress.html
   * @return {Promise}
   */
  importAddress(
    address: string,
    label = '',
    rescan = true,
    p2sh = false,
  ): Promise<null> {
    return this.call<null>('importaddress', [address, label, rescan, p2sh]);
  }

  /**
   * Import descriptors. This will trigger a rescan of the blockchain based
   * on the earliest timestamp of all descriptors being imported. Requires
   * a new wallet backup.
   *
   * Note: This call can take over an hour to complete if using an early
   * timestamp; during that time, other rpc calls may report that the
   * imported keys, addresses or scripts exist but related transactions
   * are still missing.
   * @param {object[]} requests Data to be imported
   *
   * @link https://developer.bitcoin.org/reference/rpc/importdescriptors.html
   * @return {Promise} Response is an array with the same size as the input
   * that has the execution result
   */
  importDescriptors(
    requests: ImportDescriptorsOptionsInterface[],
  ): Promise<ImportDescriptorInterface[]> {
    return this.call<ImportDescriptorInterface[]>('importdescriptors', [
      requests,
    ]);
  }

  /**
   * Import addresses/scripts (with private or public keys, redeem script (P2SH)),
   * optionally rescanning the blockchain from the earliest creation time of the
   * imported scripts. Requires a new wallet backup.
   *
   * If an address/script is imported without all the private keys required to
   * spend from that address, it will be watchonly. The ‘watchonly’ option must be
   * set to true in this case or a warning will be returned.
   *
   * Conversely, if all the private keys are provided and the address/script is
   * spendable, the watchonly option must be set to false, or a warning will be
   * returned.
   *
   * Note: This call can take over an hour to complete if rescan is true, during
   * that time, other rpc calls may report that the imported keys, addresses or
   * scripts exist but related transactions are still missing.
   *
   * Note: Use “getwalletinfo” to query the scanning progress.
   * @param {object[]} requests Data to be imported
   * @param {boolean} [options]
   * @param {boolean} [options.rescan=true] tating if should rescan the blockchain after all imports
   *
   * @link https://developer.bitcoin.org/reference/rpc/importmulti.html
   * @return {Promise}
   */
  importMulti(
    requests: ImportMultiRequestInterface[],
    options = { rescan: true },
  ): Promise<ImportDescriptorInterface[]> {
    return this.call<ImportDescriptorInterface[]>('importmulti', [
      requests,
      options,
    ]);
  }

  /**
   * Adds a private key (as returned by dumpprivkey) to your wallet. Requires a new
   * wallet backup.
   *
   * Hint: use importmulti to import more than one private key.
   *
   * Note: This call can take over an hour to complete if rescan is true, during that
   * time, other rpc calls may report that the imported key exists but related
   * transactions are still missing, leading to temporarily incorrect/bogus balances
   * and unspent outputs until rescan completes.
   *
   * Note: Use “getwalletinfo” to query the scanning progress.
   * @param {string} privKey The private key (see dumpPrivKey)
   * @param {string} [label=''] An optional label @default=current label if address exists, otherwise “”
   * @param {string} [rescan=true] Rescan the wallet for transactions
   *
   * @see dumpPrivKey
   * @link https://developer.bitcoin.org/reference/rpc/importprivkey.html
   * @return {Promise}
   */
  importPrivKey(privKey: string, label = '', rescan = true): Promise<null> {
    return this.call<null>('importprivkey', [privKey, label, rescan]);
  }

  /**
   * Imports funds without rescan. Corresponding address or script must previously be
   * included in wallet. Aimed towards pruned wallets. The end-user is responsible to
   * import additional transactions that subsequently spend the imported outputs or
   * rescan after the point in the blockchain the transaction is included.
   * @param {string} rawTransaction A raw transaction in hex funding an already-existing
   * address in wallet
   * @param {string} txOutProof The hex output from gettxoutproof that contains the
   * transaction
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/importprunedfunds.html
   * @return {Promise}
   */
  importPrunedFunds(rawTransaction: string, txOutProof: string): Promise<null> {
    return this.call<null>('importprunedfunds', [rawTransaction, txOutProof]);
  }

  /**
   * Adds a public key (in hex) that can be watched as if it were in your wallet but
   * cannot be used to spend. Requires a new wallet backup.
   *
   * Hint: use importmulti to import more than one public key.
   *
   * Note: This call can take over an hour to complete if rescan is true, during that
   * time, other rpc calls may report that the imported pubkey exists but related
   * transactions are still missing, leading to temporarily incorrect/bogus balances and
   * unspent outputs until rescan completes.
   *
   * Note: Use “getwalletinfo” to query the scanning progress.
   * @param {string} pubKey The hex-encoded public key
   * @param {string} label An optional label
   * @param {boolean} rescan Rescan the wallet for transactions
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/importpubkey.html
   * @return {Promise}
   */
  importPubKey(pubKey: string, label = '', rescan = true): Promise<null> {
    return this.call<null>('importpubkey', [pubKey, label, rescan]);
  }

  /**
   * Imports keys from a wallet dump file (see dumpWallet). Requires a new wallet backup
   * to include imported keys.
   *
   * Note: Use “getwalletinfo” to query the scanning progress.
   * @param {string} filename The wallet file
   *
   * @see dumpWallet
   * @link https://developer.bitcoin.org/reference/rpc/importwallet.html
   * @return {Promise}
   */
  importWallet(filename: string): Promise<null> {
    return this.call<null>('importwallet', [filename]);
  }

  /**
   * Fills the key-pool.
   *
   * Requires wallet passphrase to be set with walletPassphrase call if wallet is
   * encrypted.
   * @param {number} [newSize=100]
   *
   * @link https://developer.bitcoin.org/reference/rpc/keypoolrefill.html
   * @return {Promise}
   */
  keyPoolRefill(newSize = 100): Promise<null> {
    return this.call<null>('keypoolrefill', [newSize]);
  }

  /**
   * Lists groups of addresses which have had their common ownership made public by common
   * use as inputs or as the resulting change in past transactions
   *
   * @link https://developer.bitcoin.org/reference/rpc/listaddressgroupings.html
   * @return {Promise}
   */
  listAddressGroupings(): Promise<any[][][]> {
    return this.call<any[][][]>('listaddressgroupings');
  }

  /**
   * Returns the list of all labels, or labels that are assigned to addresses with a specific
   * purpose.
   * @param {string} [purpose] Address purpose to list labels for (‘send’,’receive’). An empty
   * string is the same as not providing this argument.
   *
   * @link https://developer.bitcoin.org/reference/rpc/listlabels.html
   * @return {Promise} label names
   */
  listLabels(purpose: 'send' | 'receive'): Promise<string[]> {
    return this.call<string[]>('listlabels', [purpose]);
  }

  /**
   * Returns list of temporarily unspendable outputs.
   *
   * See the lockunspent call to lock and unlock transactions for spending.
   *
   * @link https://developer.bitcoin.org/reference/rpc/listlockunspent.html
   * @return {Promise}
   */
  listLockUnspent(): Promise<LockUnspendInterface[]> {
    return this.call<LockUnspendInterface[]>('listlockunspent');
  }

  /**
   * List balances by receiving address.
   * @param {number} [minConf=1] The minimum number of confirmations before payments are included.
   * @param {number} [includeEmpty=false] Whether to include addresses that haven’t received any payments.
   * @param {number} [includeWatchOnly=true] Whether to include watch-only addresses (see ‘importAddress’)
   * @param {number} [addressFilter] If present, only return information on this address.
   *
   * @see importAddress
   * @link https://developer.bitcoin.org/reference/rpc/listreceivedbyaddress.html
   * @return {Promise}
   */
  listReceivedByAddress(
    minConf = 1,
    includeEmpty = false,
    includeWatchOnly = true,
    addressFilter?: string,
  ): Promise<ListReceivedByAddressInterface[]> {
    return this.call<ListReceivedByAddressInterface[]>(
      'listreceivedbyaddress',
      [minConf, includeEmpty, includeWatchOnly, addressFilter],
    );
  }

  /**
   * List received transactions by label.
   * @param {number} [minConf=1] The minimum number of confirmations before payments are included.
   * @param {number} [includeEmpty=false] Whether to include labels that haven’t received any payments.
   * @param {number} [includeWatchOnly=true] Whether to include watch-only addresses (see ‘importaddress’)
   *
   * @link https://developer.bitcoin.org/reference/rpc/listreceivedbylabel.html
   * @return {Promise}
   */
  listReceivedByLabel(
    minConf = 1,
    includeEmpty = false,
    includeWatchOnly = true,
  ): Promise<ListReceivedByLabelInterface> {
    return this.call<ListReceivedByLabelInterface>('listreceivedbylabel', [
      minConf,
      includeEmpty,
      includeWatchOnly,
    ]);
  }

  /**
   * Get all transactions in blocks since block [blockhash], or all transactions if omitted.
   *
   * If “blockhash” is no longer a part of the main chain, transactions from the fork point
   * onward are included.
   *
   * Additionally, if include_removed is set, transactions affecting the wallet which were
   * removed are returned to the “removed” array.
   * @param {string} [blockHash] If set, the block hash to list transactions since, otherwise
   * list all transactions.
   * @param {number} [targetConfirmations=1] Return the nth block hash from the main chain.
   * e.g. 1 would mean the best block hash. Note: this is not used as a filter, but only
   * affects [lastblock] in the return value
   * @param {boolean} [includeWatchOnly=true] Include transactions to watch-only addresses
   * (see ‘importAddress’)
   * @param {boolean} [includeRemoved=true] Show transactions that were removed due to a
   * reorg in the “removed” array (not guaranteed to work on pruned nodes)
   *
   * @see importAddress
   * @link https://developer.bitcoin.org/reference/rpc/listsinceblock.html
   * @return {Promise}
   */
  listSinceBlock(
    blockHash: string,
    targetConfirmations = 1,
    includeWatchOnly = true,
    includeRemoved = true,
  ): Promise<ListSinceBlockInterface> {
    return this.call<ListSinceBlockInterface>('listsinceblock', [
      blockHash,
      targetConfirmations,
      includeWatchOnly,
      includeRemoved,
    ]);
  }

  /**
   * If a label name is provided, this will return only incoming transactions paying to
   * addresses with the specified label.
   *
   * Returns up to ‘count’ most recent transactions skipping the first ‘from’ transactions.
   *
   * @param {string} label If set, should be a valid label name to return only incoming
   * transactions with the specified label, or “*” to disable filtering and return all
   * transactions.
   * @param {number} [count=10] The number of transactions to return
   * @param {number} [skip=0] The number of transactions to skip
   * @param {number} [includeWatchOnly=true] Include transactions to watch-only addresses
   * (see ‘importaddress’)
   *
   * @see importAddress
   *
   * @link https://developer.bitcoin.org/reference/rpc/listtransactions.html
   * @return {Promise}
   */
  listTransactions(
    label: '*',
    count = 10,
    skip = 0,
    includeWatchOnly = true,
  ): Promise<Exclude<ListSinceBlockTransactionInterface, 'to'>> {
    return this.call<Exclude<ListSinceBlockTransactionInterface, 'to'>>(
      'listtransactions',
      [label, count, skip, includeWatchOnly],
    );
  }

  /**
   * Returns array of unspent transaction outputs with between minconf and maxconf (inclusive)
   * confirmations.
   *
   * Optionally filter to only include txouts paid to specified addresses.
   * @param {number} [minConf=1] The minimum confirmations to filter
   * @param {number} [maxConf=9999999] The maximum confirmations to filter
   * @param {string[]} [addresses] The bitcoin addresses to filter
   * @param {boolean} [includeUnsafe=true] Include outputs that are not safe to spend
   * See description of “safe” attribute below.
   * @param {object} [queryOptions]
   *
   * @link https://developer.bitcoin.org/reference/rpc/listunspent.html
   * @return {Promise}
   */
  listUnspent(
    minConf = 1,
    maxConf = 9999999,
    addresses?: string[],
    includeUnsafe = true,
    queryOptions?: ListUnspendQueryOptionsInterface,
  ): Promise<ListUnspentInterface> {
    return this.call<ListUnspentInterface>('listunspent', [
      minConf,
      maxConf,
      addresses,
      includeUnsafe,
      queryOptions,
    ]);
  }

  /**
   * Returns a list of wallets in the wallet directory.
   *
   * @link https://developer.bitcoin.org/reference/rpc/listwalletdir.html
   * @return {Promise}
   */
  listWalletDir(): Promise<WalletDirInterface> {
    return this.call<WalletDirInterface>('listwalletdir');
  }

  /**
   * Returns a list of currently loaded wallets.
   *
   * For full information on the wallet, use “getwalletinfo”
   *
   * @see getWalletInfo
   *
   * @link https://developer.bitcoin.org/reference/rpc/listwallets.html
   * @return {Promise} the wallet names
   */
  listWallets(): Promise<string[]> {
    return this.call<string[]>('listwallets');
  }

  /**
   * Loads a wallet from a wallet file or directory.
   *
   * Note that all wallet command-line options used when starting
   * bitcoind will be applied to the new wallet (eg -rescan, etc).
   * @param {string} filename The wallet directory or .dat file.
   * @param {boolean} [loadOnStartup=null] Save wallet name to persistent settings and load on
   * startup. True to add wallet to startup list, false to remove, null to leave unchanged.
   *
   * @link https://developer.bitcoin.org/reference/rpc/loadwallet.html
   * @return {Promise}
   */
  loadWallet(
    filename: string,
    loadOnStartup: boolean = null,
  ): Promise<ListWalletInterface> {
    return this.call<ListWalletInterface>('loadwallet', [
      filename,
      loadOnStartup,
    ]);
  }

  /**
   * Updates list of temporarily unspendable outputs.
   *
   * Temporarily lock (unlock=false) or unlock (unlock=true) specified transaction outputs.
   *
   * If no transaction outputs are specified when unlocking then all current locked transaction
   * outputs are unlocked.
   *
   * A locked transaction output will not be chosen by automatic coin selection, when spending
   * bitcoins.
   *
   * Manually selected coins are automatically unlocked.
   *
   * Locks are stored in memory only. Nodes start with zero locked outputs, and the locked output
   * list is always cleared (by virtue of process exit) when a node stops or fails.
   *
   * Also see the listunspent call
   * @param {boolean} unlock Whether to unlock (true) or lock (false) the specified transactions
   * @param {object} transactions The transaction outputs and within each, the txid (string) vout
   * (numeric).
   *
   * @link https://developer.bitcoin.org/reference/rpc/lockunspent.html
   * @return {Promise} Whether the command was successful or not
   */
  lockUnspent(
    unlock: boolean,
    transactions: LockUnspendTransactionInterface[],
  ): Promise<boolean> {
    return this.call<boolean>('lockunspent', [unlock, transactions]);
  }

  /**
   * Bumps the fee of an opt-in-RBF transaction T, replacing it with a new transaction B.
   *
   * Returns a PSBT instead of creating and signing a new transaction.
   *
   * An opt-in RBF transaction with the given txid must be in the wallet.
   *
   * The command will pay the additional fee by reducing change outputs or adding inputs when
   * necessary.
   *
   * It may add a new change output if one does not already exist.
   *
   * All inputs in the original transaction will be included in the replacement transaction.
   *
   * The command will fail if the wallet or mempool contains a transaction that spends one of T’s
   * outputs.
   *
   * By default, the new fee will be calculated automatically using the estimatesmartfee RPC.
   *
   * The user can specify a confirmation target for estimatesmartfee.
   *
   * Alternatively, the user can specify a fee rate in sat/vB for the new transaction.
   *
   * At a minimum, the new fee rate must be high enough to pay an additional new relay fee
   * (incrementalfee returned by getnetworkinfo) to enter the node’s mempool.
   *
   *
   * **WARNING: before version 0.21, fee_rate was in BTC/kvB. As of 0.21, fee_rate is in sat/vB.**
   * @param {string} txid The txid to be bumped
   * @param {object} [options] The txid to be bumped
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/psbtbumpfee.html
   * @return {Promise}
   */
  psbtBumpFee(
    txid: string,
    options?: PsbtBumpFeeOptionsInterface,
  ): Promise<PsbtBumpFeeInterface> {
    return this.call<PsbtBumpFeeInterface>('psbtbumpfee', [txid, options]);
  }

  /**
   * Deletes the specified transaction from the wallet. Meant for use with pruned wallets
   * and as a companion to importprunedfunds. This will affect wallet balances.
   * @param {string} txid The hex-encoded id of the transaction you are deleting
   *
   * @link https://developer.bitcoin.org/reference/rpc/removeprunedfunds.html
   * @return {Promise}
   */
  removePrunedFunds(txid: string): Promise<null> {
    return this.call<null>('removeprunedfunds', [txid]);
  }

  /**
   * Rescan the local blockchain for wallet related transactions.
   *
   * Note: Use “getwalletinfo” to query the scanning progress.
   * @param {number} [startHeight=0] block height where the rescan should start
   * @param {number} [stopHeight] the last block height that should be scanned. If none
   * is provided it will rescan up to the tip at return time of this call.
   *
   * @link https://developer.bitcoin.org/reference/rpc/rescanblockchain.html
   * @return {Promise}
   */
  rescanBlockchain(
    startHeight = 0,
    stopHeight?: number,
  ): Promise<RescanBlockchainInterface> {
    return this.call<RescanBlockchainInterface>('rescanblockchain', [
      startHeight,
      stopHeight,
    ]);
  }

  /**
   * Send a transaction.
   *
   * **EXPERIMENTAL warning: this call may be changed in future releases.**
   * @param {object} outputs The outputs (key-value pairs), where none of the keys are
   * duplicated. That is, each address can only appear once and there can only be one
   * ‘data’ object. For convenience, a dictionary, which holds the key-value pairs directly,
   * is also accepted.
   * @param {number} [confTarget] Confirmation target in blocks
   * @param {string} [estimateMode] The fee estimate mode
   * @param {number|string} [feeRate] Specify a fee rate in sat/vB.
   * @param {object} [options] Options
   *
   * @link https://developer.bitcoin.org/reference/rpc/send.html
   * @return {Promise}
   */
  send(
    outputs: Record<string, string | number>[],
    confTarget?: number,
    estimateMode?: TYPE_ESTIMATE_MODE,
    feeRate?: number | string,
    options?: SendOptionsInterface,
  ): Promise<SendInterface> {
    return this.call<SendInterface>('send', [
      outputs,
      confTarget,
      estimateMode,
      feeRate,
      options,
    ]);
  }

  /**
   * Send multiple times. Amounts are double-precision floating point numbers.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted.
   * @param {string} dummy Must be set to “” for backwards compatibility.
   * @param {object} amounts The addresses and amounts
   * @param {number} [minConf] Ignored dummy value
   * @param {string} [comment] A comment
   * @param {string[]} [subtractFeeFrom] The addresses. The fee will be equally deducted from the amount of each
   * selected address. Those recipients will receive fewer bitcoins than you enter in their corresponding amount
   * field. If no addresses are specified here, the sender pays the fee.
   * @param {boolean} replaceable Allow this transaction to be replaced by a transaction with higher fees via BIP 125
   * @param {number} confTarget Confirmation target in blocks
   * @param {string} [estimateMode=unset] The fee estimate mode, must be one of (case insensitive): “unset”,
   * “economical”, “conservative”
   * @param {number|string} [feeRate] Specify a fee rate in sat/vB.
   *
   * @link https://developer.bitcoin.org/reference/rpc/sendmany.html
   * @return {Promise} The transaction id for to send. Only 1 transaction is created regardless of
   */
  sendMany(
    dummy: string,
    amounts: Record<string, number | string>,
    minConf?: number,
    comment?: string,
    subtractFeeFrom?: string[],
    replaceable?: boolean,
    confTarget?: number,
    estimateMode?: string,
    feeRate?: number | string,
  ): Promise<string>;
  /**
   * Send multiple times. Amounts are double-precision floating point numbers.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted.
   * @param {string} dummy Must be set to “” for backwards compatibility.
   * @param {object} amounts The addresses and amounts
   * @param {number} [minConf] Ignored dummy value
   * @param {string} [comment] A comment
   * @param {string[]} [subtractFeeFrom] The addresses. The fee will be equally deducted from the amount of each
   * selected address. Those recipients will receive fewer bitcoins than you enter in their corresponding amount
   * field. If no addresses are specified here, the sender pays the fee.
   * @param {boolean} replaceable Allow this transaction to be replaced by a transaction with higher fees via BIP 125
   * @param {number} confTarget Confirmation target in blocks
   * @param {string} [estimateMode=unset] The fee estimate mode, must be one of (case insensitive): “unset”,
   * “economical”, “conservative”
   * @param {number|string} [feeRate] Specify a fee rate in sat/vB.
   * @param {boolean} [verbose] Specify a fee rate in sat/vB.
   *
   * @link https://developer.bitcoin.org/reference/rpc/sendmany.html
   * @return {Promise} The transaction id for to send. Only 1 transaction is created regardless of
   */
  sendMany(
    dummy: string,
    amounts: Record<string, number | string>,
    minConf?: number,
    comment?: string,
    subtractFeeFrom?: string[],
    replaceable?: boolean,
    confTarget?: number,
    estimateMode?: string,
    feeRate?: number | string,
    verbose?: false,
  ): Promise<string>;
  /**
   * Send multiple times. Amounts are double-precision floating point numbers.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted.
   * @param {string} dummy Must be set to “” for backwards compatibility.
   * @param {object} amounts The addresses and amounts
   * @param {number} [minConf] Ignored dummy value
   * @param {string} [comment] A comment
   * @param {string[]} [subtractFeeFrom] The addresses. The fee will be equally deducted from the amount of each
   * selected address. Those recipients will receive fewer bitcoins than you enter in their corresponding amount
   * field. If no addresses are specified here, the sender pays the fee.
   * @param {boolean} replaceable Allow this transaction to be replaced by a transaction with higher fees via BIP 125
   * @param {number} confTarget Confirmation target in blocks
   * @param {string} [estimateMode=unset] The fee estimate mode, must be one of (case insensitive): “unset”,
   * “economical”, “conservative”
   * @param {number|string} [feeRate] Specify a fee rate in sat/vB.
   * @param {boolean} [verbose] Specify a fee rate in sat/vB.
   *
   * @link https://developer.bitcoin.org/reference/rpc/sendmany.html
   * @return {Promise}
   */
  sendMany(
    dummy: string,
    amounts: Record<string, number | string>,
    minConf?: number,
    comment?: string,
    subtractFeeFrom?: string[],
    replaceable?: boolean,
    confTarget?: number,
    estimateMode?: string,
    feeRate?: number | string,
    verbose?: true,
  ): Promise<SendToAddressInterface>;
  /**
   * Send multiple times. Amounts are double-precision floating point numbers.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted.
   * @param {string} dummy Must be set to “” for backwards compatibility.
   * @param {object} amounts The addresses and amounts
   * @param {number} [minConf] Ignored dummy value
   * @param {string} [comment] A comment
   * @param {string[]} [subtractFeeFrom] The addresses. The fee will be equally deducted from the amount of each
   * selected address. Those recipients will receive fewer bitcoins than you enter in their corresponding amount
   * field. If no addresses are specified here, the sender pays the fee.
   * @param {boolean} replaceable Allow this transaction to be replaced by a transaction with higher fees via BIP 125
   * @param {number} confTarget Confirmation target in blocks
   * @param {string} [estimateMode=unset] The fee estimate mode, must be one of (case insensitive): “unset”,
   * “economical”, “conservative”
   * @param {number|string} [feeRate] Specify a fee rate in sat/vB.
   * @param {boolean} [verbose] Specify a fee rate in sat/vB.
   *
   * @link https://developer.bitcoin.org/reference/rpc/sendmany.html
   * @return {Promise}
   */
  sendMany(
    dummy: string,
    amounts: Record<string, number | string>,
    minConf?: number,
    comment?: string,
    subtractFeeFrom?: string[],
    replaceable?: boolean,
    confTarget?: number,
    estimateMode?: string,
    feeRate?: number | string,
    verbose?: boolean,
  ): Promise<string | SendToAddressInterface> {
    return this.call<string>('sendmany', [
      dummy,
      amounts,
      minConf,
      comment,
      subtractFeeFrom,
      replaceable,
      confTarget,
      estimateMode,
      feeRate,
      verbose,
    ]);
  }

  /**
   * Send an amount to a given address.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet
   * is encrypted.
   * @param {string} address The bitcoin address to send to.
   * @param {number|string} amount The amount in BTC to send. eg 0.1
   * @param {string} [comment] A comment used to store what the transaction
   * is for. This is not part of the transaction, just kept in your wallet.
   * @param {string} [commentTo] A comment to store the name of the person or
   * organization to which you’re sending the transaction. This is not part of
   * the transaction, just kept in your wallet.
   * @param {boolean} [subtractFeeFromAmount=false] The fee will be deducted from
   * the amount being sent. The recipient will receive fewer bitcoins than you enter
   * the amount field.
   * @param {boolean} [replaceable] Allow this transaction to be replaced by a
   * transaction with higher fees via BIP 125
   * @param {number} [confTarget] Confirmation target in blocks
   * @param {string} [estimateMode] The fee estimate mode, must be one of (case-insensitive):
   * “unset” “economical” “conservative”
   * @param {string} [avoidReuse] (only available if avoid_reuse wallet flag is set) Avoid
   * spending from dirty addresses; addresses are considered dirty if they have previously
   * been used in a transaction.
   *
   * @link https://developer.bitcoin.org/reference/rpc/sendtoaddress.html
   * @return {Promise}
   */
  sendToAddress(
    address: string,
    amount: number | string,
    comment?: string,
    commentTo?: string,
    subtractFeeFromAmount?: boolean,
    replaceable?: boolean,
    confTarget?: number,
    estimateMode?: TYPE_ESTIMATE_MODE,
    avoidReuse?: boolean,
  ): Promise<string>;
  /**
   * Send an amount to a given address.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet
   * is encrypted.
   * @param {string} address The bitcoin address to send to.
   * @param {number|string} amount The amount in BTC to send. eg 0.1
   * @param {string} [comment] A comment used to store what the transaction
   * is for. This is not part of the transaction, just kept in your wallet.
   * @param {string} [commentTo] A comment to store the name of the person or
   * organization to which you’re sending the transaction. This is not part of
   * the transaction, just kept in your wallet.
   * @param {boolean} [subtractFeeFromAmount=false] The fee will be deducted from
   * the amount being sent. The recipient will receive fewer bitcoins than you enter
   * the amount field.
   * @param {boolean} [replaceable] Allow this transaction to be replaced by a
   * transaction with higher fees via BIP 125
   * @param {number} [confTarget] Confirmation target in blocks
   * @param {string} [estimateMode] The fee estimate mode, must be one of (case-insensitive):
   * “unset” “economical” “conservative”
   * @param {string} [avoidReuse] (only available if avoid_reuse wallet flag is set) Avoid
   * spending from dirty addresses; addresses are considered dirty if they have previously
   * been used in a transaction.
   * @param {boolean} [verbose] Verbose
   *
   * @link https://developer.bitcoin.org/reference/rpc/sendtoaddress.html
   * @return {Promise}
   */
  sendToAddress(
    address: string,
    amount: number | string,
    comment?: string,
    commentTo?: string,
    subtractFeeFromAmount?: boolean,
    replaceable?: boolean,
    confTarget?: number,
    estimateMode?: TYPE_ESTIMATE_MODE,
    avoidReuse?: boolean,
    verbose?: true,
  ): Promise<SendToAddressInterface>;
  /**
   * Send an amount to a given address.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet
   * is encrypted.
   * @param {string} address The bitcoin address to send to.
   * @param {number|string} amount The amount in BTC to send. eg 0.1
   * @param {string} [comment] A comment used to store what the transaction
   * is for. This is not part of the transaction, just kept in your wallet.
   * @param {string} [commentTo] A comment to store the name of the person or
   * organization to which you’re sending the transaction. This is not part of
   * the transaction, just kept in your wallet.
   * @param {boolean} [subtractFeeFromAmount=false] The fee will be deducted from
   * the amount being sent. The recipient will receive fewer bitcoins than you enter
   * the amount field.
   * @param {boolean} [replaceable] Allow this transaction to be replaced by a
   * transaction with higher fees via BIP 125
   * @param {number} [confTarget] Confirmation target in blocks
   * @param {string} [estimateMode] The fee estimate mode, must be one of (case-insensitive):
   * “unset” “economical” “conservative”
   * @param {string} [avoidReuse] (only available if avoid_reuse wallet flag is set) Avoid
   * spending from dirty addresses; addresses are considered dirty if they have previously
   * been used in a transaction.
   * @param {boolean} [verbose] Verbose
   *
   * @link https://developer.bitcoin.org/reference/rpc/sendtoaddress.html
   * @return {Promise}
   */
  sendToAddress(
    address: string,
    amount: number | string,
    comment?: string,
    commentTo?: string,
    subtractFeeFromAmount?: boolean,
    replaceable?: boolean,
    confTarget?: number,
    estimateMode?: TYPE_ESTIMATE_MODE,
    avoidReuse?: boolean,
    verbose?: false,
  ): Promise<string>;
  /**
   * Send an amount to a given address.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet
   * is encrypted.
   * @param {string} address The bitcoin address to send to.
   * @param {number|string} amount The amount in BTC to send. eg 0.1
   * @param {string} [comment] A comment used to store what the transaction
   * is for. This is not part of the transaction, just kept in your wallet.
   * @param {string} [commentTo] A comment to store the name of the person or
   * organization to which you’re sending the transaction. This is not part of
   * the transaction, just kept in your wallet.
   * @param {boolean} [subtractFeeFromAmount=false] The fee will be deducted from
   * the amount being sent. The recipient will receive fewer bitcoins than you enter
   * the amount field.
   * @param {boolean} [replaceable] Allow this transaction to be replaced by a
   * transaction with higher fees via BIP 125
   * @param {number} [confTarget] Confirmation target in blocks
   * @param {string} [estimateMode] The fee estimate mode, must be one of (case-insensitive):
   * “unset” “economical” “conservative”
   * @param {string} [avoidReuse] (only available if avoid_reuse wallet flag is set) Avoid
   * spending from dirty addresses; addresses are considered dirty if they have previously
   * been used in a transaction.
   * @param {boolean} [verbose] Verbose
   *
   * @link https://developer.bitcoin.org/reference/rpc/sendtoaddress.html
   * @return {Promise}
   */
  sendToAddress(
    address: string,
    amount: number | string,
    comment?: string,
    commentTo?: string,
    subtractFeeFromAmount = false,
    replaceable = false,
    confTarget?: number,
    estimateMode?: TYPE_ESTIMATE_MODE,
    avoidReuse = true,
    verbose?: boolean,
  ): Promise<string | SendToAddressInterface> {
    return this.call<string | SendToAddressInterface>('sendtoaddress', [
      address,
      amount,
      comment,
      commentTo,
      subtractFeeFromAmount,
      replaceable,
      confTarget,
      avoidReuse,
      verbose,
    ]);
  }

  /**
   * Set or generate a new HD wallet seed. Non-HD wallets will not be upgraded to being an HD wallet.
   * Wallets that are already HD will have a new HD seed set so that new keys added to the keypool
   * will be derived from this new seed.
   *
   * Note that you will need to MAKE A NEW BACKUP of your wallet after setting the HD wallet seed.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted.
   * @param {boolean} [newKeyPool=true] Whether to flush old unused addresses, including change addresses,
   * from the keypool and regenerate it. If true, the next address from getnewaddress and change address
   * from getrawchangeaddress will be from this new seed. If false, addresses (including change addresses
   * if the wallet already had HD Chain Split enabled) from the existing keypool will be used until it
   * has been depleted.
   * @param {string} [seed] The WIF private key to use as the new HD seed. The seed value can be retrieved
   * using the dumpwallet command. It is the private key marked hdseed=1
   *
   * @link https://developer.bitcoin.org/reference/rpc/sethdseed.html
   * @return {Promise}
   */
  setHDSeed(newKeyPool = true, seed?: string): Promise<null> {
    return this.call<null>('sethdseed', [newKeyPool, seed]);
  }

  /**
   * Sets the label associated with the given address.
   * @param {string} address The bitcoin address to be associated with a label.
   * @param {string} label The label to assign to the address.
   *
   * @link https://developer.bitcoin.org/reference/rpc/setlabel.html
   * @return {Promise}
   */
  setLabel(address: string, label: string): Promise<null> {
    return this.call<null>('setlabel', [address, label]);
  }

  /**
   * Set the transaction fee per kB for this wallet. Overrides the global
   * -paytxfee command line parameter.
   *
   * Can be deactivated by passing 0 as the fee. In that case automatic fee
   * selection will be used by default.
   * @param {number|string} amount The transaction fee in BTC/kvB
   *
   * @link https://developer.bitcoin.org/reference/rpc/settxfee.html
   * @return {Promise} Returns true if successful
   */
  setTXFee(amount: number | string): Promise<boolean> {
    return this.call<boolean>('settxfee', [amount]);
  }

  /**
   * Change the state of the given wallet flag for a wallet.
   * @param {string} flag The name of the flag to change. Current available flags: avoid_reuse
   * @param {boolean} value The new state.
   *
   * @link https://developer.bitcoin.org/reference/rpc/setwalletflag.html
   * @return {Promise}
   */
  setWalletFlag(flag: string, value = true): Promise<SetWalletFlagInterface> {
    return this.call<SetWalletFlagInterface>('setwalletflag', [flag, value]);
  }

  /**
   * Sign a message with the private key of an address Requires wallet passphrase to
   * be set with walletpassphrase call if wallet is encrypted.
   * @param {string} address The bitcoin address to use for the private key.
   * @param {string} message The message to create a signature of.
   *
   * @link https://developer.bitcoin.org/reference/rpc/signmessage.html
   * @return {Promise} The signature of the message encoded in base 64
   */
  signMessage(address: string, message: string): Promise<string> {
    return this.call<string>('signmessage', [address, message]);
  }

  /**
   * Sign inputs for raw transaction (serialized, hex-encoded).
   *
   * The second optional argument (maybe null) is an array of previous transaction outputs that
   * this transaction depends on but may not yet be in the block chain.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted.
   * @param {string} hexString The transaction hex string
   * @param {object[]} [prevTxs] The previous dependent transaction outputs
   * @param {string} [sigHashType=ALL] The previous dependent transaction outputs
   *
   * @link https://developer.bitcoin.org/reference/rpc/signrawtransactionwithwallet.html
   * @return {Promise}
   */
  signRawTransactionWithWallet(
    hexString: string,
    prevTxs: PrevTxInterface[],
    sigHashType: TYPE_SIGHASH_TYPES = 'ALL',
  ): Promise<SignRawTransactionWithWalletInterface> {
    return this.call<SignRawTransactionWithWalletInterface>(
      'signrawtransactionwithwallet',
      [hexString, prevTxs, sigHashType],
    );
  }

  /**
   * Unloads the wallet referenced by the request endpoint otherwise unloads the wallet
   * specified in the argument.
   *
   * Specifying the wallet name on a wallet endpoint is invalid.
   *
   * @param {string} [walletName=the wallet name from the RPC endpoint] The name of the
   * wallet to unload. Must be provided in the RPC endpoint or this parameter (but not
   * both).
   * @param {boolean} [loadOonStartup=null] Save wallet name to persistent settings and
   * load on startup. True to add wallet to startup list, false to remove, null to leave
   * unchanged.
   *
   * @link https://developer.bitcoin.org/reference/rpc/unloadwallet.html
   * @return {Promise} Warning message if wallet was not unloaded cleanly.
   */
  unloadWallet(
    walletName?: string,
    loadOonStartup: boolean = null,
  ): Promise<{ warning: string }> {
    return this.call<{ warning: string }>('unloadwallet', [
      walletName,
      loadOonStartup,
    ]);
  }

  /**
   * Upgrade the wallet. Upgrades to the latest version if no version number is specified.
   *
   * New keys may be generated and a new wallet backup will need to be made.
   * @param {number} [version=169900] The version number to upgrade to. Default is the latest
   * wallet version.
   *
   * @link https://developer.bitcoin.org/reference/rpc/upgradewallet.html
   * @return {Promise}
   */
  upgradeWallet(version = 169900): Promise<TYPE_UPGRADE_WALLET> {
    return this.call<TYPE_UPGRADE_WALLET>('upgradewallet', [version]);
  }

  /**
   * Creates and funds a transaction in the Partially Signed Transaction format.
   *
   * Implements the Creator and Updater roles.
   * @param {object} outputs The outputs (key-value pairs), where none of the keys are duplicated.
   * @param {object} [inputs] Leave empty to add inputs automatically. See add_inputs option.
   * @param {number} [locktime=0] Raw locktime. Non-0 value also locktime-activates inputs
   * @param {object} [options] Options
   * @param {boolean} [bip32Derivs=true] Include BIP 32 derivation paths for public keys if we know them
   *
   * @link https://developer.bitcoin.org/reference/rpc/walletcreatefundedpsbt.html
   * @return {Promise}
   */
  walletCreateFundedPSBT(
    outputs: Record<string, string | number>[],
    inputs?: WalletCreateFundedPsbtInputInterface[],
    locktime = 0,
    options?: WalletCreateFundedPsbtOptionsInterface,
    bip32Derivs = true,
  ): Promise<WalletCreateFundedPsbtInterface> {
    return this.call<WalletCreateFundedPsbtInterface>(
      'walletcreatefundedpsbt',
      [inputs, outputs, locktime, options, bip32Derivs],
    );
  }

  /**
   * Removes the wallet encryption key from memory, locking the wallet.
   *
   * After calling this method, you will need to call walletpassphrase
   * again before being able to call any methods which require the wallet
   * to be unlocked.
   *
   * @link https://developer.bitcoin.org/reference/rpc/walletlock.html
   * @return {Promise}
   */
  walletLock(): Promise<null> {
    return this.call<null>('walletlock');
  }

  /**
   * Stores the wallet decryption key in memory for ‘timeout’ seconds.
   *
   * This is needed prior to performing transactions related to private
   * keys such as sending bitcoins Note:
   *
   * Issuing the walletpassphrase command while the wallet is already
   * unlocked will set a new unlock time that overrides the old one.
   *
   * @param {string} passphrase The wallet passphrase
   * @param {number} timeout The time to keep the decryption key in
   * seconds; capped at 100000000 (~3 years).
   *
   * @link https://developer.bitcoin.org/reference/rpc/walletpassphrase.html
   * @return {Promise}
   */
  walletPassphrase(passphrase: string, timeout: number): Promise<null> {
    return this.call<null>('walletpassphrase', [passphrase, timeout]);
  }

  /**
   * Changes the wallet passphrase from ‘oldPassphrase’ to ‘newPassphrase’.
   *
   * @param {string} oldPassphrase The current passphrase
   * @param {string} newPassphrase The new passphrase
   *
   * @link https://developer.bitcoin.org/reference/rpc/walletpassphrasechange.html
   * @return {Promise}
   */
  walletPassphraseChange(
    oldPassphrase: string,
    newPassphrase: string,
  ): Promise<null> {
    return this.call<null>('walletpassphrasechange', [
      oldPassphrase,
      newPassphrase,
    ]);
  }

  /**
   * Update a PSBT with input information from our wallet and then sign inputs that we can sign for.
   *
   * Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted.
   * @param {string} psbt The transaction base64 string
   * @param {boolean} [sign] Also sign the transaction when updating
   * @param {string} [signHashType] The signature hash type to sign with if not specified by the PSBT.
   * @param {boolean} [bip32Derivs] Include BIP 32 derivation paths for public keys if we know them
   *
   * @link https://developer.bitcoin.org/reference/rpc/walletprocesspsbt.html
   * @return {Promise}
   */
  walletProcessPSBT(
    psbt: string,
    sign = true,
    signHashType: TYPE_SIGHASH_TYPES = 'ALL',
    bip32Derivs = true,
  ): Promise<WalletProcessPsbtInterface> {
    return this.call<WalletProcessPsbtInterface>('walletprocesspsbt', [
      psbt,
      sign,
      signHashType,
      bip32Derivs,
    ]);
  }
}
