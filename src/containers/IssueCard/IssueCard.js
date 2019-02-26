import React from 'react';
import cx from 'classnames';
import timeago from 'timeago.js';
import { inject, observer } from 'mobx-react';

import { LabelBadge } from '../../components/LabelBadge';

import { ContextualDropdown } from './ContextualDropdown';

const ISSUE_STATUS_COLORS = {
  open: 'text-green',
  closed: 'text-red',
  merged: 'text-purple',
};

const IssueStatusIndicator = ({ type, state }) => (
  <i
    className={cx(
      'mr-2',
      type === 'PullRequest'
        ? 'fas fa-code-branch'
        : 'fas fa-exclamation-circle',
      ISSUE_STATUS_COLORS[state.toLowerCase()]
    )}
  />
);

const CheckStatusIndicator = ({ status }) => {
  if (!status) {
    return null;
  }

  const icon =
    status === 'SUCCESS' ? 'fa-check text-green' : 'fa-times text-red';

  return <i className={cx('fa text-sm ml-2', icon)} />;
};

const _IssueCard = ({ issue, settings }) => {
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
          <img src={issue.author.avatarUrl} />
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex items-start">
          <div className="flex-1 flex items-center mb-1 min-w-0">
            <IssueStatusIndicator type={issue.type} state={issue.state} />

            <span className={cx('truncate pb-1 min-w-0', linkStyle)}>
              <a
                className={cx('hover:underline', linkStyle)}
                href={issue.repository.url}
              >
                {issue.repository.nameWithOwner}
              </a>
              <span className="mx-1">•</span>
              <a
                className={cx('text-lg hover:underline', linkStyle)}
                href={issue.url}
                title={issue.title}
              >
                {issue.title}
              </a>
            </span>

            <CheckStatusIndicator status={issue.status} />
          </div>
        </div>
        <div
          className={cx(
            'text-xs',
            settings.isDark ? 'text-grey' : 'text-grey-darker'
          )}
        >
          #{issue.number} opened {timeago().format(issue.createdAt)} by{' '}
          <a
            href={issue.author.url}
            className={cx(
              'no-underline hover:underline',
              settings.isDark ? 'text-grey' : 'text-grey-darker'
            )}
          >
            {issue.author.login}
          </a>
          <ContextualDropdown issue={issue} dark={settings.isDark} />
        </div>
        <div className="flex mt-3">
          {issue.labels.map(label => (
            <LabelBadge key={label.name} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const IssueCard = inject('settings')(observer(_IssueCard));
