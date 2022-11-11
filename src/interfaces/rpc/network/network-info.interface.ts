import {
  NetworkInfoLocalAddressInterface,
  NetworkInfoNetworkInterface,
} from '../index';

export interface NetworkInfoInterface {
  /**
   * the server version
   *
   * @type {number}
   */
  version: number;
  /**
   * the server subversion string
   *
   * @type {string}
   */
  subversion: string;
  /**
   * the protocol version
   *
   * @type {number}
   */
  protocolversion: number;
  /**
   * the services we offer to the network
   *
   * @type {string}
   */
  localservices: string;
  /**
   * the services we offer to the network, in human-readable form
   *
   * @type {number}
   */
  localservicesnames: string[];
  /**
   * true if transaction relay is requested from peers
   *
   * @type {boolean}
   */
  localrelay: boolean;
  /**
   * the time offset
   *
   * @type {number}
   */
  timeoffset: number;
  /**
   * the total number of connections
   *
   * @type {number}
   */
  connections: number;
  /**
   * the number of inbound connections
   *
   * @type {number}
   */
  connections_in: number;
  /**
   * the number of outbound connections
   *
   * @type {number}
   */
  connections_out: number;
  /**
   * whether p2p networking is enabled
   *
   * @type {boolean}
   */
  networkactive: boolean;
  /**
   * information per network
   *
   * @type {number}
   */
  networks: NetworkInfoNetworkInterface[];
  /**
   * minimum relay fee for transactions in BTC/kB
   *
   * @type {number}
   */
  relayfee: number;
  /**
   * minimum fee increment for mempool limiting or BIP 125 replacement in BTC/kB
   *
   * @type {number}
   */
  incrementalfee: number;
  /**
   * list of local addresses
   *
   * @type {number}
   */
  localaddresses: NetworkInfoLocalAddressInterface[];
  /**
   * any network and blockchain warnings
   *
   * @type {number}
   */
  warnings: string;
}
