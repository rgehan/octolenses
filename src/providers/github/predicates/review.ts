import { IDropdownPredicate, PredicateType } from '../../types';

export const review: IDropdownPredicate = {
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
