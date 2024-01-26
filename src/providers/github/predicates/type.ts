import { IDropdownPredicate, PredicateType } from '../../types';

export const type: IDropdownPredicate = {
  name: 'type',
  label: 'Type',
  type: PredicateType.DROPDOWN,
  choices: [
    { value: 'pr', label: 'PRs' },
    { value: 'issue', label: 'Issues' },
  ],
  operators: [],
  serialize: ({ value }) => `type:${value}`,
};
