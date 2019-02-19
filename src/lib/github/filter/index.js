import { chain } from 'lodash';

import { makeQuery } from './graphql';
import { formatFilter } from './formatter';
import { githubClient } from '../client';
import { serializePredicatePayload } from '../../filters';

export const fetchFilter = async ({ filter, token }) => {
  const filterString = chain(filter.predicates)
    .map(serializePredicatePayload)
    .join(' ')
    .value();

  const response = await githubClient({
    endpoint: '/graphql',
    method: 'POST',
    body: JSON.stringify({ query: makeQuery(filterString) }),
    token,
  });

  return formatFilter(response);
};
