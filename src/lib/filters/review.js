export const review = {
  name: 'review',
  label: 'Review Status',
  type: 'dropdown',
  choices: [
    { value: 'none', label: 'None' },
    { value: 'required', label: 'Required' },
    { value: 'approved', label: 'Approved' },
    { value: 'changes_requested', label: 'Changes Requested' },
  ],
  negatable: false,
  serialize: ({ value }) => `review:${value}`,
};
