import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../Button';
import deleteIcon from '../../assets/delete.svg';

import './SettingsModal.scss';

@connect(
  ({ settings }) => ({ token: settings.token }),
  ({ settings }) => ({ updateSettings: settings.updateSettings })
)
export class SettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: props.token,
    };
  }

  handleTokenChange = event => {
    this.setState({
      token: event.target.value,
    });
  };

  handleSave = () => {
    const { token } = this.state;
    this.props.updateSettings({ key: 'token', value: token });
    this.props.onCancel();
  };

  render() {
    return (
      <div className="SettingsModal">
        <div className="SettingsModal__Backdrop" />
        <div className="SettingsModal__Overlay">
          {this.renderHeader()}
          {this.renderContent()}
          {this.renderActions()}
        </div>
      </div>
    );
  }

  renderHeader() {
    const { onCancel } = this.props;

    return (
      <div className="SettingsModal__Header">
        <div className="SettingsModal__Header-Title">Settings</div>
        <img src={deleteIcon} onClick={onCancel} />
      </div>
    );
  }

  renderContent() {
    const { token } = this.state;
    return (
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
            <li>repo:status</li>
            <li>repo_deployment</li>
            <li>public_repo</li>
            <li>read:org</li>
          </ul>
        </div>
      </div>
    );
  }

  renderActions() {
    const { onCancel } = this.props;

    return (
      <div className="SettingsModal__Actions">
        <Button onClick={onCancel} type="default">
          Cancel
        </Button>
        <Button onClick={this.handleSave} type="primary">
          Save
        </Button>
      </div>
    );
  }
}
