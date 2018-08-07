import React from 'React';
import cx from 'classnames';
import contrast from 'contrast';

import './LabelBadge.scss';

export const LabelBadge = ({ label }) => {
  const background = `#${label.color}`;

  const isDark = contrast(background) === 'dark';

  return (
    <div
      className={cx(
        'LabelBadge',
        isDark ? 'LabelBadge--dark' : 'LabelBadge--light'
      )}
      style={{ background }}
    >
      {label.name}
    </div>
  );
};
