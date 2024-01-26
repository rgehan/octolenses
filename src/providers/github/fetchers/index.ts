import { IGithubSettings } from '..';
import { Filter } from '../../../store/filters';
import { search as graphqlSearch } from './graphql/search';
import { search as restSearch } from './rest/search';

export const fetchFilter = async (
  filter: Filter,
  settings: IGithubSettings
) => {
  if (settings.token) {
    return graphqlSearch(filter, settings.token);
  }

  return restSearch(filter);
};
