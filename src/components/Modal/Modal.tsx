import cx from 'classnames';
import React, { ReactNode, useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { IsDarkContext } from '../../contexts/isDark';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Backdrop = styled.div`
  animation: ${fadeIn} 0.25s ease;
`;

const slideBottom = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const Wrapper = styled.div`
  animation: ${slideBottom} 0.25s ease;
`;

interface IProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

export const Modal = ({ children, onClose }: IProps) => {
  const isDark = useContext(IsDarkContext);

  // Close the modal on ESC
  useEffect(
    () => {
      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          onClose();
        }
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    },
    [onClose]
  );

  return (
    <Backdrop
      className={cx(
        'fixed z-50 inset-0 font-roboto text-lg',
        isDark ? 'bg-gray-900' : 'bg-white'
      )}
    >
      <div
        onClick={onClose}
        className={cx(
          'flex items-center absolute top-0 right-0 mt-4 mr-4 cursor-pointer py-1 px-2 rounded-full',
          isDark
            ? 'text-gray-500 hover:bg-gray-800'
            : 'text-gray-700 hover:bg-gray-200'
        )}
      >
        <span className="mr-2">Close</span>
        <i className="fa fa-times" />
      </div>
      <Wrapper>{children}</Wrapper>
    </Backdrop>
  );
};
