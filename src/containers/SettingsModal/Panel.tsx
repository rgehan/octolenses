import { find } from 'lodash';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';

import { SettingsStore } from '../../store/settings';
import { SETTINGS_VIEWS } from './constants';

interface IProps {
  selectedTab: string;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

export const Panel = compose<IInnerProps, IProps>(
  inject('settingsStore'),
  observer
)(({ selectedTab, settingsStore }) => {
  const view = find(SETTINGS_VIEWS, { id: selectedTab });

  if (!view) {
    return null;
  }

  const Component = view.component;

  return <Component settings={view.isProvider ? undefined : settingsStore} />;
});
