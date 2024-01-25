import cx from 'classnames';
import { get } from 'lodash';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { compose } from 'recompose';
import * as timeago from 'timeago.js';

import { SettingsStore } from '../../../../store/settings';
import { CheckStatusIndicator } from './CheckStatusIndicator';
import { ConflictIndicator } from './ConflictIndicator';
import { ContextualDropdown } from './ContextualDropdown';
import { IssueStatusIndicator } from './IssueStatusIndicator';
import { LabelBadge } from './LabelBadge';
import { IssueStatus, TimelineItem, TimelineItemType } from './types';

export interface IIssue {
  type: 'PullRequest' | 'Issue';
  title: string;
  url: string;
  html_url: string;
  state: 'open' | 'closed' | 'merged';
  status: IssueStatus;
  number: number;
  createdAt: string;
  conflicting: boolean;
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
  timelineItems?: TimelineItem[];
}

interface IProps {
  data: IIssue;
  isNew: boolean;
}

interface IInnerProps extends IProps {
  settingsStore: SettingsStore;
}

export const IssueCard = compose<IInnerProps, IProps>(
  inject('settingsStore'),
  observer
)(({ data: issue, isNew, settingsStore }) => {
  const linkStyle = settingsStore.isDark
    ? 'text-blue-400'
    : 'text-blue-500 hover:text-blue-600';

  const firstTimelineItem = get(issue, 'timelineItems.nodes.0');

  function getTotalCommentsCount() {
    return (
      get(issue, 'reviews.totalCount', 0) + get(issue, 'comments.totalCount', 0)
    );
  }

  function getLastActivityDate(item: TimelineItem) {
    switch (item.__typename) {
      case TimelineItemType.ISSUE_COMMENT:
        return item.createdAt;
      case TimelineItemType.PULL_REQUEST_COMMIT:
        return item.commit.committedDate;
      case TimelineItemType.PULL_REQUEST_REVIEW:
        return item.createdAt;
    }
  }

  return (
    <div
      className={cx(
        'p-6 flex border-l-4',
        isNew ? 'border-blue-500' : 'border-transparent'
      )}
    >
      <div className="flex items-center justify-center flex-shrink-0 pr-4">
        <div
          className={cx(
            'w-16 h-16 rounded-full overflow-hidden',
            settingsStore.isDark ? 'bg-gray-700' : 'bg-gray-400'
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

            <ConflictIndicator conflicting={issue.conflicting} />
          </div>
          <a
            href={issue.url}
            className="ml-2 text-gray-600 hover:text-gray-500"
          >
            <i className="far fa-comment-alt" /> {getTotalCommentsCount()}
          </a>
        </div>
        <div
          className={cx(
            'text-xs',
            settingsStore.isDark ? 'text-gray-500' : 'text-gray-700'
          )}
        >
          #{issue.number} opened {timeago.format(issue.createdAt)} by{' '}
          <a
            href={issue.author.url}
            className={cx(
              'no-underline hover:underline',
              settingsStore.isDark ? 'text-gray-500' : 'text-gray-700'
            )}
          >
            {issue.author.login}
          </a>
          {firstTimelineItem && (
            <React.Fragment>
              {', '}
              <span>
                last activity{' '}
                {timeago.format(getLastActivityDate(firstTimelineItem))}
              </span>
            </React.Fragment>
          )}
          <ContextualDropdown issue={issue} />
        </div>
        <div className="flex flex-wrap gap-y-1 gap-x-1 mt-3">
          {issue.labels.map(label => (
            <LabelBadge key={label.name} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
});
