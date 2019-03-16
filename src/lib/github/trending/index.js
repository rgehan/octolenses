import { client } from '../../../providers/github/fetchers/client';

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

  const { items: repos } = await client({
    endpoint: '/search/repositories',
    qs: `per_page=100&q=${query}&sort=stars&order=desc`,
    token,
  });

  return repos;
};
