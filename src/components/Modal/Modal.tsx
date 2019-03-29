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
        event.key === 'Escape' && onClose();
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    },
    [onClose]
  );

  return (
    <Backdrop
      className={cx(
        'fixed z-50 pin font-roboto text-lg',
        isDark ? 'bg-black' : 'bg-white'
      )}
    >
      <div
        onClick={onClose}
        className={cx(
          'flex items-center absolute pin-t pin-r mt-4 mr-4 cursor-pointer py-1 px-2 rounded-full',
          isDark
            ? 'text-grey hover:bg-grey-darkest'
            : 'text-grey-darker hover:bg-grey-lighter'
        )}
      >
        <span className="mr-2">Close</span>
        <i className="fa fa-times" />
      </div>
      <Wrapper>{children}</Wrapper>
    </Backdrop>
  );
};
