import React, { ReactNode } from 'react';
import cx from 'classnames';

export enum ButtonType {
  PRIMARY = 'primary',
  DEFAULT = 'default',
}

const TYPE_TO_CLASSES: Record<ButtonType, string> = {
  primary: 'bg-blue hover:bg-blue-dark text-white',
  default: 'bg-grey-lighter hover:bg-grey-light',
};

interface IProps {
  type?: ButtonType;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export const Button = ({
  type = ButtonType.DEFAULT,
  onClick,
  children,
  className = '',
}: IProps) => (
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
