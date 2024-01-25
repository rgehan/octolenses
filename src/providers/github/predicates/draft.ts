import { IDropdownPredicate, PredicateType } from '../../types';

export const draft: IDropdownPredicate = {
  name: 'draft',
  label: 'Is Draft?',
  type: PredicateType.DROPDOWN,
  choices: [
    { value: 'false', label: 'No' },
    { value: 'true', label: 'Yes' },
  ],
  operators: [],
  serialize: ({ value }) => `draft:${value}`,
};
