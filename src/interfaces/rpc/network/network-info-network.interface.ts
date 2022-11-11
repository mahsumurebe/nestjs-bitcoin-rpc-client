export interface NetworkInfoNetworkInterface {
  /**
   * network (ipv4, ipv6 or onion)
   *
   * @type {string}
   */
  name: string;
  /**
   * is the network limited using -onlynet?
   *
   * @type {boolean}
   */
  limited: boolean;
  /**
   * is the network reachable?
   *
   * @type {boolean}
   */
  reachable: boolean;
  /**
   * ("host:port") the proxy that is used for this network, or empty if none
   *
   * @type {string}
   */
  proxy: string;
  /**
   * Whether randomized credentials are used
   *
   * @type {boolean}
   */
  proxy_randomize_credentials: boolean;
}
