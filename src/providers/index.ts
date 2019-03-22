import { ProviderType } from './types';
import { github } from './github';
import { jira } from './jira';

export * from './types';

export const providers = {
  [ProviderType.GITHUB]: github,
  [ProviderType.JIRA]: jira,
};
