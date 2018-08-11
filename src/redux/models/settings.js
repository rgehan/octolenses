import produce from 'immer';

import { LANGUAGES } from '../../constants/languages';
import { DATES } from '../../constants/dates';

export const settings = {
  state: {
    language: LANGUAGES[0].value,
    dateRange: DATES[0].value,
    wasOnboarded: false,
  },
  reducers: {
    updateSettings: (_state, { key, value }) =>
      produce(_state, state => {
        state[key] = value;
      }),
  },
};
