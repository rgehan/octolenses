import { capitalize } from 'lodash';

import { Predicate, PredicateType } from '../../types';
import { mergeStatus } from './mergeStatus';
import { review } from './review';
import { status } from './status';
import { type } from './type';

interface SimplePredicatePayload {
  name: string;
  placeholder: string;
  label?: string;
}

/**
 * Makes a simple text predicate
 * @param options Options configuring the predicate
 */
export const makeSimplePredicate = ({
  name,
  label,
  placeholder,
}: SimplePredicatePayload): Predicate => ({
  name,
  label: label || capitalize(name),
  placeholder,
  type: PredicateType.TEXT,
  serialize: ({ value, negated }) => `${negated ? '-' : ''}${name}:${value}`,
});

export const availablePredicates: Predicate[] = [
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
