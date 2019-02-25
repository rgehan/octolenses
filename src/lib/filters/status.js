export const status = {
  name: 'status',
  label: 'Status',
  type: 'dropdown',
  choices: [
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
    { value: 'merged', label: 'Merged' },
    { value: 'unmerged', label: 'Unmerged' },
  ],
  negatable: false,
  serialize: ({ value }) => `is:${value}`,
};
