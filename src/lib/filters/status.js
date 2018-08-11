export const status = {
  name: 'status',
  label: 'Status',
  type: 'dropdown',
  choices: [
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
  ],
  negatable: false,
  serialize: ({ value }) => `is:${value}`,
};
