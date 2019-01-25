import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = styled.div`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
`;

export class Modal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    dark: PropTypes.bool,
  };

  render() {
    const { className, children, onClose, dark } = this.props;
    const [header, body, actions] = children;

    return (
      <div className={cx('fixed pin z-50', className)}>
        <div
          className="absolute pin bg-black opacity-25 -z-1"
          onClick={onClose}
        />
        <Overlay
          className={cx(
            'absolute flex flex-col rounded overflow-hidden shadow-xl',
            dark ? 'bg-grey-darkest' : 'bg-white'
          )}
        >
          <div
            className={cx(
              'flex items-center p-4',
              dark ? 'bg-grey-darker' : 'bg-grey-lighter'
            )}
          >
            <div className="text-xl flex-1">{header}</div>
            <i
              className="fa fa-times text-lg cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div className="mb-4 p-4">{body}</div>
          <div className="flex justify-end pr-3 pb-3">{actions}</div>
        </Overlay>
      </div>
    );
  }
}

Modal.Header = ({ children }) => children;
Modal.Body = ({ children }) => children;
Modal.Actions = ({ children }) => children;
