import { IDropdownPredicate, PredicateType } from '../../types';

export const mergeStatus: IDropdownPredicate = {
  name: 'merge status',
  label: 'Merge Status',
  type: PredicateType.DROPDOWN,
  choices: [
    { value: 'merged', label: 'Merged' },
    { value: 'unmerged', label: 'Unmerged' },
  ],
  operators: [],
  serialize: ({ value }) => `is:${value}`,
};
