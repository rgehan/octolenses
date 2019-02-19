import { find, capitalize, sortBy } from 'lodash';

import { type } from './type';
import { status } from './status';
import { review } from './review';

const makeSimplePredicate = (name, { label, placeholder }) => ({
  name,
  label: label || capitalize(name),
  placeholder,
  type: 'text',
  serialize: ({ value, negated }) =>
    `${negated ? '-' : ''}${name}:\\"${value}\\"`,
});

export const PREDICATES = sortBy(
  [
    makeSimplePredicate('assignee', { placeholder: 'USERNAME' }),
    makeSimplePredicate('author', { placeholder: 'USERNAME' }),
    makeSimplePredicate('label', { placeholder: 'LABEL' }),
    makeSimplePredicate('mentions', { placeholder: 'USERNAME' }),
    makeSimplePredicate('team', { placeholder: 'ORGNAME/TEAMNAME' }),
    makeSimplePredicate('commenter', { placeholder: 'USERNAME' }),
    makeSimplePredicate('involves', { placeholder: 'USERNAME' }),
    makeSimplePredicate('milestone', { placeholder: 'MILESTONE' }),
    makeSimplePredicate('user', { placeholder: 'USERNAME' }),
    makeSimplePredicate('repo', {
      placeholder: 'USERNAME/REPOSITORY',
      label: 'Repository',
    }),
    makeSimplePredicate('org', {
      placehodler: 'ORGNAME',
      label: 'Organization',
    }),
    makeSimplePredicate('reviewed-by', {
      placeholder: 'USERNAME',
      label: 'Reviewed by',
    }),
    makeSimplePredicate('review-requested', {
      placeholder: 'USERNAME',
      label: 'Requested Reviewer (User)',
    }),
    makeSimplePredicate('team-review-requested', {
      placeholder: 'ORGNAME/TEAMNAME',
      label: 'Requested Reviewer (Team)',
    }),
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
