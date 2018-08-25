import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Modal } from '../Modal';
import { Button } from '../Button';
import { refreshAllData } from '../../store';

import './SettingsModal.scss';

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

  handleSave = () => {
    const { token, useNewTabPage } = this.state;

    // Save the token & refresh the data
    this.props.settings.updateSettings('token', token);
    refreshAllData();

    // Save the behavior
    localStorage.setItem('useNewTabPage', useNewTabPage);

    this.props.onClose();
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
