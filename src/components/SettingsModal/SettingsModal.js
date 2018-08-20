import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Modal } from '../Modal';
import { Button } from '../Button';
import { refreshAllData } from '../../store';

import './SettingsModal.scss';

@inject('settings')
@observer
export class SettingsModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      token: props.settings.token,
    };
  }

  handleTokenChange = event => {
    this.setState({
      token: event.target.value,
    });
  };

  handleSave = () => {
    const { token } = this.state;
    this.props.settings.updateSettings('token', token);
    refreshAllData();
    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    const { token } = this.state;

    return (
      <Modal onClose={onClose} className="SettingsModal">
        <Modal.Header>Settings</Modal.Header>
        <Modal.Body>
          <div className="SettingsModal__Form">
            <label htmlFor="token">Github Personal Access Token:</label>
            <input
              id="token"
              type="password"
              value={token}
              onChange={this.handleTokenChange}
            />
            <div className="SettingsModal__Form-HelpText">
              <p>
                You can generate a Personal Access Token on{' '}
                <a href="https://github.com/settings/tokens" target="__blank">
                  this page
                </a>
                .
              </p>
              <p>It needs to have the following scope:</p>
              <ul>
                <li>repo</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Button onClick={onClose} type="default">
            Cancel
          </Button>
          <Button onClick={this.handleSave} type="primary">
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
