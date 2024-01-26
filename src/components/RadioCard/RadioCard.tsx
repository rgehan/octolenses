import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';

import { SettingsStore } from '../../store/settings';

interface IProps {
  title: string;
  text: string;
  selected: boolean;
  icon?: string;
  dark?: boolean;
  onClick: () => void;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

const COLORS = {
  dark: {
    active: 'bg-gray-800 border-blue-500',
    inactive: 'bg-gray-800 border-gray-800',
  },
  light: {
    active: 'border-blue-500 bg-blue-100 text-blue-800',
    inactive: 'border-gray bg-gray-100 text-gray-800',
  },
};

export const RadioCard = compose<IInnerProps, IProps>(
  inject('settingsStore'),
  observer
)(({ title, text, selected, icon, onClick, settingsStore }) => (
  <div
    onClick={onClick}
    className={cx(
      'h-28 flex border px-3 py-2 rounded cursor-pointer select-none mb-3',
      COLORS[settingsStore.isDark ? 'dark' : 'light'][
        selected ? 'active' : 'inactive'
      ]
    )}
  >
    <div className="pr-2 pt-px">
      <input type="radio" checked={selected} />
    </div>
    <div className="leading-normal flex-1">
      <div className="font-medium">{title}</div>
      <div className="mt-1">{text}</div>
    </div>
    {icon && (
      <div className="w-20 flex items-center justify-center ml-2">
        <i
          className={cx(
            'text-5xl',
            selected ? 'text-blue-500' : 'text-gray-400',
            icon
          )}
        />
      </div>
    )}
  </div>
));
