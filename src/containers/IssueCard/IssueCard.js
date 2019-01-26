import React from 'react';
import { chain } from 'lodash';
import cx from 'classnames';
import timeago from 'timeago.js';
import { inject, observer } from 'mobx-react';

import { LabelBadge } from '../../components/LabelBadge';

const parseRepoName = url =>
  chain(url)
    .split('/')
    .slice(-2)
    .join('/')
    .value();

const parseRepoUrl = apiUrl =>
  apiUrl.replace('api.github.com/repos/', 'github.com/');

const _IssueCard = ({ issue, settings }) => {
  const isPR = issue.pull_request;
  const isOpen = issue.state === 'open';

  const fullRepoName = parseRepoName(issue.repository_url);
  const repoUrl = parseRepoUrl(issue.repository_url);

  const linkStyle = settings.isDark
    ? 'text-blue-light'
    : 'text-blue hover:text-blue-dark';

  return (
    <div className="p-6 flex">
      <div className="flex items-center justify-center flex-no-shrink pr-4">
        <div
          className={cx(
            'w-16 h-16 rounded-full overflow-hidden',
            settings.isDark ? 'bg-grey-darker' : 'bg-grey-light'
          )}
        >
          <img src={issue.user.avatar_url} />
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex items-start">
          <div className="flex-1 flex items-center mb-1 min-w-0">
            <i
              className={cx(
                'mr-2',
                isPR ? 'fas fa-code-branch' : 'fas fa-exclamation-circle',
                isOpen ? 'text-green' : 'text-red'
              )}
            />
            <span className={cx('truncate pb-1 min-w-0', linkStyle)}>
              <a className={cx('hover:underline', linkStyle)} href={repoUrl}>
                {fullRepoName}
              </a>
              <span className="mx-1">•</span>
              <a
                className={cx('text-lg hover:underline', linkStyle)}
                href={issue.html_url}
                title={issue.title}
              >
                {issue.title}
              </a>
            </span>
          </div>
        </div>
        <div
          className={cx(
            'text-xs',
            settings.isDark ? 'text-grey' : 'text-grey-darker'
          )}
        >
          {timeago().format(issue.created_at)} by{' '}
          <a
            href={issue.user.html_url}
            className={cx(
              'no-underline hover:underline',
              settings.isDark ? 'text-grey' : 'text-grey-darker'
            )}
          >
            {issue.user.login}
          </a>
        </div>
        <div className="flex mt-3">
          {issue.labels.map(label => (
            <LabelBadge key={label.id} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const IssueCard = inject('settings')(observer(_IssueCard));
