import React from 'react';
import { inject, observer } from 'mobx-react';

import { RepoCard } from '../../containers';
import { Loader, Dropdown } from '../../components';
import { DATES } from '../../constants/dates';
import { LANGUAGES } from '../../constants/languages';

import './Discover.scss';

@inject('trends', 'settings')
@observer
export class Discover extends React.Component {
  handleOptionChange = ({ name, value }) => {
    this.props.settings.updateSettings(name, value);
    this.props.trends.fetchTrendingRepos();
  };

  render() {
    const { trends, settings } = this.props;

    return (
      <div className="Discover">
        <div className="Discover__Actions">
          <Dropdown
            name="language"
            items={LANGUAGES}
            value={settings.language}
            onChange={this.handleOptionChange}
          />
          <Dropdown
            name="dateRange"
            items={DATES}
            value={settings.dateRange}
            onChange={this.handleOptionChange}
          />
        </div>
        <div className="Discover__ReposList -ml-6">
          {trends.loading ? (
            <Loader />
          ) : (
            trends.data.map(repo => <RepoCard key={repo.id} repo={repo} />)
          )}
        </div>
      </div>
    );
  }
}
