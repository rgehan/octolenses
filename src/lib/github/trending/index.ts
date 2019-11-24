import hash from 'object-hash';

import { Cache } from '../../../lib/cache';
import { client } from '../../../providers/github/fetchers/client';

interface IFetchTrendingReposParams {
  language: string;
  date: string;
  token?: string;
}

/**
 * Fetch the trending repositories from GitHub
 * @param language What programming language the user is interested in
 * @param date From which date
 * @param token Github token of the user
 */
export const fetchTrendingRepos = async ({
  language,
  date,
  token,
}: IFetchTrendingReposParams) => {
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
