const buildQuery = (language, date) => {
  let query = `created:>${date}`;

  if (language !== null) {
    query += ` and language:${language}`;
  }

  return query;
};

/**
 * Fetch the trending repositories from GitHub
 * @param {*} language What programming language the user is interested in
 * @param {*} date From which date
 */
const fetchRepos = async (language, date) => {
  const query = buildQuery(language, date);
  const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`;

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Github Trending Chrome Extension',
    },
  });

  const { items: repos } = await data.json();

  return repos;
};

module.exports = { fetchRepos };
