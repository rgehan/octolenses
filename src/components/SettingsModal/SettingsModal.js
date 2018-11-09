import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Modal } from '../Modal';
import { Button } from '../Button';
import { refreshAllData } from '../../store';

import './SettingsModal.scss';
import { DARK_MODE } from '../../constants/darkMode';

const CREATE_TOKEN_URL =
  'https://github.com/settings/tokens/new?scopes=repo&description=octolenses-browser-extension';

@inject('settings')
@observer
export class SettingsModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const useNewTabPage =
      localStorage.getItem('useNewTabPage') === 'false' ? false : true;

    this.state = {
      useNewTabPage,
      token: props.settings.token,
      darkMode: props.settings.darkMode,
    };
  }

  handleTokenChange = event => {
    this.setState({
      token: event.target.value,
    });
  };

  handleBehaviorChange = event => {
    this.setState({
      useNewTabPage: JSON.parse(event.target.value),
    });
  };

  handleDarkModeChange = event => {
    this.setState({
      darkMode: event.target.value,
    });
  };

  handleSave = () => {
    const { onClose, settings } = this.props;
    const { token, useNewTabPage, darkMode } = this.state;

    // Save the behavior
    localStorage.setItem('useNewTabPage', useNewTabPage);

    // Save the token & refresh the data
    if (token !== this.props.settings.token) {
      settings.updateSettings('token', token);
      refreshAllData();
    }

    // Save the dark mode settings
    settings.updateSettings('darkMode', darkMode);

    onClose();
  };

  render() {
    const { onClose } = this.props;

    return (
      <Modal onClose={onClose} className="SettingsModal">
        <Modal.Header>Settings</Modal.Header>
        <Modal.Body>
          <div className="SettingsModal__Form">
            {this.renderBehaviorSettings()}
            <br />
            {this.renderDarkModeSettings()}
            <br />
            {this.renderTokenSettings()}
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

  renderBehaviorSettings() {
    const { useNewTabPage } = this.state;

    return (
      <div className="SettingsModal__FormGroup SettingsModal__FormGroup--behavior">
        <span className="SettingsModal__FormGroup-Header">
          When should OctoLenses appear?
        </span>
        <div className="SettingsModal__Form-RadioGroup">
          <input
            type="radio"
            name="useNewTabPage"
            value={true}
            id="useNewTabPage-true"
            checked={useNewTabPage}
            onChange={this.handleBehaviorChange}
          />
          <label htmlFor="useNewTabPage-true">
            Every time I open a new tab
          </label>
        </div>
        <div className="SettingsModal__Form-RadioGroup">
          <input
            type="radio"
            name="useNewTabPage"
            value={false}
            id="useNewTabPage-false"
            checked={!useNewTabPage}
            onChange={this.handleBehaviorChange}
          />
          <label htmlFor="useNewTabPage-false">
            When I click on the extension's icon
          </label>
        </div>
      </div>
    );
  }

  renderDarkModeSettings() {
    const { darkMode } = this.state;

    return (
      <div className="SettingsModal__FormGroup SettingsModal__FormGroup--darkMode">
        <span className="SettingsModal__FormGroup-Header">
          When should dark mode be enabled?
        </span>
        <div className="SettingsModal__Form-RadioGroup">
          <input
            type="radio"
            name="darkMode"
            value={DARK_MODE.DISABLED}
            id="darkMode-never"
            checked={darkMode === DARK_MODE.DISABLED}
            onChange={this.handleDarkModeChange}
          />
          <label htmlFor="darkMode-never">Never</label>
        </div>
        <div className="SettingsModal__Form-RadioGroup">
          <input
            type="radio"
            name="darkMode"
            value={DARK_MODE.ENABLED}
            id="darkMode-always"
            checked={darkMode === DARK_MODE.ENABLED}
            onChange={this.handleDarkModeChange}
          />
          <label htmlFor="darkMode-always">Always</label>
        </div>
        <div className="SettingsModal__Form-RadioGroup">
          <input
            type="radio"
            name="darkMode"
            value={DARK_MODE.AT_NIGHT}
            id="darkMode-night"
            checked={darkMode === DARK_MODE.AT_NIGHT}
            onChange={this.handleDarkModeChange}
          />
          <label htmlFor="darkMode-night">At Night (7pm - 7am)</label>
        </div>
      </div>
    );
  }

  renderTokenSettings() {
    const { token } = this.state;

    return (
      <div className="SettingsModal__FormGroup SettingsModal__FormGroup--token">
        <span className="SettingsModal__FormGroup-Header">
          Github Personal Access Token:
        </span>
        <input
          id="token"
          type="password"
          value={token}
          onChange={this.handleTokenChange}
        />
        <div className="SettingsModal__Form-HelpText">
          <p>
            You can generate a Personal Access Token on{' '}
            <a href={CREATE_TOKEN_URL} target="__blank">
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
    );
  }
}
