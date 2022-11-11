export interface ListBannedInterface {
  /**
   * The banned address.
   *
   * @type {string}
   */
  address: string;
  /**
   * The time (in seconds since Jan 1 1970 GMT) until the address is banned.
   *
   * @type {number}
   */
  banned_until: number;
  /**
   * The time (in seconds since Jan 1 1970 GMT) when the ban was created.
   *
   * @type {number}
   */
  ban_created: number;
}
