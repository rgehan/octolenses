import React from 'react';
import { observer } from 'mobx-react';

import { RepoCard } from '../../containers';
import { Loader, Dropdown } from '../../components';
import { DATES } from '../../constants/dates';
import { LANGUAGES } from '../../constants/languages';
import { trendsStore, settingsStore } from '../../store';

import './Discover.scss';

@observer
export class Discover extends React.Component {
  handleOptionChange = ({ name, value }) => {
    settingsStore.updateSettings(name, value);
    trendsStore.fetchTrendingRepos();
  };

  render() {
    return (
      <div className="Discover h-full w-full flex flex-col">
        <div className="flex items-end justify-end pb-4 h-16">
          <Dropdown
            name="language"
            items={LANGUAGES}
            value={settingsStore.language}
            onChange={this.handleOptionChange}
            className="mr-4"
          />
          <Dropdown
            name="dateRange"
            items={DATES}
            value={settingsStore.dateRange}
            onChange={this.handleOptionChange}
          />
        </div>
        <div className="Discover__ReposList -ml-6">
          {trendsStore.loading ? (
            <Loader />
          ) : (
            trendsStore.data.map(repo => <RepoCard key={repo.id} repo={repo} />)
          )}
        </div>
      </div>
    );
  }
}
