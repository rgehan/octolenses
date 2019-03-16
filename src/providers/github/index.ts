import { find } from 'lodash';

import { Provider } from '../types';
import {
  makeSimplePredicate,
  mergeStatus,
  review,
  status,
  type,
} from './predicates';
import { Filter } from '../../store/filters';
import { fetchFilter } from './fetchers';

class GithubProvider implements Provider {
  public label = 'GitHub';

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

  findPredicate(name: string) {
    return find(this.getAvailablePredicates(), { name });
  }

  // TODO Not use any
  public async fetchFilter(filter: Filter): Promise<any[]> {
    return fetchFilter(filter);
  }
}

export const github = new GithubProvider();
