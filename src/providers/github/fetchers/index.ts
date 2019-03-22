import { Filter } from '../../../store/filters';
import { graphqlFetcher } from './graphqlFetcher';
import { restFetcher } from './restFetcher';

export const fetchFilter = async (filter: Filter, settings: any) => {
  if (settings.token) {
    return graphqlFetcher(filter, settings.token);
  }

  return restFetcher(filter);
};
