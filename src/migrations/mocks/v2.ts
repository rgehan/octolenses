export default {
  filtersStore: {
    data: [
      {
        id: '5c2382a0-5216-11e9-ad7a-73a635a52ed2',
        label: 'OctoLenses Issues',
        provider: 'github',
        predicates: [
          { type: 'type', value: 'issues' },
          { type: 'repo', value: 'rgehan/octolenses', negated: false },
          { type: 'status', value: 'open' },
        ],
      },
      {
        id: '92da29c0-5216-11e9-ad7a-73a635a52ed2',
        label: 'My Private Filter',
        provider: 'github',
        predicates: [
          { type: 'status', value: 'open' },
          {
            type: 'repo',
            value: 'botify-hq/botify-report',
            negated: false,
          },
          { type: 'author', value: 'rgehan', negated: false },
          { type: 'status', value: 'open', negated: false },
        ],
      },
    ],
  },
  settingsStore: {
    language: null,
    dateRange: 'last_week',
    wasOnboarded: true,
    darkMode: 'DISABLED',
    schemaVersion: 2,
  },
  useNewTabPage: true,
  githubProvider: {
    settings: {
      token: '<token>',
    },
  },
};
