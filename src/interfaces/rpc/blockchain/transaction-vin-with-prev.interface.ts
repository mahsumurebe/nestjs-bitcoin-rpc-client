import { TransactionVInInterface } from '../index';

export interface TransactionVinWithPrevInterface
  extends TransactionVInInterface {
  prevout: {
    hash: string;
    n: number;
  };
}
