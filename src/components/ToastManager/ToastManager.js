import React from 'react';
import { reject } from 'lodash';

import { Toast } from './Toast';

// This will contain a ToastManager instance reference so that toasts
// can be created from anywhere without having to store toasts state
// inside MobX or having to do weird findDOMNode stuff.
let manager = null;

const generateRandomId = () => Math.floor(Math.random() * 0x10000).toString(16);

export class ToastManager extends React.Component {
  state = {
    notifications: [],
  };

  componentDidMount() {
    manager = this;
  }

  addNotification(message, type) {
    const { notifications } = this.state;

    const notification = {
      id: generateRandomId(),
      message,
      type,
    };

    this.setState({
      notifications: [notification, ...notifications],
    });
  }

  onRemoveNotification = id => {
    this.setState({
      notifications: reject(this.state.notifications, { id }),
    });
  };

  render() {
    const { notifications } = this.state;
    return (
      <div className="fixed top-0 inset-x-0 flex flex-col items-center pointer-events-none">
        {notifications.map(notification => (
          <Toast
            key={notification.id}
            onRemove={this.onRemoveNotification}
            {...notification}
          />
        ))}
      </div>
    );
  }
}

/**
 * Syntax sugar allowing to safely inject a toast inside the ToastManager singleton
 * @param {*} message
 * @param {*} type
 */
export function toast(message, type) {
  if (!manager) {
    return;
  }

  manager.addNotification(message, type);
}
