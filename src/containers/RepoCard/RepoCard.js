import React from 'react';
import humanFormat from 'human-format';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

export const _RepoCard = ({ repo, settings }) => {
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
    <div className="w-1/3 pl-6 mb-6">
      <div
        className={cx(
          'h-64 flex flex-col px-5 py-4 shadow-xl rounded-lg text-black',
          settings.isDark ? 'bg-grey-darkest text-white' : 'bg-white'
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
              settings.isDark
                ? 'text-blue-light'
                : 'text-blue hover:text-blue-dark'
            )}
            href={html_url}
            target="__blank"
          >
            {name}
          </a>
        </div>
        <div className="leading-normal mt-1 overflow-hidden">{description}</div>
        <div
          className={cx(
            'flex-1 min-h-6 flex items-end mt-2',
            settings.isDark ? 'text-grey' : 'text-grey-darker'
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
};

export const RepoCard = inject('settings')(observer(_RepoCard));
