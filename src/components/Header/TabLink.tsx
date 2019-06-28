import cx from 'classnames';
import React, { ReactNode, useContext } from 'react';

import { IsDarkContext } from '../../contexts/isDark';

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

export const TabLink = ({ children, onClick, active = false }: IProps) => {
  const isDark = useContext(IsDarkContext);

  return (
    <a
      className={cx(
        'font-roboto ml-4 py-2 cursor-pointer',
        COLORS[isDark ? 'dark' : 'light'][active ? 'active' : 'inactive']
      )}
      onClick={onClick}
    >
      {children}
    </a>
  );
};
