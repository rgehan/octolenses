import { DropdownPredicate, PredicateType } from '../../types';

export const type: DropdownPredicate = {
  name: 'type',
  label: 'Type',
  type: PredicateType.DROPDOWN,
  choices: [{ value: 'pr', label: 'PRs' }, { value: 'issue', label: 'Issues' }],
  operators: [],
  serialize: ({ value }) => `type:${value}`,
};
