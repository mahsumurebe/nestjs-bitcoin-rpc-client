export interface PeerInfoInterface {
  /**
   * Peer index
   * @type {number}
   */
  id: number;

  /**
   * (host:port) The IP address and port of the peer
   *
   * @type {string}
   */
  addr: string;

  /**
   * (ip:port) Bind address of the connection to the peer
   *
   * @type {string}
   */
  addrbind: string;

  /**
   * (ip:port) Local address as reported by the peer
   *
   * @type {string}
   */
  addrlocal: string;

  /**
   * Network (ipv4, ipv6, or onion) the peer connected through
   *
   * @type {string}
   */
  network: string;

  /**
   * The AS in the BGP route to the peer used for diversifying
   * peer selection (only available if the asmap config flag is set)
   * @type {number}
   */
  mapped_as: number;

  /*
   * The services offered
   *
   * @type {string}
   */
  services: string;

  /**
   * the service name if it is recognised
   * the services offered, in human-readable form
   *
   * @type {string[]}
   */
  servicesnames: string[];
  /**
   * Whether peer has asked us to relay transactions to it
   *
   * @type {boolean}
   */
  relaytxes: boolean;
  /**
   * The UNIX epoch time of the last send
   *
   * @type {number}
   */
  lastsend: number;
  /**
   * The UNIX epoch time of the last receive
   *
   * @type {number}
   */
  lastrecv: number;
  /**
   * The UNIX epoch time of the last valid transaction received from this peer
   *
   * @type {number}
   */
  last_transaction: number;
  /**
   * The UNIX epoch time of the last block received from this peer
   *
   * @type {number}
   */
  last_block: number;
  /**
   * The total bytes sent
   * @type {number}
   */
  bytessent: number;
  /**
   * The total bytes received
   * @type {number}
   */
  bytesrecv: number;
  /**
   * The UNIX epoch time of the connection
   *
   * @type {number}
   */
  conntime: number;
  /**
   * The time offset in seconds
   *
   * @type {number}
   */
  timeoffset: number;
  /**
   * ping time (if available)
   *
   * @type {number}
   */
  pingtime: number;
  /**
   * minimum observed ping time (if any at all)
   *
   * @type {number}
   */
  minping: number;
  /**
   * ping wait (if non-zero)
   *
   * @type {number}
   */
  pingwait: number;
  /**
   * The peer version, such as 70001
   *
   * @type {number}
   */
  version: number;
  /**
   * The string version
   *
   * @type {string}
   */
  subver: string;
  /**
   * Inbound (true) or Outbound (false)
   *
   * @type {boolean}
   */
  inbound: boolean;
  /**
   * Whether connection was due to addnode/-connect or if it was an automatic/inbound connection
   *
   * @type {boolean}
   */
  addnode: boolean;
  /**
   * Type of connection:
   * outbound-full-relay (default automatic connections),
   * block-relay-only (does not relay transactions or addresses),
   * inbound (initiated by the peer),
   * manual (added via addnode RPC or -addnode/-connect configuration options),
   * addr-fetch (short-lived automatic connection for soliciting addresses),
   * feeler (short-lived automatic connection for testing addresses).
   * Please note this output is unlikely to be stable in upcoming releases as we iterate to
   * best capture connection behaviors.
   * (DEPRECATED, returned only if the config option -deprecatedrpc=getpeerinfo_addnode is passed)
   *
   * @type {string}
   */
  connection_type: string;
  /**
   * The starting height (block) of the peer
   * @type {number}
   */
  startingheight: number;
  /**
   * The ban score (DEPRECATED, returned only if config option -deprecatedrpc=banscore is passed)
   * @type {number}
   */
  banscore: number;
  /**
   * The last header we have in common with this peer
   * @type {number}
   */
  synced_headers: number;
  /**
   * The last block we have in common with this peer
   * @type {number}
   */
  synced_blocks: number;
  /**
   * The heights of blocks we're currently asking from this peer
   *
   * @type {number[]}
   */
  inflight: number[];
  /**
   * Whether the peer is whitelisted with default permissions
   * (DEPRECATED, returned only if config option -deprecatedrpc=whitelisted is passed)
   *
   * @type {boolean}
   */
  whitelisted: boolean;
  /**
   * Any special permissions that have been granted to this peer
   * (string) bloomfilter (allow requesting BIP37 filtered blocks and transactions),
   * noban (do not ban for misbehavior; implies download),
   * forcerelay (relay transactions that are already in the mempool; implies relay),
   * relay (relay even in -blocksonly mode, and unlimited transaction announcements),
   * mempool (allow requesting BIP35 mempool contents),
   * download (allow getheaders during IBD, no disconnect after maxuploadtarget limit),
   * addr (responses to GETADDR avoid hitting the cache and contain random records with the most up-to-date info).
   *
   * @type {string[]}
   */
  permissions: string[];
  /**
   * The minimum fee rate for transactions this peer accepts
   * @type {number}
   */
  minfeefilter: number;
  /*
   * The total bytes sent aggregated by message type
   *
   * @type {object}
   */
  bytessent_per_msg: {
    /**
     * When a message type is not listed in this json object, the bytes sent are 0.
     * Only known message types can appear as keys in the object.
     *
     * @type {number}
     */
    msg: number;
  };
  /*
   * The total bytes received aggregated by message type
   *
   * @type {object}
   */
  bytesrecv_per_msg: {
    /**
     * When a message type is not listed in this json object, the bytes received are 0.
     * Only known message types can appear as keys in the object and all bytes received
     * of unknown message types are listed under '*other*'.
     *
     * @type {number}
     */
    msg: number;
  };
}
