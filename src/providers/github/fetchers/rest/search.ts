import { chain, map, pick } from 'lodash';

import { Cache } from '../../../../lib/cache';
import { Filter } from '../../../../store/filters';
import { IssueStatus } from '../../components/IssueCard/types';
import { client } from '../client';

/**
 * Fetch a filter on the old REST API. This is only supposed to be
 * used when the user has not set a token. This won't return all the
 * value we need (for example there are no build status).
 * @param {object} options.filter
 */
export const search = async (filter: Filter) => {
  const filterString = chain(filter.predicates)
    .map(predicate => filter.serializePredicate(predicate))
    .map(encodeURIComponent)
    .join('+')
    .value();

  const cacheKey = `github.rest.${filter.hash}`;

  const { items: issues = [] } = await Cache.remember(cacheKey, 60, async () =>
    client({
      endpoint: '/search/issues',
      qs: `per_page=100&q=${filterString}`,
    })
  );

  return formatResponse(issues);
};

/**
 * Format a REST response so that it's compatible with the GraphQL one
 */
export const formatResponse = (response: any) => {
  return map(response, issue => ({
    url: issue.html_url,
    title: issue.title,
    number: issue.number,
    state: issue.state,
    createdAt: issue.created_at,
    author: {
      url: issue.user.html_url,
      login: issue.user.login,
      avatarUrl: issue.user.avatar_url,
    },
    repository: {
      nameWithOwner: parseRestRepoName(issue.repository_url),
      url: parseRestRepoUrl(issue.repository_url),
    },
    labels: extractRestLabels(issue),
    type: issue.pull_request ? 'PullRequest' : 'Issue',
    comments: { totalCount: issue.comments },
    reviews: { totalCount: 0 },
    status: IssueStatus.UNKNOWN,
  }));
};

const extractRestLabels = (issue: any) =>
  map(issue.labels, label => pick(label, ['color', 'name']));

const parseRestRepoName = (url: string) =>
  chain(url)
    .split('/')
    .slice(-2)
    .join('/')
    .value();

const parseRestRepoUrl = (apiUrl: string) =>
  apiUrl.replace('api.github.com/repos/', 'github.com/');
