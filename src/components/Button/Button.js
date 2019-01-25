import React from 'react';
import cx from 'classnames';

const TYPE_TO_CLASSES = {
  primary: 'bg-blue hover:bg-blue-dark text-white',
  default: 'bg-grey-lighter hover:bg-grey-light',
};

export const Button = ({ type = 'default', onClick, children, className }) => (
  <button
    className={cx(
      'min-w-24 px-3 py-2 rounded cursor-pointer',
      'outline-none hover:outline-none focus:outline-none active:outline-none',
      TYPE_TO_CLASSES[type],
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);
