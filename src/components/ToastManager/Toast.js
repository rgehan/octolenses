import React from 'react';
import cx from 'classnames';
import styled from 'styled-components';

const TYPES_TO_ICON = {
  info: 'fa-info-circle',
  error: 'fa-exclamation-circle',
};

const TYPES_TO_THEME = {
  info: 'bg-blue',
  error: 'bg-red-light',
};

const TOAST_DURATION = 3000;
const TOAST_FADE_DURATION = 200;

export const ToastTypes = Object.keys(TYPES_TO_ICON);

const Wrapper = styled.div`
  transition: opacity 0.2s;
`;

export class Toast extends React.Component {
  state = {
    visible: true,
  };

  componentDidMount() {
    const { id, onRemove } = this.props;

    // Trigger the fade-out a bit before it expires
    setTimeout(() => {
      this.setState({ visible: false });
    }, TOAST_DURATION - TOAST_FADE_DURATION);

    // Remove the toast once it's expired
    setTimeout(() => {
      onRemove(id);
    }, TOAST_DURATION);
  }

  render() {
    const { message, type } = this.props;
    const { visible } = this.state;

    return (
      <Wrapper
        className={cx(
          'bg-grey-darkest px-4 py-3 rounded shadow-md mt-3 select-none',
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
