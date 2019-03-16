import { DropdownPredicate, PredicateType } from '../../types';

export const mergeStatus: DropdownPredicate = {
  name: 'merge status',
  label: 'Merge Status',
  type: PredicateType.DROPDOWN,
  choices: [
    { value: 'merged', label: 'Merged' },
    { value: 'unmerged', label: 'Unmerged' },
  ],
  negatable: false,
  serialize: ({ value }) => `is:${value}`,
};
