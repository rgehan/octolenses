import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';

import { INotification } from './types';

const TYPES_TO_ICON = {
  info: 'fa-info-circle',
  error: 'fa-exclamation-circle',
};

const TYPES_TO_THEME = {
  info: 'bg-blue-500 text-white',
  error: 'bg-red-400 text-white',
};

const TOAST_DURATION = 3000;
const TOAST_FADE_DURATION = 200;

export const ToastTypes = Object.keys(TYPES_TO_ICON);

const Wrapper = styled.div`
  transition: opacity 0.2s;
`;

interface IProps extends INotification {
  onRemove: (id: string) => void;
}

export class Toast extends React.Component<IProps> {
  public state = {
    visible: true,
  };

  public componentDidMount() {
    setTimeout(this.discardToast, TOAST_DURATION);
  }

  public discardToast = () => {
    this.setState({ visible: false });
    setTimeout(this.removeToast, TOAST_FADE_DURATION);
  };

  public removeToast = () => {
    const { id, onRemove } = this.props;
    onRemove(id);
  };

  public render() {
    const { message, type } = this.props;
    const { visible } = this.state;

    return (
      <Wrapper
        onClick={this.discardToast}
        className={cx(
          'bg-gray-800 px-4 py-3 rounded shadow-md mt-3 select-none pointer-events-auto cursor-pointer',
          TYPES_TO_THEME[type],
          !visible && 'opacity-0'
        )}
      >
        <i className={cx('fas mr-2', TYPES_TO_ICON[type])} />
        <span>{message}</span>
      </Wrapper>
    );
  }
}
