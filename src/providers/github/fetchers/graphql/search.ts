import { chain, omit, map } from 'lodash';

import { Cache } from '../../../../lib/cache';
import { Filter } from '../../../../store/filters';
import { client } from '../client';
import { makeQuery } from './query';
import {
  extractConflictStatus,
  extractGraphqlLabels,
  extractGraphqlStatus,
} from './utils';

/**
 * Fetch a filter using the shiny GraphQL API
 * @param {object} options.filter
 */
export const search = async (filter: Filter, token: string) => {
  const filterString = chain(filter.predicates)
    .map(predicate => filter.serializePredicate(predicate))
    .join(' ')
    .replace(/"/g, '\\"')
    .value();

  const cacheKey = `github.graphql.${filter.hash}`;

  const response = await Cache.remember(cacheKey, 60, async () =>
    client({
      endpoint: '/graphql',
      method: 'POST',
      body: JSON.stringify({ query: makeQuery(filterString) }),
      token,
    })
  );

  return formatResponse(response);
};

/**
 * Format a graphql response so that it's easy to use
 */
export const formatResponse = (response: any) => {
  const issues = map(response.data.search.edges, 'node');
  return issues.map(issue => ({
    ...omit(issue, ['commits', '__typename', 'mergeable']),
    type: issue.__typename,
    status: extractGraphqlStatus(issue),
    labels: extractGraphqlLabels(issue),
    conflicting: extractConflictStatus(issue),
  }));
};
