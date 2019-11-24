import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';

import { Dropdown, Loader } from '../../components';
import { DATES } from '../../constants/dates';
import { LANGUAGES } from '../../constants/languages';
import { RepoCard } from '../../containers';
import { SettingsStore } from '../../store/settings';
import { TrendsStore } from '../../store/trends';

import './Discover.scss';

interface IInnerProps {
  settingsStore?: SettingsStore;
  trendsStore?: TrendsStore;
}

interface IHandleOptionChangeParams {
  name: string;
  value: any;
}

export const Discover = compose<IInnerProps, {}>(
  inject('settingsStore', 'trendsStore'),
  observer
)(({ settingsStore, trendsStore }) => {
  function handleOptionChange({ name, value }: IHandleOptionChangeParams) {
    settingsStore.updateSettings(name, value);
    trendsStore.fetchTrendingRepos();
  }

  return (
    <div className="Discover h-full w-full flex flex-col">
      <div className="flex items-end justify-end pb-4 h-16">
        <Dropdown
          name="language"
          items={LANGUAGES}
          value={settingsStore.language}
          onChange={handleOptionChange}
          className="mr-4"
        />
        <Dropdown
          name="dateRange"
          items={DATES}
          value={settingsStore.dateRange}
          onChange={handleOptionChange}
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
});
