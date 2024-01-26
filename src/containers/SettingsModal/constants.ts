import { map } from 'lodash';

import { providers } from '../../providers';
import { CacheSettings, NightMode } from './tabs';
import { ISettingView } from './types';

export const SETTINGS_VIEWS: ISettingView[] = [
  {
    id: 'night_mode',
    label: 'Night mode',
    component: NightMode,
  },
  {
    id: 'cache',
    label: 'Cache',
    component: CacheSettings,
  },
  ...map(providers, ({ label, settingsComponent }, key) => ({
    id: key,
    label,
    component: settingsComponent,
    isProvider: true,
  })),
];
