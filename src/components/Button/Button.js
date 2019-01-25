import React from 'react';
import cx from 'classnames';

import './Button.scss';

export const Button = ({ type, onClick, children, className }) => (
  <button
    className={cx('Button', `Button--${type}`, className)}
    onClick={onClick}
  >
    {children}
  </button>
);
