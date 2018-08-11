export const type = {
  name: 'type',
  label: 'Type',
  type: 'dropdown',
  choices: [{ name: 'pr', label: 'PRs' }, { name: 'issue', label: 'Issues' }],
  negatable: false,
  isAvailable: filters => !filters.has('type'),
  serialize: ({ value, negated }) => `${negated ? '-' : ''}type:${value}`,
};
