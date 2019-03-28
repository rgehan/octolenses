import { chain, omit, get } from 'lodash';

import { Filter } from '../../../../store/filters';
import { makeQuery } from './query';
import { client } from '../client';
import { Cache } from '../../../../lib/cache';

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
export const formatResponse = (response: any) =>
  chain(response)
    .get('data.search.edges')
    .map('node')
    .map(issue => ({
      ...omit(issue, ['commits', '__typename']),
      type: issue.__typename,
      status: extractGraphqlStatus(issue),
      labels: extractGraphqlLabels(issue),
    }))
    .value();

const extractGraphqlStatus = (issue: any) =>
  get(issue, 'commits.edges.0.node.commit.status.state');

const extractGraphqlLabels = (issue: any) =>
  chain(issue)
    .get('labels.edges')
    .map('node')
    .value();
