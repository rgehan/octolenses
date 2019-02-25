export const mergeStatus = {
  name: 'merge status',
  label: 'Merge Status',
  type: 'dropdown',
  choices: [
    { value: 'merged', label: 'Merged' },
    { value: 'unmerged', label: 'Unmerged' },
  ],
  negatable: false,
  serialize: ({ value }) => `is:${value}`,
};
