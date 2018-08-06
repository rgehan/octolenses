import { LANGUAGES } from '../../constants/languages';
import { DATES } from '../../constants/dates';

export const settings = {
  state: {
    language: LANGUAGES[0].value,
    dateRange: DATES[0].value,
  },
  reducers: {
    updateSettings(state, { key, value }) {
      return {
        ...state,
        [key]: value,
      };
    },
  },
};
