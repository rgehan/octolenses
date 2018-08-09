import { chain, castArray } from 'lodash';

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

export const fetchFilter = async predicates => {
  const query = chain(predicates)
    .toPairs()
    .flatMap(([key, values]) =>
      castArray(values).map(value => [key, `"${value}"`])
    )
    .map(pair => pair.join('%3A'))
    .join('+')
    .value();

  const { items: issues } = await github({
    endpoint: 'search/issues',
    qs: query,
  });

  return issues;
};
