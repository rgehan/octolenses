import { IDropdownPredicate, PredicateType } from '../../types';

export const status: IDropdownPredicate = {
  name: 'status',
  label: 'Status',
  type: PredicateType.DROPDOWN,
  choices: [
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
  ],
  operators: [],
  serialize: ({ value }) => `is:${value}`,
};
