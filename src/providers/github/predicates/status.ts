import { DropdownPredicate, PredicateType } from '../../types';

export const status: DropdownPredicate = {
  name: 'status',
  label: 'Status',
  type: PredicateType.DROPDOWN,
  choices: [
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
  ],
  negatable: false,
  serialize: ({ value }) => `is:${value}`,
};
