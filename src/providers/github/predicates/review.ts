import { DropdownPredicate, PredicateType } from '../../types';

export const review: DropdownPredicate = {
  name: 'review',
  label: 'Review Status',
  type: PredicateType.DROPDOWN,
  choices: [
    { value: 'none', label: 'None' },
    { value: 'required', label: 'Required' },
    { value: 'approved', label: 'Approved' },
    { value: 'changes_requested', label: 'Changes Requested' },
  ],
  operators: [],
  serialize: ({ value }) => `review:${value}`,
};
