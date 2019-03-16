import { DropdownPredicate, PredicateType } from '../../types';

export const type: DropdownPredicate = {
  name: 'type',
  label: 'Type',
  type: PredicateType.DROPDOWN,
  choices: [{ value: 'pr', label: 'PRs' }, { value: 'issue', label: 'Issues' }],
  negatable: false,
  serialize: ({ value, negated }) => `${negated ? '-' : ''}type:${value}`,
};
