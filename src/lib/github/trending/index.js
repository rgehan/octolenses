import hash from 'object-hash';

import { client } from '../../../providers/github/fetchers/client';
import { Cache } from '../../../lib/cache';

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

  const cacheKey = `github.trending.${hash(query)}`;
  const { items: repos } = await Cache.remember(cacheKey, 60 * 60, () =>
    client({
      endpoint: '/search/repositories',
      qs: `per_page=100&q=${query}&sort=stars&order=desc`,
      token,
    })
  );

  return repos;
};
