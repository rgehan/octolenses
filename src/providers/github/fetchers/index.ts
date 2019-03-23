import { Filter } from '../../../store/filters';
import { graphqlFetcher } from './graphqlFetcher';
import { restFetcher } from './restFetcher';
import { GithubSettings } from '..';

export const fetchFilter = async (filter: Filter, settings: GithubSettings) => {
  if (settings.token) {
    return graphqlFetcher(filter, settings.token);
  }

  return restFetcher(filter);
};
