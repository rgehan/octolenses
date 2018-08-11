export const label = {
  name: 'label',
  label: 'Label',
  type: 'text',
  serialize: ({ value, negated }) => `${negated ? '-' : ''}label:"${value}"`,
};
