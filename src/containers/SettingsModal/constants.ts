import { map } from 'lodash';

import { providers } from '../../providers';
import { Behavior, CacheSettings, NightMode } from './tabs';
import { SettingView } from './types';

export const SETTINGS_VIEWS: SettingView[] = [
  {
    id: 'behavior',
    label: 'Behavior',
    component: Behavior,
  },
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
