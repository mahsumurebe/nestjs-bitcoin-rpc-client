import { JRPCErrorInline } from '@mahsumurebe/jrpc-client/lib/core/interfaces/jrpc-error-response-body.interface';

export interface ImportDescriptorInterface {
  success: boolean;
  warnings: string[];
  error?: JRPCErrorInline;
}
