import cx from 'classnames';
import { get } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import timeago from 'timeago.js';

import { IsDarkContext } from '../../../../contexts/isDark';

import { CheckStatusIndicator } from './CheckStatusIndicator';
import { ContextualDropdown } from './ContextualDropdown';
import { IssueStatusIndicator } from './IssueStatusIndicator';
import { LabelBadge } from './LabelBadge';
import { IssueStatus } from './types';

export interface Issue {
  type: 'PullRequest' | 'Issue';
  title: string;
  url: string;
  html_url: string;
  state: 'open' | 'closed' | 'merged';
  status: IssueStatus;
  number: number;
  createdAt: string;
  pull_request?: {
    url: string;
  };
  author: {
    url: string;
    login: string;
    avatarUrl: string;
  };
  repository: {
    url: string;
    nameWithOwner: string;
  };
  reviews?: {
    totalCount: number;
  };
  comments?: {
    totalCount: number;
  };
  labels: Array<{ color: string; name: string }>;
}

interface IProps {
  data: Issue;
}

export const IssueCard = observer(({ data: issue }: IProps) => {
  const isDark = useContext(IsDarkContext);

  const linkStyle = isDark
    ? 'text-blue-light'
    : 'text-blue hover:text-blue-dark';

  function getTotalCommentsCount() {
    return (
      get(issue, 'reviews.totalCount', 0) + get(issue, 'comments.totalCount', 0)
    );
  }

  return (
    <div className="p-6 flex">
      <div className="flex items-center justify-center flex-no-shrink pr-4">
        <div
          className={cx(
            'w-16 h-16 rounded-full overflow-hidden',
            isDark ? 'bg-grey-darker' : 'bg-grey-light'
          )}
        >
          <img src={issue.author.avatarUrl} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex-1 flex justify-between items-center">
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
                {issue.title}{' '}
              </a>
            </span>

            <CheckStatusIndicator status={issue.status} />
          </div>
          <a href={issue.url} className="ml-2 text-grey-dark hover:text-grey">
            <i className="far fa-comment-alt" /> {getTotalCommentsCount()}
          </a>
        </div>
        <div
          className={cx('text-xs', isDark ? 'text-grey' : 'text-grey-darker')}
        >
          #{issue.number} opened {timeago().format(issue.createdAt)} by{' '}
          <a
            href={issue.author.url}
            className={cx(
              'no-underline hover:underline',
              isDark ? 'text-grey' : 'text-grey-darker'
            )}
          >
            {issue.author.login}
          </a>
          <ContextualDropdown issue={issue} />
        </div>
        <div className="flex mt-3">
          {issue.labels.map(label => (
            <LabelBadge key={label.name} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
});
