import { github } from './github';
import { ProviderType } from './types';

export * from './types';

export const providers = {
  [ProviderType.GITHUB]: github,
};
