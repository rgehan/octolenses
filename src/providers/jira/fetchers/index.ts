import { chain } from 'lodash';

import { Filter } from '../../../store/filters';

export async function fetchFilter(
  filter: Filter,
  settings: any
): Promise<any[]> {
  const site = '6345a5ad-6568-4d1a-8862-cfb76845117d'; // TODO
  const token = settings.auth.access_token;

  const filterString = chain(filter.predicates)
    .map(predicate => filter.serializePredicate(predicate))
    .map(encodeURIComponent)
    .join('+AND+')
    .value();

  const url = `https://api.atlassian.com/ex/jira/${site}/rest/api/2/search?jql=${filterString}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const { issues } = await response.json();

  return issues;
}
