import { chain, get } from 'lodash';

import { Filter } from '../../../store/filters';
import { JiraSettings, JiraResource } from '..';

export async function fetchFilter(
  filter: Filter,
  settings: JiraSettings,
  resource: JiraResource
): Promise<any[]> {
  const site = resource.id;
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
