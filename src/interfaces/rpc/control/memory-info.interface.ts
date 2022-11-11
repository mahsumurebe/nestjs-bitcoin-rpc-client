export interface MemoryInfoInterface {
  /**
   * Information about locked memory manager
   * @type {object}
   */
  locked: {
    used: number; // Number of bytes used
    free: number; // Number of bytes available in current arenas
    total: number; // Total number of bytes managed
    locked: number; // Amount of bytes that succeeded locking. If this number is smaller than total, locking pages failed at some point and key data could be swapped to disk.
    chunks_used: number; // Number allocated chunks
    chunks_free: number; // Number unused chunks
  };
}
