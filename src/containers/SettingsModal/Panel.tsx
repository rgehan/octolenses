import { find } from 'lodash';
import React from 'react';

import { settings } from '../../store/settings';
import { SETTINGS_VIEWS } from './SettingsModal';

interface IProps {
  selectedTab: string;
}

export const Panel = ({ selectedTab }: IProps) => {
  const view = find(SETTINGS_VIEWS, { id: selectedTab });

  if (!view) {
    return null;
  }

  const Component = view.component;

  return <Component settings={view.isProvider ? undefined : settings} />;
};
