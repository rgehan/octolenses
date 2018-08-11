export const repository = {
  name: 'repository',
  label: 'Repository',
  type: 'text',
  serialize: ({ value, negated }) => `${negated ? '-' : ''}repo:${value}`,
};
