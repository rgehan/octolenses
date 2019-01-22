import React from 'React';
import cx from 'classnames';
import contrast from 'contrast';

export const LabelBadge = ({ label }) => {
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
