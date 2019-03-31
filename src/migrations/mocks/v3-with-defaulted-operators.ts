export default {
  filtersStore: {
    data: [
      {
        id: '5c2382a0-5216-11e9-ad7a-73a635a52ed2',
        label: 'OctoLenses Issues',
        provider: 'github',
        predicates: [
          { type: 'type', value: 'issues' },
          { type: 'repo', value: 'rgehan/octolenses', operator: 'not_equal' },
          { type: 'status', value: 'open' },
          { type: 'author', value: 'rgehan', operator: 'equal' },
        ],
      },
    ],
  },
  settingsStore: {
    language: null,
    dateRange: 'last_week',
    wasOnboarded: true,
    darkMode: 'DISABLED',
    schemaVersion: 3,
  },
  useNewTabPage: true,
  githubProvider: {
    settings: {
      token: '<token>',
    },
  },
};
