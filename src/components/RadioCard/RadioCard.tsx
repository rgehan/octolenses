import React, { useContext } from 'react';
import cx from 'classnames';

import { IsDarkContext } from '../../contexts/isDark';

interface IProps {
  title: string;
  text: string;
  selected: boolean;
  icon?: string;
  dark?: boolean;
  onClick: () => void;
}

const COLORS = {
  dark: {
    active: 'bg-grey-darkest border-blue',
    inactive: 'bg-grey-darkest border-grey-darker',
  },
  light: {
    active: 'border-blue bg-blue-lightest text-blue-darker',
    inactive: 'border-grey bg-grey-lightest text-grey-darkest',
  },
};

export const RadioCard = ({ title, text, selected, icon, onClick }: IProps) => {
  const isDark = useContext(IsDarkContext);

  return (
    <div
      onClick={onClick}
      className={cx(
        'h-28 flex border px-3 py-2 rounded cursor-pointer select-none mb-3',
        COLORS[isDark ? 'dark' : 'light'][selected ? 'active' : 'inactive']
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
              selected ? 'text-blue' : 'text-grey-light',
              icon
            )}
          />
        </div>
      )}
    </div>
  );
};
