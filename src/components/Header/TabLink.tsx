import React, { useContext, ReactNode } from 'react';
import cx from 'classnames';

import { IsDarkContext } from '../../contexts/isDark';

const COLORS = {
  dark: {
    active: 'text-white',
    inactive: 'text-grey-light hover:text-white',
  },
  light: {
    active: 'text-grey-darkest',
    inactive: 'text-grey-dark hover:text-grey-darkest',
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
