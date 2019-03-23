import { find, chain } from 'lodash';

import { Provider, PredicateType } from '../types';
import { Filter } from '../../store/filters';
import { makeSimplePredicate } from './predicates';
import { Settings } from './components/Settings';
import { IssueCard } from './components/IssueCard';

class JiraProvider implements Provider {
  public id = 'jira';
  public label = 'Jira';
  public settingsComponent = Settings;
  public cardComponent = IssueCard;

  public getAvailablePredicates() {
    return [
      makeSimplePredicate({ name: 'project', placeholder: 'MYPROJECT' }),
      makeSimplePredicate({ name: 'status', placeholder: 'open/closed' }),
      makeSimplePredicate({ name: 'resolution', placeholder: '' }),
      makeSimplePredicate({ name: 'sprint', placeholder: '' }),
      makeSimplePredicate({ name: 'assignee', placeholder: '' }),
    ];
  }

  public findPredicate(name: string) {
    return find(this.getAvailablePredicates(), { name });
  }

  public async fetchFilter(filter: Filter, settings: any): Promise<any[]> {
    const site = '<site-id>'; // TODO
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
}

export const jira = new JiraProvider();
