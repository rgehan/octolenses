export const type = {
  name: 'type',
  label: 'Type',
  type: 'dropdown',
  choices: [{ value: 'pr', label: 'PRs' }, { value: 'issue', label: 'Issues' }],
  negatable: false,
  isAvailable: filters => !filters.has('type'),
  serialize: ({ value, negated }) => `${negated ? '-' : ''}type:${value}`,
};
