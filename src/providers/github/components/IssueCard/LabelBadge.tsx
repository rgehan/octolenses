import React from 'React';
import cx from 'classnames';
import contrast from 'contrast';

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
        isDark ? 'text-white' : 'text-black'
      )}
      style={{ background }}
    >
      {label.name}
    </div>
  );
};
