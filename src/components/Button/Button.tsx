import cx from 'classnames';
import React, { ReactNode } from 'react';

export enum ButtonType {
  PRIMARY = 'primary',
  DEFAULT = 'default',
}

const TYPE_TO_CLASSES: Record<ButtonType, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white',
  default: 'bg-gray-200 hover:bg-gray-400 active:bg-gray-500 text-black',
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
