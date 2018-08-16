import { chain, pickBy, get } from 'lodash';

import { InvalidCredentials, RateLimitError, NeedTokenError } from '../errors';
import { serializePredicatePayload } from './filters';

const github = async ({ endpoint, qs, token }) => {
  const url = `https://api.github.com/${endpoint}?per_page=100&q=${qs || ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: pickBy({
      'User-Agent': 'OctoLenses Github Dashboard',
      Authorization: token && `Bearer ${token}`,
    }),
  });

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  return await response.json();
};

const handleErrorResponse = async response => {
  const status = response.status;
  const { message = '', errors = [] } = await response.json();

  const firstErrorMessage = get(errors, '0.message', '');

  if (status === 401 && message.includes('Bad credentials')) {
    throw new InvalidCredentials();
  }

  if (status === 403 && message.includes('API rate limit')) {
    throw new RateLimitError();
  }

  if (
    status === 422 &&
    firstErrorMessage.includes('do not exist or you do not have permission')
  ) {
    throw new NeedTokenError();
  }
};

/**
 * Fetch the trending repositories from GitHub
 * @param {*} language What programming language the user is interested in
 * @param {*} date From which date
 */
export const fetchTrendingRepos = async ({ language, date, token }) => {
  let query = `created:>${date}`;
  if (language !== null) {
    query += ` and language:${language}`;
  }

  const { items: repos } = await github({
    endpoint: 'search/repositories',
    qs: `${query}&sort=stars&order=desc`,
    token,
  });

  return repos;
};

export const fetchFilter = async ({ filter, token }) => {
  const query = chain(filter.predicates)
    .map(serializePredicatePayload)
    .join('+')
    .value();

  const { items: issues = [] } = await github({
    endpoint: 'search/issues',
    qs: query,
    token,
  });

  return issues;
};
