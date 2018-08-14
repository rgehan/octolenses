import { chain, omitBy, isNil } from 'lodash';

import { serializePredicatePayload } from './filters';

const github = async ({ endpoint, qs, token }) => {
  const url = `https://api.github.com/${endpoint}?per_page=100&q=${qs || ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: omitBy(
      {
        'User-Agent': 'Github Trending Chrome Extension',
        Authorization: token && `Bearer ${token}`,
      },
      isNil
    ),
  });

  return await response.json();
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
