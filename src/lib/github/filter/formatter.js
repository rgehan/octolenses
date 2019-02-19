import { chain, get, omit } from 'lodash';

export const formatFilter = filter =>
  chain(filter)
    .get('data.search.edges')
    .map('node')
    .map(issue => ({
      ...omit(issue, ['commits', '__typename']),
      type: issue.__typename,
      status: extractStatus(issue),
      labels: extractLabels(issue),
    }))
    .value();

const extractStatus = issue =>
  get(issue, 'commits.edges.0.node.commit.status.state');

const extractLabels = issue =>
  chain(issue)
    .get('labels.edges')
    .map('node')
    .value();
