import { Filter } from '../../../store/filters';
import { graphqlFetcher } from './graphqlFetcher';
import { restFetcher } from './restFetcher';

export const fetchFilter = async (filter: Filter, token?: string) => {
  if (token) {
    return graphqlFetcher(filter, token);
  }

  return restFetcher(filter);
};
