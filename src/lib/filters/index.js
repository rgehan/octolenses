import { find, capitalize, sortBy } from 'lodash';

import { type } from './type';
import { status } from './status';

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
    type,
    status,
  ],
  'label'
);

export const findPredicate = type => find(PREDICATES, { name: type });

export const serializePredicatePayload = ({ type, ...payload }) => {
  const predicate = findPredicate(type);
  return predicate.serialize(payload);
};
