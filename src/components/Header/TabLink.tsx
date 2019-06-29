import cx from 'classnames';
import { observer } from 'mobx-react';
import React, { ReactNode } from 'react';

import { settingsStore } from '../../store';

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
  children: ReactNode;
  active?: boolean;
}

export const TabLink = observer(
  ({ children, onClick, active = false }: IProps) => (
    <a
      className={cx(
        'font-roboto ml-4 py-2 cursor-pointer',
        COLORS[settingsStore.isDark ? 'dark' : 'light'][
          active ? 'active' : 'inactive'
        ]
      )}
      onClick={onClick}
    >
      {children}
    </a>
  )
);
