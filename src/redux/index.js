import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';

import * as models from './models';

const persistPlugin = createRematchPersist({
  whitelist: ['settings'],
  throttle: 1000,
  version: 1,
});

export const store = init({
  models,
  plugins: [persistPlugin],
});
