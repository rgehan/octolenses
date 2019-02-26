import { chain } from 'lodash';

import { makeQuery } from './graphql';
import { formatGraphqlResponse, formatRestResponse } from './formatter';
import { githubClient } from '../client';
import { serializePredicatePayload } from '../../filters';

/**
 * Fetch a filter using the proper strategy, depending on
 * whether the user has set a token or not.
 * @param {object} options.filter
 * @param {string} options.token
 */
export const fetchFilter = async ({ filter, token }) => {
  return token
    ? fetchFilterWithGraphqlAPI({ filter, token })
    : fetchFilterWithRestAPI({ filter });
};

/**
 * Fetcha filter using the shiny GraphQL API
 * @param {object} options.filter
 */
const fetchFilterWithGraphqlAPI = async ({ filter, token }) => {
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

  return formatGraphqlResponse(response);
};

/**
 * Fetch a filter on the old REST API. This is only supposed to be
 * used when the user has not set a token. This won't return all the
 * value we need (for example there are no build status).
 * @param {object} options.filter
 */
const fetchFilterWithRestAPI = async ({ filter }) => {
  const filterString = chain(filter.predicates)
    .map(serializePredicatePayload)
    .map(encodeURIComponent)
    .join('+')
    .value();

  const { items: issues = [] } = await githubClient({
    endpoint: '/search/issues',
    qs: `per_page=100&q=${filterString}`,
  });

  return formatRestResponse(issues);
};
