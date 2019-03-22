import { find } from 'lodash';

import { Provider } from '../types';
import { Filter } from '../../store/filters';
import {
  makeSimplePredicate,
  mergeStatus,
  review,
  status,
  type,
} from './predicates';
import { fetchFilter } from './fetchers';
import { Settings } from './components/Settings';
import { IssueCard } from './components/IssueCard';

class GithubProvider implements Provider {
  public id = 'github';
  public label = 'GitHub';
  public settingsComponent = Settings;
  public cardComponent = IssueCard;

  public getAvailablePredicates() {
    return [
      makeSimplePredicate({
        name: 'assignee',
        label: 'Assignee',
        placeholder: 'USERNAME',
      }),
      makeSimplePredicate({
        name: 'author',
        label: 'Author',
        placeholder: 'USERNAME',
      }),
      makeSimplePredicate({
        name: 'label',
        label: 'Label',
        placeholder: 'LABEL',
      }),
      makeSimplePredicate({
        name: 'mentions',
        label: 'Mentions',
        placeholder: 'USERNAME',
      }),
      makeSimplePredicate({
        name: 'team',
        label: 'Team',
        placeholder: 'ORGNAME/TEAMNAME',
      }),
      makeSimplePredicate({
        name: 'commenter',
        label: 'Commenter',
        placeholder: 'USERNAME',
      }),
      makeSimplePredicate({
        name: 'involves',
        label: 'Involves',
        placeholder: 'USERNAME',
      }),
      makeSimplePredicate({
        name: 'milestone',
        label: 'Milestone',
        placeholder: 'MILESTONE',
      }),
      makeSimplePredicate({
        name: 'user',
        label: 'User',
        placeholder: 'USERNAME',
      }),
      makeSimplePredicate({
        name: 'repo',
        label: 'Repository',
        placeholder: 'USERNAME/REPOSITORY',
      }),
      makeSimplePredicate({
        name: 'org',
        label: 'Organization',
        placeholder: 'ORGNAME',
      }),
      makeSimplePredicate({
        name: 'reviewed-by',
        label: 'Reviewed by',
        placeholder: 'USERNAME',
      }),
      makeSimplePredicate({
        name: 'review-requested',
        label: 'Requested Reviewer (User)',
        placeholder: 'USERNAME',
      }),
      makeSimplePredicate({
        name: 'team-review-requested',
        label: 'Requested Reviewer (Team)',
        placeholder: 'ORGNAME/TEAMNAME',
      }),
      type,
      status,
      mergeStatus,
      review,
    ];
  }

  public findPredicate(name: string) {
    return find(this.getAvailablePredicates(), { name });
  }

  public async fetchFilter(filter: Filter, settings: any): Promise<any[]> {
    return fetchFilter(filter, settings);
  }
}

export const github = new GithubProvider();
