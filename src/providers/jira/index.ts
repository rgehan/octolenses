import { find } from 'lodash';

import { AbstractProvider } from '../AbstractProvider';
import { availablePredicates } from './predicates';
import { Settings } from './components/Settings';
import { IssueCard } from './components/IssueCard';
import { fetchFilter } from './fetchers';

class JiraProvider extends AbstractProvider {
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
