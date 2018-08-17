import { find, capitalize, sortBy } from 'lodash';

import { type } from './type';
import { status } from './status';
import { review } from './review';

const makeSimplePredicate = (name, label) => ({
  name,
  label: label || capitalize(name),
  type: 'text',
  serialize: ({ value, negated }) => `${negated ? '-' : ''}${name}:"${value}"`,
});

export const PREDICATES = sortBy(
  [
    makeSimplePredicate('assignee'),
    makeSimplePredicate('author'),
    makeSimplePredicate('label'),
    makeSimplePredicate('mentions'),
    makeSimplePredicate('team'),
    makeSimplePredicate('commenter'),
    makeSimplePredicate('involves'),
    makeSimplePredicate('milestone'),
    makeSimplePredicate('repo', 'Repository'),
    makeSimplePredicate('user'),
    makeSimplePredicate('org', 'Organization'),
    makeSimplePredicate('reviewed-by', 'Reviewed by'),
    makeSimplePredicate('review-requested', 'Requested Reviewer (User)'),
    makeSimplePredicate('team-review-requested', 'Requested Reviewer (Team)'),
    type,
    status,
    review,
  ],
  'label'
);

export const findPredicate = type => find(PREDICATES, { name: type });

export const serializePredicatePayload = ({ type, ...payload }) => {
  const predicate = findPredicate(type);
  return predicate.serialize(payload);
};
