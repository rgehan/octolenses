import React from 'react';
import cx from 'classnames';

import './Button.scss';

export const Button = ({ type, onClick, children }) => (
  <button className={cx('Button', `Button--${type}`)} onClick={onClick}>
    {children}
  </button>
);
