import { reject } from 'lodash';
import React from 'react';

import { Toast } from './Toast';
import { INotification, NotificationType } from './types';

// This will contain a ToastManager instance reference so that toasts
// can be created from anywhere without having to store toasts state
// inside MobX or having to do weird findDOMNode stuff.
let manager: ToastManager = null;

const generateRandomId = () => Math.floor(Math.random() * 0x10000).toString(16);

interface IState {
  notifications: INotification[];
}

export class ToastManager extends React.Component<{}, IState> {
  public state: IState = {
    notifications: [],
  };

  public componentDidMount() {
    manager = this;
  }

  public addNotification(message: string, type: NotificationType) {
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

  public onRemoveNotification = (id: string) => {
    this.setState({
      notifications: reject(this.state.notifications, { id }),
    });
  };

  public render() {
    const { notifications } = this.state;
    return (
      <div className="z-50 fixed top-0 inset-x-0 flex flex-col items-center pointer-events-none">
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
export function toast(message: string, type: NotificationType) {
  if (!manager) {
    return;
  }

  manager.addNotification(message, type);
}
