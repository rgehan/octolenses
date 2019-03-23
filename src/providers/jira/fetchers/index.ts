import { chain, get } from 'lodash';

import { Filter } from '../../../store/filters';
import { JiraSettings } from '..';

export async function fetchFilter(
  filter: Filter,
  settings: JiraSettings
): Promise<any[]> {
  const site = '6345a5ad-6568-4d1a-8862-cfb76845117d'; // TODO
  const token = get(settings, 'auth.access_token');

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
