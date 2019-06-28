import cx from 'classnames';
import contrast from 'contrast';
import React from 'React';

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
        'text-xs py-1 px-2 rounded mr-2',
        isDark ? 'text-white' : 'text-gray-900'
      )}
      style={{ background }}
    >
      {label.name}
    </div>
  );
};
