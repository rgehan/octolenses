import { github } from './github';
import { jira } from './jira';
import { ProviderType } from './types';

export { AbstractProvider } from './AbstractProvider';
export * from './types';

export const providers = {
  [ProviderType.GITHUB]: github,
  [ProviderType.JIRA]: jira,
};
