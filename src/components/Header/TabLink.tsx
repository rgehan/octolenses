import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';

import { SettingsStore } from '../../store/settings';

const COLORS = {
  dark: {
    active: 'text-white',
    inactive: 'text-gray-400 hover:text-white',
  },
  light: {
    active: 'text-gray-800',
    inactive: 'text-gray-600 hover:text-gray-800',
  },
};

interface IProps {
  onClick: () => void;
  name: string;
  active?: boolean;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

export const TabLink = compose<IInnerProps, IProps>(
  inject('settingsStore'),
  observer
)(({ children, name, onClick, active = false, settingsStore }) => (
  <a
    className={cx(
      'font-roboto ml-4 py-2 cursor-pointer',
      COLORS[settingsStore.isDark ? 'dark' : 'light'][
        active ? 'active' : 'inactive'
      ]
    )}
    onClick={onClick}
    data-header-link={name}
  >
    {children}
  </a>
));
