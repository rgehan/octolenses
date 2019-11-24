import { observer } from 'mobx-react';
import React from 'react';

import { Dropdown, Loader } from '../../components';
import { DATES } from '../../constants/dates';
import { LANGUAGES } from '../../constants/languages';
import { RepoCard } from '../../containers';
import { settingsStore, trendsStore } from '../../store';

import './Discover.scss';

interface IHandleOptionChangeParams {
  name: string;
  value: any;
}

@observer
export class Discover extends React.Component {
  public handleOptionChange = ({ name, value }: IHandleOptionChangeParams) => {
    settingsStore.updateSettings(name, value);
    trendsStore.fetchTrendingRepos();
  };

  public render() {
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
