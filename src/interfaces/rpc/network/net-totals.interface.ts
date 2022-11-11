import { NetTotalsUploadTargetInterface } from './net-totals-upload-target.interface';

export interface NetTotalsInterface {
  /**
   * Total bytes received
   *
   * @type {number}
   */
  totalbytesrecv: number;
  /**
   * Total bytes sent
   *
   * @type {number}
   */
  totalbytessent: number;
  /**
   * Current UNIX epoch time in milliseconds
   *
   * @type {number}
   */
  timemillis: number;
  /**
   * Upload Target
   *
   * @type {NetTotalsUploadTargetInterface}
   */
  uploadtarget: NetTotalsUploadTargetInterface[];
}
