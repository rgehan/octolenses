export const author = {
  name: 'author',
  label: 'Author',
  type: 'text',
  serialize: ({ value, negated }) => `${negated ? '-' : ''}author:"${value}"`,
};
