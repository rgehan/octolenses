import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import deleteIcon from '../../assets/delete.svg';
import './Modal.scss';

export class Modal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  render() {
    const { className, children, onClose } = this.props;
    const [header, body, actions] = children;

    return (
      <div className={cx('Modal', className)}>
        <div className="Modal__Backdrop" />
        <div className="Modal__Overlay">
          <div className="Modal__Header">
            <div className="Modal__Header-Title">{header}</div>
            <img src={deleteIcon} onClick={onClose} />
          </div>
          <div className="Modal__Body">{body}</div>
          <div className="Modal__Actions">{actions}</div>
        </div>
      </div>
    );
  }
}

Modal.Header = ({ children }) => children;
Modal.Body = ({ children }) => children;
Modal.Actions = ({ children }) => children;
