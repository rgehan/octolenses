import { chain, get, omit, map, pick } from 'lodash';

/*
 * GraphQL
 */

export const formatGraphqlResponse = filter =>
  chain(filter)
    .get('data.search.edges')
    .map('node')
    .map(issue => ({
      ...omit(issue, ['commits', '__typename']),
      type: issue.__typename,
      status: extractGraphqlStatus(issue),
      labels: extractGraphqlLabels(issue),
    }))
    .value();

const extractGraphqlStatus = issue =>
  get(issue, 'commits.edges.0.node.commit.status.state');

const extractGraphqlLabels = issue =>
  chain(issue)
    .get('labels.edges')
    .map('node')
    .value();

/*
 * REST
 */

export const formatRestResponse = response => {
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
  }));
};

const extractRestLabels = issue =>
  map(issue.labels, label => pick(label, ['color', 'name']));

const parseRestRepoName = url =>
  chain(url)
    .split('/')
    .slice(-2)
    .join('/')
    .value();

const parseRestRepoUrl = apiUrl =>
  apiUrl.replace('api.github.com/repos/', 'github.com/');
