import cx from 'classnames';
import contrast from 'contrast';
import React from 'react';

interface IProps {
  label: {
    name: string;
    color: string;
  };
}

export const LabelBadge = ({ label }: IProps) => {
  const background = `#${label.color}`;

  const isDark = contrast(background) === 'dark';

  return (
    <div
      className={cx(
        'text-xs whitespace-nowrap py-1 px-2 rounded',
        isDark ? 'text-white' : 'text-gray-900'
      )}
      style={{ background }}
    >
      {label.name}
    </div>
  );
};
