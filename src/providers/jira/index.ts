import { find } from 'lodash';

import { Provider } from '../types';
import { availablePredicates } from './predicates';
import { Settings } from './components/Settings';
import { IssueCard } from './components/IssueCard';
import { fetchFilter } from './fetchers';

class JiraProvider implements Provider {
  public id = 'jira';
  public label = 'Jira';
  public settingsComponent = Settings;
  public cardComponent = IssueCard;

  public fetchFilter = fetchFilter;

  public getAvailablePredicates = () => availablePredicates;

  public findPredicate(name: string) {
    return find(this.getAvailablePredicates(), { name });
  }
}

export const jira = new JiraProvider();
