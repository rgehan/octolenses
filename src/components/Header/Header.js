import React from 'react';
import { connect } from 'react-redux';

import { Dropdown } from '../Dropdown';
import { LANGUAGES } from '../../constants/languages';
import { DATES } from '../../constants/dates';

import './Header.scss';

@connect(
  ({ settings }) => ({
    language: settings.language,
    dateRange: settings.dateRange,
  }),
  ({ settings }) => ({ updateSettings: settings.updateSettings })
)
export class Header extends React.Component {
  render() {
    const { language, dateRange, updateSettings } = this.props;
    return (
      <div className="Header">
        <h1 className="Header__Title">
          <i className="fab fa-github" />
          <span>Trending</span>
        </h1>
        <div className="Header__Actions">
          <Dropdown
            name="language"
            items={LANGUAGES}
            value={language}
            onChange={updateSettings}
          />
          <Dropdown
            name="dateRange"
            items={DATES}
            value={dateRange}
            onChange={updateSettings}
          />
        </div>
      </div>
    );
  }
}
