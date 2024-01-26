import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';

import { Dropdown, Loader } from '../../components';
import { DATES, DateType } from '../../constants/dates';
import { LANGUAGES } from '../../constants/languages';
import { RepoCard } from '../../containers';
import { SettingsStore } from '../../store/settings';
import { TrendsStore } from '../../store/trends';

import './Discover.scss';

interface IInnerProps {
  settingsStore?: SettingsStore;
  trendsStore?: TrendsStore;
}

export const Discover = compose<IInnerProps, {}>(
  inject('settingsStore', 'trendsStore'),
  observer
)(({ settingsStore, trendsStore }) => {
  function handleChangeLanguage({ value }: { value: string }) {
    settingsStore.updateLanguage(value);
    trendsStore.fetchTrendingRepos();
  }

  function handleChangeDateRange({ value }: { value: string }) {
    settingsStore.updateDateRange(value as DateType);
    trendsStore.fetchTrendingRepos();
  }

  return (
    <div className="Discover h-full w-full flex flex-col">
      <div className="flex items-end justify-end pb-4 h-16">
        <Dropdown
          name="language"
          items={LANGUAGES}
          value={settingsStore.language}
          onChange={handleChangeLanguage}
          className="mr-4"
        />
        <Dropdown
          name="dateRange"
          items={DATES}
          value={settingsStore.dateRange}
          onChange={handleChangeDateRange}
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
