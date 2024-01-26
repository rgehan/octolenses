/* eslint-disable @typescript-eslint/camelcase */

import cx from 'classnames';
import humanFormat from 'human-format';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';

import { SettingsStore } from '../../store/settings';

interface IProps {
  repo: any;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

export const RepoCard = compose<IInnerProps, IProps>(
  inject('settingsStore'),
  observer
)(({ repo, settingsStore }) => {
  const {
    name,
    description,
    stargazers_count,
    forks_count,
    open_issues_count,
    html_url,
    language,
    owner: { avatar_url, html_url: profile_url },
  } = repo;

  return (
    <div className="w-1/3 pl-6 mb-6" data-id="repo-card">
      <div
        className={cx(
          'h-64 flex flex-col px-5 py-4 shadow-lg rounded-lg',
          settingsStore.isDark
            ? 'bg-gray-800 text-white'
            : 'bg-white text-gray-900'
        )}
      >
        <div className="flex items-center min-h-10">
          <a
            href={profile_url}
            className="inline-block h-8 w-8 overflow-hidden rounded-full mr-3"
          >
            <img src={avatar_url} />
          </a>
          <a
            className={cx(
              'min-w-0 truncate hover:underline text-2xl py-2',
              settingsStore.isDark
                ? 'text-blue-400'
                : 'text-blue-500 hover:text-blue-600'
            )}
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            data-id="repo-link"
          >
            {name}
          </a>
        </div>
        <div className="leading-normal mt-1 overflow-hidden">{description}</div>
        <div
          className={cx(
            'flex-1 min-h-6 flex items-end mt-2',
            settingsStore.isDark ? 'text-gray-500' : 'text-gray-700'
          )}
        >
          {language && <div className="mr-5">{language}</div>}
          <div className="mr-5">
            <i className="fa fa-star" />{' '}
            {humanFormat(stargazers_count, { decimals: 1, separator: '' })}
          </div>
          <div className="mr-5">
            <i className="fa fa-code-branch" />{' '}
            {humanFormat(forks_count, { decimals: 1, separator: '' })}
          </div>
          <div>
            <i className="fa fa-exclamation-circle" />{' '}
            {humanFormat(open_issues_count, { decimals: 1, separator: '' })}
          </div>
        </div>
      </div>
    </div>
  );
});
