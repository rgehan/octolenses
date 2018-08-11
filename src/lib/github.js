import { chain } from 'lodash';

import { serializePredicatePayload } from './filters';
import { TOKEN } from '../config';

const github = async ({ endpoint, qs }) => {
  const url = `https://api.github.com/${endpoint}?q=${qs || ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Github Trending Chrome Extension',
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return await response.json();
};

/**
 * Fetch the trending repositories from GitHub
 * @param {*} language What programming language the user is interested in
 * @param {*} date From which date
 */
export const fetchTrendingRepos = async (language, date) => {
  let query = `created:>${date}`;
  if (language !== null) {
    query += ` and language:${language}`;
  }

  const { items: repos } = await github({
    endpoint: 'search/repositories',
    qs: `${query}&sort=stars&order=desc`,
  });

  return repos;
};

export const fetchFilter = async ({ predicates }) => {
  const query = chain(predicates)
    .map(serializePredicatePayload)
    .join('+')
    .value();

  const { items: issues } = await github({
    endpoint: 'search/issues',
    qs: query,
  });

  return issues;
};
