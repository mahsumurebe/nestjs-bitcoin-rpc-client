// noinspection JSUnusedGlobalSymbols

import { BaseServiceAbstract } from '../abstracts';
import { Injectable } from '@nestjs/common';
import {
  ListBannedInterface,
  NetTotalsInterface,
  NetworkInfoInterface,
  PeerInfoInterface,
} from '../interfaces';

@Injectable()
/**
 * Network RPC Service
 *
 * @author Mahsum UREBE <info@mahsumurebe.com>
 * @licence MIT
 * @link https://developer.bitcoin.org/reference/rpc/index.html#network-rpcs
 */
export class NetworkRpcService extends BaseServiceAbstract {
  /**
   * Attempts to add or remove a node from the addnode list.
   *
   * Or try a connection to a node once.
   *
   * Nodes added using addnode (or -connect) are protected
   * from DoS disconnection and are not required to be full
   * nodes/support SegWit as other outbound peers are (though
   * such peers will not be synced from).
   *
   * @param {string} node The node (see getpeerinfo for nodes)
   * @param {string} command ‘add’ to add a node to the list, ‘remove’ to remove a node from the list, ‘onetry’ to try a connection to the node once
   *
   * @see {NetworkRpcService.getPeerInfo}
   *
   * @link https://developer.bitcoin.org/reference/rpc/addnode.html
   * @return {Promise}
   */
  addNode(node: string, command: 'add' | 'remove' | 'onetry'): Promise<null> {
    return this.call<null>('addnode', [node, command]);
  }

  /**
   * Clear all banned IPs.
   *
   * @link https://developer.bitcoin.org/reference/rpc/clearbanned.html
   * @return {Promise}
   */
  clearBanned(): Promise<null> {
    return this.call<null>('clearbanned');
  }

  /**
   * Immediately disconnects from the specified peer node.
   *
   * Strictly one out of ‘address’ and ‘nodeid’ can be provided to identify the node.
   *
   * To disconnect by nodeid, either set ‘address’ to the empty string, or call using the named ‘nodeid’ argument only
   *
   * @param {string} [address] The IP address/port of the node
   * @param {string} [nodeid] The node ID (see getpeerinfo for node IDs)
   *
   * @link https://developer.bitcoin.org/reference/rpc/disconnectnode.html
   * @return {Promise}
   */
  disconnectNode(address?: string, nodeid?: string): Promise<null> {
    return this.call<null>('disconnectnode', [address, nodeid]);
  }

  /**
   * Get Added Node Info
   *
   * @param {string} [node] If provided, return information about this specific node, otherwise all nodes are returned.
   *
   *
   * @link https://developer.bitcoin.org/reference/rpc/getaddednodeinfo.html
   * @return {Promise} Returns information about the given added node, or all added nodes (note that onetry addnodes are not listed here)
   */
  getAddedNodeInfo(node?: string): Promise<null> {
    return this.call<null>('getaddednodeinfo', [node]);
  }

  /**
   * Get Connection Count
   *
   * @link https://developer.bitcoin.org/reference/rpc/getconnectioncount.html
   * @return {Promise} Returns the number of connections to other nodes.
   */
  getConnectionCount(): Promise<number> {
    return this.call<number>('getconnectioncount');
  }

  /**
   * Get Network Totals
   *
   * @link https://developer.bitcoin.org/reference/rpc/getnettotals.html
   * @return {Promise} Returns information about network traffic, including bytes in, bytes out, and current time.
   */
  getNetTotals(): Promise<NetTotalsInterface> {
    return this.call<NetTotalsInterface>('getnettotals');
  }

  /**
   * Get Network Info
   *
   * @link https://developer.bitcoin.org/reference/rpc/getnetworkinfo.html
   * @return {Promise} Returns an object containing various state info regarding P2P networking.
   */
  getNetworkInfo(): Promise<NetworkInfoInterface> {
    return this.call<NetworkInfoInterface>('getnetworkinfo', []);
  }

  /**
   * Get Node Addresses
   * @param {number} count The maximum number of addresses to return. Specify 0 to return all known addresses.
   *
   * @link https://developer.bitcoin.org/reference/rpc/getnodeaddresses.html
   * @return {Promise} Return known addresses which can potentially be used to find new nodes in the network
   */
  getNodeAddresses(count?: number) {
    return this.call('getnodeaddresses', [count ?? 1]);
  }

  /**
   * Get Peer Info
   *
   * @link https://developer.bitcoin.org/reference/rpc/getpeerinfo.html
   * @return {Promise} Returns data about each connected network node as a json array of objects.
   */
  getPeerInfo(): Promise<PeerInfoInterface> {
    return this.call<PeerInfoInterface>('getpeerinfo');
  }

  /**
   * List all manually banned IPs/Subnets.
   *
   * @link https://developer.bitcoin.org/reference/rpc/listbanned.html
   * @return {Promise}
   */
  listBanned(): Promise<ListBannedInterface> {
    return this.call<ListBannedInterface>('listbanned');
  }

  /**
   * Requests that a ping be sent to all other nodes, to measure ping time.
   *
   * Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds.
   *
   * Ping command is handled in queue with all other commands, so it measures processing backlog, not just network ping.
   *
   * @link https://developer.bitcoin.org/reference/rpc/ping.html
   * @return {Promise}
   */
  ping(): Promise<null> {
    return this.call<null>('ping');
  }

  /**
   * Attempts to add or remove an IP/Subnet from the banned list.
   * @param {string} subnet The IP/Subnet (see getpeerinfo for nodes IP)
   * with an optional netmask (default is /32 = single IP)
   * @param {'add'|'remove'} command ‘add’ to add an IP/Subnet to the list,
   * ‘remove’ to remove an IP/Subnet from the list
   * @param {number} [bantime] time in seconds how long (or until when if
   * [absolute] is set) the IP is banned (0 or empty means using the default
   * time of 24h which can also be overwritten by the -bantime startup argument)
   * @param {boolean} [absolute] If set, the bantime must be an absolute timestamp
   * expressed in UNIX epoch time
   *
   * @link https://developer.bitcoin.org/reference/rpc/setban.html
   * @return {Promise}
   */
  setBan(
    subnet: string,
    command: 'add' | 'remove',
    bantime = 0,
    absolute = false,
  ): Promise<null> {
    return this.call<null>('setban', [subnet, command, bantime, absolute]);
  }

  /**
   * Disable/enable all p2p network activity.
   *
   * @param {boolean} state true to enable networking, false to disable
   *
   * @link https://developer.bitcoin.org/reference/rpc/setnetworkactive.html
   * @return {Promise} The value that was passed in
   */
  setNetworkActive(state: boolean): Promise<boolean> {
    return this.call<boolean>('setnetworkactive', [state]);
  }
}
