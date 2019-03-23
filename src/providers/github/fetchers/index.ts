import { Filter } from '../../../store/filters';
import { search as graphqlSearch } from './graphql/search';
import { search as restSearch } from './rest/search';
import { GithubSettings } from '..';

export const fetchFilter = async (filter: Filter, settings: GithubSettings) => {
  if (settings.token) {
    return graphqlSearch(filter, settings.token);
  }

  return restSearch(filter);
};
