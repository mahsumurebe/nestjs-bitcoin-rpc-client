// noinspection JSUnusedGlobalSymbols

import { Injectable } from '@nestjs/common';
import { MemoryInfoInterface, RpcInfoInterface } from '../interfaces';
import { TYPE_LOGGING, TYPE_LOGGING_CATEGORIES } from '../types';
import { BaseServiceAbstract } from '../abstracts';

@Injectable()
/**
 * Control RPC Service
 *
 * @author Mahsum UREBE <info@mahsumurebe.com>
 * @licence MIT
 * @link https://developer.bitcoin.org/reference/rpc/index.html#control-rpcs
 */
export class ControlRpcService extends BaseServiceAbstract {
  /**
   * Get Memory Info
   * @param {string} [mode=stats] determines what kind of information is returned.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmemoryinfo.html
   * @return {Promise} returns general statistics about memory usage in the daemon.
   */
  getMemoryInfo(mode: 'stats'): Promise<MemoryInfoInterface>;
  /**
   * Get Memory Info
   * @param {string} [mode=mallocinfo] determines what kind of information is returned.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getmemoryinfo.html
   * @return {Promise} returns an XML string describing low-level heap state (only available if compiled with glibc 2.10+).
   */
  getMemoryInfo(mode: 'mallocinfo'): Promise<string>;
  getMemoryInfo(
    mode: 'stats' | 'mallocinfo',
  ): Promise<MemoryInfoInterface | string> {
    return this.call<MemoryInfoInterface | string>('getmemoryinfo', [mode]);
  }

  /**
   * Get RPC Info
   *
   * @link https://developer.bitcoin.org/reference/rpc/getrpcinfo.html
   * @return {RpcInfoInterface} Returns details of the RPC server.
   */
  getRpcInfo(): Promise<RpcInfoInterface> {
    return this.call<RpcInfoInterface>('getrpcinfo', []);
  }

  /**
   * List all commands, or get help for a specified command.
   * @param {string} [command] The command to get help on
   *
   * @link https://developer.bitcoin.org/reference/rpc/help.html
   * @return {Promise}
   */
  help(command?: string): Promise<string> {
    return this.call<string>('help', [command]);
  }

  /**
   * Gets and sets the logging configuration.
   *
   * When called without an argument, returns the list of
   * categories with status that are currently being debugged
   * logged or not.
   *
   * When called with arguments, adds or removes categories
   * from debug logging and return the lists above.
   *
   * The arguments are evaluated in order “include”, “exclude”.
   *
   * If an item is both included and excluded, it will thus end
   * up being excluded.
   *
   * The valid logging categories are: net, tor, mempool, http, bench, zmq, walletdb, rpc, estimatefee, addrman, selectcoins, reindex, cmpctblock, rand, prune, proxy, mempoolrej, libevent, coindb, qt, leveldb, validation In addition, the following are available as category names with special meanings:
   *
   * - “all”, “1” : represent all logging categories.
   *
   * - “none”, “0” : even if other logging categories are
   * specified, ignore all of them.
   *
   *
   * @param {TYPE_LOGGING_CATEGORIES[]} include The categories to add to debug logging
   * @param {TYPE_LOGGING_CATEGORIES[]} exclude The categories to remove from debug logging
   *
   * @link https://developer.bitcoin.org/reference/rpc/logging.html
   * @return {Promise} keys are the logging categories, and values indicates its status
   */
  logging(
    include?: TYPE_LOGGING_CATEGORIES[],
    exclude?: TYPE_LOGGING_CATEGORIES[],
  ): Promise<TYPE_LOGGING> {
    return this.call<TYPE_LOGGING>('logging', [include, exclude]);
  }

  /**
   * Request a graceful shutdown of Bitcoin Core.
   *
   * @link https://developer.bitcoin.org/reference/rpc/stop.html
   * @return {null}
   */
  stop(): Promise<null> {
    return this.call<null>('stop', []);
  }

  /**
   * The number of seconds that the server has been running
   *
   * @link https://developer.bitcoin.org/reference/rpc/uptime.html
   * @return {number} Returns the total uptime of the server.
   */
  uptime(): Promise<number> {
    return this.call<number>('uptime', []);
  }
}
