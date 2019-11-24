import { chain, get } from 'lodash';
import hash from 'object-hash';

import { IJiraResource, IJiraSettings } from '..';
import { Cache } from '../../../lib/cache';
import { Filter } from '../../../store/filters';

export async function fetchFilter(
  filter: Filter,
  settings: IJiraSettings,
  resource: IJiraResource
): Promise<any[]> {
  const site = resource.id;
  const token = get(settings, 'auth.access_token');

  const filterString = chain(filter.predicates)
    .map(predicate => filter.serializePredicate(predicate))
    .map(encodeURIComponent)
    .join('+AND+')
    .value();

  const url = `https://api.atlassian.com/ex/jira/${site}/rest/api/2/search?jql=${filterString}`;

  const cacheKey = `jira.filter.${hash(url)}`;

  const { issues } = await Cache.remember(cacheKey, 60, () =>
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json())
  );

  return issues;
}
